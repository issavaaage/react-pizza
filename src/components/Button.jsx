import React from 'react';
import classNames from 'classnames';

export default function({className, outlineBtn, addBtn, children, onClick}) {

    return (

        <button onClick={onClick} className={classNames('button', className, {
            'button--outline': outlineBtn,
            'button--add': addBtn
        })}>
            {children}
        </button>
    )
}