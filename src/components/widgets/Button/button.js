import React from 'react';
import { Link } from 'react-router-dom';
import style from './button.module.css';

const Button = (props) => {

    let template = null;

    switch(props.type) {
        case 'loadMore':
            template = (
                <div className={style.blue_btn}
                    onClick={props.loadMore}
                >
                    {props.cta}
                </div>
            );
            break;
        default:
            template = null;
    }

    return template;
};

export default Button;