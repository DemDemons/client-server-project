// import React, { useEffect, useState, useContext } from "react";
// import { userNameContext } from "./context/userName"

// export default function Dirs(props) {
//     const fetchDelete = (ev) => {
//         let num = 0
//         fetch("http://localhost:8080/users/createDir",
//             {
//                 method: 'POST',
//                 headers: { "content-type": "application/json" },
//                 body: JSON.stringify({ fileName: ev.target.name, username: currentUser })
//             })
//             .then(alert(`${ev.target.name} has been deleted`))
//         props.func()
//     }

//     return (
//         <div>
//             <h1>Dirs</h1>
//         </div>
//     )
// }