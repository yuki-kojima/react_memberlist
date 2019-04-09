import React from 'react';

const InputText = (props) => {
    return (
    <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value ? props.value : undefined}
    />
    );
};

export default InputText;
