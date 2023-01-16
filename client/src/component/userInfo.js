import React, { useEffect, useState, useContext } from "react";
import {userNameContext} from "./context/userName"
import Files from "./files";




export default function UserInfo() {
    //to be deleted 
    // const currentUserName = useContext(userNameContext)
    // const [content, setContent] = useState("");
    const [showContent, setShowContent] = useState(false);
    let infoMap;

    const [info, setInfo] = useState("")
    const currentUser = localStorage.getItem("currentUser")
    const fethcUserFiles = () => {
        let data = [];
        console.log(data.length);
        if(data.length === 0){
            fetch(`http://localhost:8080/users/Dir`,
            {method: 'POST',
            headers: {"content-type": "application/json"},
            body:JSON.stringify({username: currentUser})}
            )
            .then((res) => res.json())
            .then((fileList) => {
                data = fileList
            })
            .then(() => {
                infoMap = data.map((elem, index) => <Files fileName={elem} key={index}/>
                )
                setInfo(infoMap)
            })
        }
    }

    useEffect(() => {
        setInfo(fethcUserFiles())
    }, [infoMap])
    useEffect(() => {
        
    }, [showContent])

        return (
            <>
                <h1>these are your files</h1>
                <h2>Welcome {currentUser}</h2>

                <ul>{info}</ul>

            </>
        );
    
}