import { ChangeEvent } from "react";

interface ISelectProps {
    options:string[];
    name:string;
    changeEvent:(e : ChangeEvent) => void;
    value:string;
}

const Select = ({
    options,
    name,
    changeEvent,
    value 
} : ISelectProps) => {
     return (
        <select value={value} onChange={changeEvent} name={name} className="select-box">
            {options.map((option : string,idx : number) => (
                <option key={idx} value={option === "All" ? "" : option.toLowerCase()}>{option}</option>
            ))}
        </select>
     )
}

export default Select;