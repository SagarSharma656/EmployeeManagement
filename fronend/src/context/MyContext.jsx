import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const { VITE_BASE_URL } = import.meta.env;

export const MyContext = createContext(null);


export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${VITE_BASE_URL}/employee`, {
                withCredentials: true,
            });

            // console.log(res, "user data")

            if (res.status === 200) {
                setUser(res.data.employee)
                return res.data.employee;
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const contextValues = {
        loading, 
        setLoading,
        user,
        setUser,
        fetchUser
    }

    return (
        <MyContext.Provider value={contextValues}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(MyContext);

    if (!context) {
        throw new Error("This context use within ContextProvider")
    }

    return context;
}


