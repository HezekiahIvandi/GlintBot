import { useContext, createContext, ReactNode, useState, useEffect } from "react";

//interfaces
interface UserType {
    userId: string,
    username: string
}

interface AuthContextType{
    user: UserType | null,
    register: (username: string, email: string, password: string)=> Promise<boolean>,
    login: (email: string, password:string)=> Promise<boolean>,
    logout: ()=> Promise<boolean>,
    clearMsg: ()=> void,
    isLoading: boolean,
    isAuthenticated: boolean,
    errorMsg: string | null,
    successMsg: string | null,
}
interface AuthProviderProps{
    children: ReactNode
}

//custom contexts
const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    errorMsg: null,
    successMsg: null,
    logout: async() =>false,
    login: async()=> false,
    register: async()=>false,
    clearMsg: ()=> {}
});

//auth provider
const AuthProvider = ({children}: AuthProviderProps) =>{
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    //reset success and error message
    const clearMsg = ()=>{
        setSuccessMsg(null);
        setErrorMsg(null);
    }

    //register function
    const register = async function(username: string, email:string, password:string){
        try{
            setLoading(true);
            clearMsg();

            const response = await fetch("http://localhost:3000/api/v1/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username, email, password
                    })
                }
            )

            const data = await response.json();

            if(!response.ok){
                setErrorMsg(data.error);
                return false;
            }

            setSuccessMsg(data.message);
            return true;
        }
        catch(e){
            const errorMsg = e instanceof Error? e.message : "Something went wrong while registering";
            setErrorMsg(errorMsg);
            return false;
        }
        finally{
            setLoading(false);
        }
    }

    //login function
    const login = async function(email: string, password:string){
        try{
            setLoading(true);
            clearMsg();

            const response = await fetch("http://localhost:3000/api/v1/signin", {
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-type" : "Application/json",
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json();

            if(!response.ok) {setErrorMsg(data.error); return false}
            
            //handle successful login
            setSuccessMsg(data.message);
            await checkAuthStatus(); //Mount user after login
            return true
        }
        catch(e){
            const errorMsg = e instanceof Error? e.message : "Something went wrong while logging-in";
            setErrorMsg(errorMsg);
            return false
        }
        finally{
            setLoading(false);
        }
    }

    //logout function
    const logout = async function(){ 
        try{
            setLoading(true);
            clearMsg();

            const response = await fetch('http://localhost:3000/api/v1/logout', {
            method: "DELETE",
            credentials: "include"
            });
       
            const data = await response.json();
            if(!response.ok) {
                setErrorMsg(data.error);
                return false;
            };

            //Handle successful logout
            setSuccessMsg(data.message);
            setUser(null);
            setAuthenticated(false);
            return true;
        }
        catch(e){
            const errorMsg = e instanceof Error? e.message : 'Logout failed';
            setErrorMsg(errorMsg);
            return false;
        }
        finally{
            setLoading(false);
        }
       
    }

    //Function for checking user and mounting user to current session
    const checkAuthStatus = async function(){
        try{
            const response = await fetch('http://localhost:3000/api/v1/me', {
                method: "GET",
                credentials: "include",        
                headers: {
                    "Accept": "application/json"
                }
            })
            
            const data = await response.json();
            if(!response.ok) return console.log(data.message);
            console.log("Fetchme successful, :", data.userData);
            setUser(data.userData);
            setAuthenticated(true);
        }catch(e){
            console.error(e);
            setUser(null);
            console.log("Not authorized");
            
        }
     }

    //Check user on mount
    useEffect(()=>{
        checkAuthStatus();
    }, [])

    const value = {
        user,
        login,
        logout,
        register,
        clearMsg,
        isLoading,
        errorMsg,
        successMsg,
        isAuthenticated
    }

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
}



export const useAuth = (): AuthContextType=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");
    return context 
}


export default AuthProvider;