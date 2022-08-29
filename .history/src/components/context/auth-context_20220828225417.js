import React, { useContext, useState} from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthContextProvider = props => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginHandler = () => { 
        setIsAuthenticated(true);
    }
    return (
        <AuthContextProvider value={{ login: loginHandler,isAuth:isAuth }}>
            { props.children}
        </AuthContextProvider>
    )
}