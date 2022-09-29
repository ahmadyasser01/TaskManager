import { createContext,useState, } from "react";

export const PopupContext = createContext(null);

export const   PopupProvider = ({ children }) => {
    const [update, setUpdate] = useState(true);
    const [open, setOpen] = useState(false);
    const [selected,setSelected] = useState('')


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <PopupContext.Provider value={{ open, handleOpen, handleClose,update,setUpdate,selected,setSelected }}>
        {children}
      </PopupContext.Provider>
    );
  }

