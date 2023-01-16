import React, { useEffect, useState, useContext } from "react";
import { userNameContext } from "./context/userName"



export default function Files(props) {
    const currentUser = localStorage.getItem("currentUser")
    const [content, setContent] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [fileName, setFileName] = useState('')

    const fetchContent = (ev) => {
        if (content.length === 0) {
            fetch("http://localhost:8080/users/fileContent",
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ fileName: ev.target.name, username: currentUser })
                })
                .then((res) => res.json())
                .then((recivedContent) => { setContent(JSON.stringify(recivedContent)) })
        }
        let isPressedBtn = !showContent ? true : false;
        setShowContent(isPressedBtn)
    }
    const changeFileName = (ev) => {
        let newFileName = prompt("Please enter a new file name and the type of file")
        fetch("http://localhost:8080/users/changeFileName",
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ fileName: ev.target.name, username: currentUser, newFileName: newFileName })
            })

        setFileName(newFileName.split(".")[0])
        console.log("changed!");
    }
    const copyFile = (ev) => {
        let newDestination = prompt("Please enter the name of the destination for the file to be copied")
        fetch("http://localhost:8080/users/copyFile",
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ fileName: ev.target.name, username: currentUser, newDestination: newDestination })
            })
            .then((res) => res.json())
            .then((data) => JSON.parse(data.answer) ? alert("The file has been copied!"): alert("directory does not exist"))
    }
    return (
        <>
            <div>
                <li >{fileName ? fileName : props.fileName.split(".")[0]}</li>
                <button name={props.fileName} onClick={fetchContent}>Show Content</button>
                <button name={props.fileName} onClick={changeFileName}>Change File name</button>
                <button name={props.fileName} onClick={copyFile}>Copy file</button>
                <p>{showContent ? content : null}</p>
            </div>

        </>
    );

}