export interface ILoginState {
    email:string;
    password:string;
}

export interface IRegisterState {
    email:string;
    password:string;
    name:string;
    confirm:string;
}

export interface IStatsInterface {
    pending:number;
    interview:number;
    declined:number;
}

export interface IChartState {
     labels:string[],
     datasets: [
        {
            label:string;
            data:number[],
            backgroundColor:string[] 
        }
     ] | []
}

export interface ICreateJobState {
    position:string;
    company:string;
    jobLocation:string;
    jobType:string;
    status:string;
}

export interface IJobState {
     position:string;
     company:string;
     jobType:string;
     jobLocation:string;
     status:string;
     createdAt:string;
     updatedAt:string 
     _id:string;
}

export interface IProfileState {
    name:string;
    lastName:string;
    email:string;
    location:string;
    id:string;
}

export interface IPaginationState {
    total:number;
    current_page:number;
    per_page:number;
}