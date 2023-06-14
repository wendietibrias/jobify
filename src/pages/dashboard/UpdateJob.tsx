import "../../assets/scss/pages/createJob.scss";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Input,Select,Alert } from "../../components";
import { ICreateJobState } from "../../interfaces/useStateInterfaces";
import useAuthStore from "../../store/useAuthStore";
import useAlertStore from "../../store/useAlertStore";
import APIJobCall from "../../api/APIJob";

const UpdateJob = () => {
  const { token } : any = useAuthStore();
  const { open,openHandler,closeHandler } : any = useAlertStore();
  const { id } = useParams();

  const navigate = useNavigate();
  const APIJob = APIJobCall(token);
  
    const [loading,setLoading] = useState<boolean>(false);
    const [form,setForm] = useState<ICreateJobState>({
     position:"",
     company:"",
     jobLocation:"",
     jobType:"",
     status:""
  });

  const [idJob,setIdJob] = useState<string>("");

  const fetchJob = async () => {
     try {
        const { data } = await APIJob.get(`/detail/${id}`);
        if(data && data.statusCode === 200) {
            setForm({
                company:data.data.company,
                position:data.data.position,
                status:data.data.status,
                jobType:data.data.jobType,
                jobLocation:data.data.jobLocation
            })

            setIdJob(data.data._id);
        }

     } catch(err) {
         return err;
     }
  }

  const submitHandler = async (e : any) => {
    e.preventDefault();

    openHandler({
        open:true,
        message:"Updating job...",
        variant:"wait"
    });

    setLoading(true);

    try {
        const { data } = await APIJob.put(`/update/${idJob}`,form);

        if(data && data.statusCode === 200) {
          openHandler({
           open:true,
           message:"Success update job...",
           variant:"success"
         });

         setLoading(false);
         navigate("/all-job");

        }

    } catch(err : any) {
        const { response:{ data } } = err;
        openHandler({
           open:true,
           message:data.message,
           variant:"error"
         });
         setLoading(false);
    }
  }

  const changeHandler = (e : any) => {
      const value = e.target.value;
      const name = e.target.name;

      setForm({
        ...form,
        [name]:value
      });
  }

  useEffect(() => {
    fetchJob();
  }, [id])
     
  return (
    <div className="create-container">
         <section className="create-box">
            <h2>Update Job</h2>
            {open && <Alert/>}
            <form onSubmit={submitHandler} className="create-box-form">
                <div className="form-control">
                    <label>Position</label>
                    <Input name="position" type="text" value={form.position} changeEvent={changeHandler}/>
                </div>
                <div className="form-control">
                    <label>Company</label>
                    <Input name="company" type="text" value={form.company} changeEvent={changeHandler}/>
                </div>
                     <div className="form-control">
                    <label>jobLocation</label>
                    <Input name="jobLocation" type="text" value={form.jobLocation} changeEvent={changeHandler}/>
                </div>
                     <div className="form-control">
                    <label>Job Type</label>
                    <Select name="jobLocation" value={form.jobLocation} changeEvent={changeHandler} options={["Full-Time","Part-Time","Remote"]}/>
                </div>
                   <div className="form-control">
                    <label>Status</label>
                    <Select name="status" value={form.status} changeEvent={changeHandler} options={["Pending" , "Interview" , "Declined"]}/>
                </div>
                <button className="submit-button">Submit</button>
            </form>
         </section>
    </div>
  )
}

export default UpdateJob