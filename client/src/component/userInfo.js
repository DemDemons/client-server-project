import React, { useEffect, useState, useContext } from "react";
import { userNameContext } from "./context/userName"
import Dirs from "./dirs";
import Files from "./files";




export default function UserInfo() {
    //to be deleted 
    // const currentUserName = useContext(userNameContext)
    // const [content, setContent] = useState("");
    // const [showContent, setShowContent] = useState(false);
    let infoMap;

    const [info, setInfo] = useState("")
    const [addFileCounter, setAddFileCounter] = useState(0)
    const currentUser = localStorage.getItem("currentUser")
    const fethcUserFiles = () => {
        let data = [];
        let size = []
        console.log(data.length);
        if (data.length === 0) {
            fetch(`http://localhost:8080/users/Dir`,
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ username: currentUser })
                }
            )
                .then((res) => res.json())
                .then((fileList) => {
                    data = fileList
                })
                .then(() => {
                    infoMap = data.map((elem, index) => <Files func={fethcUserFiles} fileName={elem} key={index} />
                    )
                    setInfo(infoMap)
                })
        }
    }
    const addFile = () => {
        let fileName = prompt("Please enter the new name of the file and it's type")
        let fileContent = prompt("Please enter the content of the file")
        let destination = prompt("Please enter the name of the directory in which you wish for the file to be created")
        fetch("http://localhost:8080/users/addFile",
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ fileName: fileName, username: currentUser, destination: destination, fileContent: fileContent })
            })

        let counter = 0;
        counter++;
        setAddFileCounter(counter)
    }

    useEffect(() => {
        // setInfo(fethcUserFiles())
        fethcUserFiles()
    }, [addFileCounter])

    return (
        <>
            <h1>Welcome {currentUser}</h1>
            <h2>these are your files</h2>
            <button onClick={addFile}>Add file</button>
            <ul>{info}</ul>
            <p>make new dir:</p>
            <div>
                {/* <Dirs /> */}
            </div>

        </>
    );

}