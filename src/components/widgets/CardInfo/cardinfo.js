
import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './cardinfo.module.css';
import moment from 'moment';

const CardInfo = (props) => {

    const getTeamName = (teams,teamId) => {

        let dados = teams.find(item => item.teamId === teamId);
       
        if (dados) {
            return dados.name
        }
    }

    const formatDate = (date) => {
        return moment(date).format(' MM-DD-YYYY');
    }

    return (
        <div className={style.cardInfo}>
            <span className={style.teamName}>
                {getTeamName(props.teams,props.teamId)}
            </span>
            <span className={style.date}>
                <FontAwesome name="clock-o" />&nbsp;
                {formatDate(props.date)}
            </span>
        </div>
    );
};

export default CardInfo;