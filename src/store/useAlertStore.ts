import { create } from "zustand";
import { IAlertStore } from "../interfaces/storeInterfaces";

const alertState : IAlertStore = {
    open:false,
    message:"",
    variant:""
}

const useAlertStore = create((set) => ({
  ...alertState,
  openAlertHandler:(payload : IAlertStore) => set((state : IAlertStore) => ({
      open:payload.open,
      message:payload.message,
      variant:payload.variant
  })),
  closeAlertHandler:() => set((state : IAlertStore) => ({
     open:false,
     message:"",
     variant:""
  }))
}))

export default useAlertStore;