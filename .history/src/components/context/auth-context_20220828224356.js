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
        <AuthContextProvider>
            { props.children}
        </AuthContextProvider>
    )
}