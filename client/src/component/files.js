import React, { useEffect, useState, useContext } from "react";
import { userNameContext } from "./context/userName"



export default function Files(props) {
    const currentUser = localStorage.getItem("currentUser")
    const [content, setContent] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [fileInfo, setFileInfo] = useState("");

    const fetchContent = (ev) => {
        if (content.length === 0) {
            fetch("http://localhost:8080/users/fileContent",
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ fileName: ev.target.name, username: currentUser })
                })
                .then((res) => res.json())
                .then((recivedContent) => {
                    setContent(JSON.stringify(recivedContent))
                })
        }
        let isPressedBtn = !showContent ? true : false;
        setShowContent(isPressedBtn)
    }

    const fetchFileInfo = (ev) => {
        console.log("ev.target.name:", ev.target.name);
        console.log("currentUser:", currentUser);
        fetch(`http://localhost:8080/users/fileInfo?fileName=${ev.target.name}&username=${currentUser}`)
            .then((res) => res.json())
            .then((data) => setFileInfo(data))
        let isPressedBtn = !showInfo ? true : false;
        setShowInfo(isPressedBtn)
    }

    const fetchDelete = (ev) => {
        let num = 0
            fetch("http://localhost:8080/users/deleteFile",
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ fileName: ev.target.name, username: currentUser })
                })
                .then(alert(`${ev.target.name} has been deleted`))
                props.func()
    }

    return (
        <div>
            <div >
                <li >{props.fileName.split(".")[0]}</li>
                <button name={props.fileName} onClick={fetchContent}>Show Content</button>
                <button name={props.fileName} onClick={fetchFileInfo}>Show info of file</button>
                <button  name={props.fileName} onClick={fetchDelete}>Delete a file</button>
                <p>{showContent ? content : null}</p>
                <p>{showInfo ? `file size: ${fileInfo.size} >
                type file: ${fileInfo.Mytpe}` : null} </p>
            </div>
        </div>
    );

}