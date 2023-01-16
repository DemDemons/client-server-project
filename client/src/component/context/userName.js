import React, { createContext, PureComponent, useState } from 'react';



export const userNameContext = createContext();



export const UserNameProvider = ({ children }) => {
    const [username, setUserName] = useState('')

    const changeUserName = (name) => {
        window.localStorage.clear();
        setUserName(name)
        localStorage.setItem('currentUser', name)
    }

    return <userNameContext.Provider value={{ username, changeUserName }}>
        {children}
    </userNameContext.Provider>
}