import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Actions = (props) => {
    const[actions, setActions] = useState([])
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/projects/${props.props}/actions`)
            .then(response => {
                console.log(response)
                setActions(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <div>
            {actions.map(function (action, index) {
                return (
                    <ul key={index}>
                        <li>Action description: {action.description}</li>
                        <li>Action notes: {action.notes} </li>
                    </ul>
                )
            })}
        </div>
    )
}
export default Actions;