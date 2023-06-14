import { create } from "zustand";
import { IAuthStore } from "../interfaces/storeInterfaces";

const authState : IAuthStore = {
    token:JSON.parse(localStorage.getItem("jobify_token") || "null") || null,
    name:""
}

const useAuthStore = create((set) => ({
    ...authState,
    setName: (name : string) => set((state :IAuthStore) => ({
         name:name
    })),
    setToken:(token : string) => set((state : IAuthStore) => ({
        token:token
    })),
    removeToken:() => set((state : IAuthStore) => ({
        token:null
    }))
}))

export default useAuthStore;