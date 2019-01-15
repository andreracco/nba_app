
import React from 'react';
import FontAwesome from 'react-fontawesome';
import style from './cardinfo.module.css';

const CardInfo = (props) => {

    const getTeamName = (teams,teamId) => {

        let dados = teams.find(item => item.id === teamId);
       
        if (dados) {
            return dados.name
        }
    }

    return (
        <div className={style.cardInfo}>
            <span className={style.teamName}>
                {getTeamName(props.teams,props.teamId)}
            </span>
            <span className={style.date}>
                <FontAwesome name="clock-o" />&nbsp;
                {props.date}
            </span>
        </div>
    );
};

export default CardInfo;