import React, { useEffect, useState, useContext } from "react";
import { userNameContext } from "./context/userName"

export default function Dir(props) {
    const currentUser = localStorage.getItem("currentUser")
    const [showFiles, setShowFiles] = useState() 
    // const showInfoOfDir = (ev) => {
    //     let data = [];
    //     console.log(data.length);
    //     if (data.length === 0) {
    //         fetch(`http://localhost:8080/users/Dir`,
    //             {
    //                 method: 'POST',
    //                 headers: { "content-type": "application/json" },
    //                 body: JSON.stringify({ username: currentUser, mainDir: false , dirName: props.dirName })
    //             }
    //         )
    //             // .then((res) => res.json())
    //             // .then((fileList) => {
    //             //     data = fileList
    //             // })
    //             // .then(() => {
    //             //     dataFileMap = data.files.map((elem, index) => <Files func={fethcUserFiles} fileName={elem} key={index} />)
    //             //     dataDirMap = data.dirs.map((elem, index) => <Dir dirName={elem} key={index}/>)
    //             //     setDirectories(dataDirMap)
    //             //     setFileMap(dataFileMap)
    //             // })
    //     }
    // }

    return (
        <div>
            <h1>{props.dirName}</h1>
            <button>Show Files</button>
        </div>
    )
}