import React from 'react';
import style from './formFields.module.css';

const FormFields = ( {id, formdata, change}) => {

    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className={style.labelError}>
                    {formdata.validationMessage}
                </div>
            )

        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case('input'):
                formTemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(event) => change({event, id, blur: false})}
                            onBlur={(event) => change({event, id, blur: true})}
                        />

                        {showError()}
                    </div>
                )
                break;
            case('select'):
                formTemplate = (
                    <div>
                        <select
                            value={formdata.value}
                            name={formdata.config.name}
                            onChange={(event) => change({event, id, blur: false})}
                            onBlur={(event) => change({event, id, blur: true})}
                        >
                            {formdata.config.options.map( (item, i) => (
                                <option key={i} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormFields;