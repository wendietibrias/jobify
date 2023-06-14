export interface IAlertStore {
    open:boolean;
    message:string;
    variant:string 
}

export interface IAuthStore {
    token:string | null;
    name:string | null;
}