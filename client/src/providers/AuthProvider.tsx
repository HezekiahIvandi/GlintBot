import { useContext, createContext, ReactNode } from "react";
//interfaces
interface AuthContextType{
    user: any | null,
    logout?: ()=> void
}
interface AuthProviderProps{
    children: ReactNode
}

//custom contexts
const AuthContext = createContext<AuthContextType>({
    user: null
});

const AuthProvider = ({children}: AuthProviderProps) =>{
    const value = {
        user: "Hezekiah",
        logout: async function(){
            try{
             const response = await fetch('http://localhost:3000/api/v1/logout', {
               method: "DELETE",
               credentials: "include"
             });
           
             const data = await response.json();
             if(!response.ok) return data.error;
             console.log(data.message);
            }
            catch(e){
             console.error(e);
             return;
            }
           
        }
    }
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}



export const useAuth = ()=>{
    return useContext(AuthContext);
}


export default AuthProvider;