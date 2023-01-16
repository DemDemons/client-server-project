import React, { useEffect, useState, useContext } from "react";
import { userNameContext } from "./context/userName"



export default function Files(props) {
    const currentUser = localStorage.getItem("currentUser")
    const [content, setContent] = useState("");
    const [showContent, setShowContent] = useState(false);

    const fetchContent = (ev) => {
        if (content.length===0) {
            fetch("http://localhost:8080/users/fileContent",
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ fileName: ev.target.name, username: currentUser})
                })
                .then((res) => res.json())
                .then((recivedContent) => { setContent(JSON.stringify(recivedContent)) })
        }
        let isPressedBtn = !showContent ? true : false;
        setShowContent(isPressedBtn)
    }

    return (
        <>
            <div>
                <li >{props.fileName.split(".")[0]}</li>
                <button name={props.fileName} onClick={fetchContent}>Show Content</button>
                <p>{showContent ? content : null}</p>
            </div>

        </>
    );

}