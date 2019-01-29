import React, { Component } from 'react';
import FormField from '../widgets/FormFields/formFields';
import style from './dashboard.module.css';
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import Uploader from '../widgets/FileUploader/fileUploader';

class Dashboard extends Component {
    
    state = {
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
        formdata: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'input_author',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'input_title',
                    type: 'text',
                    placeholder: 'Enter the title'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            team: {
                element: 'select',
                value: '',
                config: {
                    name: 'input_team',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            },
        }
    }

    componentDidMount() {
        this.loadTeams();
    }

    loadTeams = () => {

        firebaseTeams.once('value')
        .then( (snapshot) => {
            let team = [];

            snapshot.forEach((childSnapshot) => {
                team.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })

            const newFormData = {...this.state.formdata};
            const newElement = {...newFormData['team']};

            newElement.config.options = team;
            newFormData['team'] = newElement;

            this.setState({
                formdata: newFormData
            })
        })
    }

    updateForm = (element, content = '') => {
        const newFormData = {
            ...this.state.formdata
        }

        const newElement = {
            ...newFormData[element.id]
        }

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }
        

        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        this.setState({
            formdata: newFormData
        });
    }

    validate = (element) => {
        let error = [true, ''];

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;
            error = !valid ? [valid, message] : error
        }

        return error;
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
        }

        for (let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        
        console.log(dataToSubmit);
        
        if (formIsValid) {
            this.setState({
                loading: true,
                postError: ''
            })

            firebaseArticles.orderByChild('id').limitToLast(1).once('value')
            .then( (snapshot) => {
                let articleId = null;
                
                snapshot.forEach( childSnapshot => {
                    articleId = childSnapshot.val().id;
                });

                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
                dataToSubmit['id'] = articleId + 1;
                dataToSubmit['team'] = parseInt(dataToSubmit['team']);

                firebaseArticles.push(dataToSubmit)
                .then( article => {
                    this.props.history.push(`/articles/${article.key}`)
                }).catch( error => {
                    this.setState({
                        postError: error.message
                    })
                })
            })
        } else {
            this.setState({
                postError: 'Error posting'
            })
        }
    }

    submitButton = () => (
        this.state.loading ? 
            'loading...'
            : 
            <div>
                <button type='submit'> Add post </button>
            </div>
    )

    showError = () => (
        this.state.postError !== '' ? 
             <div className={style.error}>
                {this.state.postError}
            </div>
        : ''
    )
    
    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);

        this.updateForm({id: 'body'}, html)

        this.setState({
            editorState
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id: 'image'}, filename)
    }

    render() {
        return (
            <div className={style.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2> Add Post </h2>
                    
                    <Uploader
                        filename={ (filename) => this.storeFilename(filename) }
                    />

                    <FormField
                        id={ 'author' }
                        formdata={ this.state.formdata.author } 
                        change={ (element) => this.updateForm(element) }
                    />

                    <FormField
                        id={ 'title' }
                        formdata={ this.state.formdata.title } 
                        change={ (element) => this.updateForm(element) }
                    />

                    <Editor
                        toolbarHidden
                        editorState={this.state.editorState}
                        wrapperClassName="editorWrapper"
                        editorClassName="editorEditor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    <FormField
                        id={ 'team' }
                        formdata={ this.state.formdata.team } 
                        change={ (element) => this.updateForm(element) }
                    />

                    { this.submitButton() }
                    { this.showError() }
                </form>
                
            </div>
        );
    }
}

export default Dashboard;