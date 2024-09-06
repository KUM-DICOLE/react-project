import React from 'react';

type InputProps = {
    name: string;
    value?: string;
    type?: string;
    onChange?:(e:any) => void;
    className?: string;
    onKeyDown?:(e:any) => void;
    disabled?: boolean;  
};

const Input = ({
    type = "text",
    name,
    value,
    onChange,
    className,
    onKeyDown,
    disabled,
}: InputProps) => {

    return (
        <input 
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type} 
        placeholder={`Enter ${name}`}
        disabled={disabled} 
        className={`flex-1 placeholder-gray-300 bg-transparent border-2 px-3 py-1 border-gray-300 rounded-full ${className}`}/>
    );
};

export default Input;