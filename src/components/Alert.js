import React from 'react'

function Alert(props) {
    const Capitalize = (word) => {
        if(word==='danger') word='error';
        let newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    };
    return (
        <div style={{ height: "50px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{Capitalize(props.alert.type)}</strong>:{props.alert.message}
            </div>}
        </div>
    )
}

export default Alert
