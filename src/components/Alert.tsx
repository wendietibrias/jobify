import useAlertStore from '../store/useAlertStore';

const Alert = () => {
  const { message,variant,closeAlertHandler } : any = useAlertStore();

  return (
    <div className={`alert ${variant}`}>
       <h5>{message}</h5>
       <button onClick={closeAlertHandler} className="close-button">x</button>
    </div>
  )
}

export default Alert