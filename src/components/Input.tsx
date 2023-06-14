interface IPropsInput {
    name:string;
    value:string;
    type:string;
    changeEvent: (e : any) => void
}

const Input = ({
    name,
    value,
    type,
    changeEvent
} : IPropsInput) => {
   return (
      <input className="input-box" onChange={changeEvent} type={type} value={value} name={name}/>
   )
}

export default Input;