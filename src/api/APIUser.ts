import axios from "axios";

const APIUserCall = (token : string) => {
    const APIUser = axios.create({
        baseURL:`${process.env.REACT_APP_BASE_API_URL}/user`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    });
 
    return APIUser;
}

export default APIUserCall;