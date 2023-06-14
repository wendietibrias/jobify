import "../../assets/scss/pages/createJob.scss";
import {  useState } from "react";
import { Input,Select,Loading,Alert } from "../../components";
import { ICreateJobState } from "../../interfaces/useStateInterfaces";
import { useNavigate } from "react-router-dom";
import APIJobCall from "../../api/APIJob";
import useAuthStore from "../../store/useAuthStore";
import useAlertStore from "../../store/useAlertStore";

const CreateJob = () => {
   const { openHandler , open  } : any = useAlertStore();
   const { token } : any = useAuthStore();
   const APIJob = APIJobCall(token);
   const navigate = useNavigate();
    
    const [loading,setLoading] = useState<boolean>(false);
    const [form,setForm] = useState<ICreateJobState>({
        position:"",
        company:"",
        jobType:"full-time",
        jobLocation:"",
        status:"pending"
    });

    const changeHandler = (e : any) => {
       const value = e.target.value;
       const name = e.target.name;

       setForm({
        ...form,
        [name]:value
       });
    }

    const submitHandler = async (e : any) => {
      e.preventDefault();

      openHandler({
        open:true,
        message:'Creating job...',
        variant:'wait'
      });

      setLoading(true);

      try {
  
        const { data } = await APIJob.post(`/create`,form);

        if(data.statusCode === 200) {
           setLoading(false);
           openHandler({
           open:true,
           message:data.message,
           variant:'success'
          });
          
          setForm({
             position:"",
             company:"",
             jobType:"",
             jobLocation:"",
             status:""
          });

          navigate("/all-job");
        }

      } catch(err : any) {
         setLoading(false);
         const { response:{ data } } = err;
           openHandler({
           open:true,
           message:data.message,
           variant:'error'
         });

      }
    }

    return (
        <div className="create-container">
            <section className="create-box">
                <h2>Create Job</h2>
                {open && <Alert/>}
                <form onSubmit={submitHandler} className="create-box-form">
                  <div className="form-control">
                    <label>Position</label>
                    <Input name="position" value={form.position} changeEvent={changeHandler} type="text"  />
                  </div>
                   <div className="form-control">
                    <label>Company</label>
                    <Input name="company" value={form.company} changeEvent={changeHandler} type="text"  />
                  </div>
                      <div className="form-control">
                    <label>Location</label>
                    <Input name="jobLocation" value={form.jobLocation} changeEvent={changeHandler} type="text"  />
                  </div>
                      <div className="form-control">
                    <label>Status</label>
                    <Select value={form.status} changeEvent={changeHandler} name="status" options={["Pending","Interview","Declined"]} />
                  </div>
                  <div className="form-control">
                    <label>Job Type</label>
                    <Select value={form.jobType} changeEvent={changeHandler} name="jobType" options={["Full-Time","Part-Time","Remote"]} />
                  </div>
                  <button type="submit" className="submit-button">
                    {loading ? <Loading type="small" width="20px" height="20px" color="#fff" /> : "Submit"}
                  </button>
                </form>
            </section>
        </div>
    )
}

export default CreateJob;