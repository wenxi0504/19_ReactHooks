import React from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
})

const AuthContextProvider = props => { 
    return (
        <AuthContextProvider>
            { props.children}
        </AuthContextProvider>
    )
}