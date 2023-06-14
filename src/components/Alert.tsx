import useAlertStore from '../store/useAlertStore';

const Alert = () => {
  const { message,variant,closeHandler } : any = useAlertStore();

  return (
    <div className={`alert ${variant}`}>
       <h5>{message}</h5>
       <button onClick={closeHandler} className="close-button">x</button>
    </div>
  )
}

export default Alert