import { create } from "zustand";
import { IAlertStore } from "../interfaces/storeInterfaces";

const alertState : IAlertStore = {
    open:false,
    message:"",
    variant:""
}

const useAlertStore = create((set) => ({
  ...alertState,
  openHandler:(payload : IAlertStore) => set((state : IAlertStore) => ({
      open:payload.open,
      message:payload.message,
      variant:payload.variant
  })),
  closeHandler:() => set((state : IAlertStore) => ({
     open:false,
     message:"",
     variant:""
  }))
}))

export default useAlertStore;