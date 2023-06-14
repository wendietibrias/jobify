import axios from "axios";

const APIJobCall =  (token : string) => {
    const APIJob = axios.create({
        baseURL:`${process.env.REACT_APP_BASE_API_URL}/job`,
        headers: {
            Authorization:`Bearer ${token}`
        }
    });

    return APIJob;
}


export default APIJobCall