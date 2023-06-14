import "../../assets/scss/pages/profile.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { Input,Alert } from "../../components";
import useAuthStore from "../../store/useAuthStore";
import APIUserCall from "../../api/APIUser";
import useAlertStore from "../../store/useAlertStore";
import { IProfileState } from "../../interfaces/useStateInterfaces";

const Profile = () => {
    const { open , openHandler,closeHandler } : any = useAlertStore();
    const { token,setName } : any = useAuthStore();
    const APIUser = APIUserCall(token);

    const [profile,setProfile] = useState<IProfileState>({
        name:"",
        lastName:"",
        email:"",
        location:"",
        id:""
    })

    const fetchProfile = async () => {
        try {
            const { data } = await APIUser.get(`/detail`);

            if(data && data.statusCode === 200) {
                setProfile({
                    name:data.data.name,
                    lastName:data.data.lastName,
                    email:data.data.email,
                    location:data.data.location,
                    id:data.data._id
                });

                setName(data?.data?.name);
            }

        } catch(err) {
            return err;
        }
    }

    const changeHandler = (e : ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const name = (e.target as HTMLInputElement).name;

        setProfile({
            ...profile,
            [name]:value 
        });
    }

    const submitHandler = async (e : any) => {
        e.preventDefault();

            openHandler({
            open:true,
            message:"Updating profile...",
            variant:'wait'
          });          

        try {
            const { data } = await APIUser.put(`/update/${profile?.id}`,profile);

            if(data && data.statusCode === 200) {
               openHandler({
               open:true,
               message:data.message,
               variant:'success'
            });          

                fetchProfile();
            }

        } catch(err : any) {
          const { response:{ data } } = err;
          openHandler({
            open:true,
            message:data.message,
            variant:'error'
          })           
        }
    }

    useEffect(() => {
       fetchProfile();
    },[])

    return (
        <div className="profile-container">
            <section className="profile-form-box">
                <h2>Your Profile</h2>
                {open && <Alert/>}
                <form onSubmit={submitHandler} className="profile-form-container">
                     <div className="form-control">
                        <label>First Name</label>
                        <Input name="name" type="text" value={profile.name} changeEvent={changeHandler} />
                     </div>
                        <div className="form-control">
                        <label>Last Name</label>
                        <Input name="lastName" type="text" value={profile.lastName} changeEvent={changeHandler} />
                     </div>
                        <div className="form-control">
                        <label>Email</label>
                        <Input name="email" type="email" value={profile.email} changeEvent={changeHandler} />
                     </div>
                          <div className="form-control">
                        <label>Location</label>
                        <Input name="location" type="text" value={profile.location} changeEvent={changeHandler} />
                     </div>
                     <button type="submit" className="submit-button">Save Changes</button>
                </form>
            </section>
        </div>
    )
}

export default Profile;