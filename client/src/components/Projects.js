import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Actions from './Actions';

const Projects = () => {

    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios
            .get("http://localhost:4000/api/projects/")
            .then(response => {
                console.log(response.data)
                setProjects(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    
    return (
        <div>
            {projects.map(function  (project, index) {
                return (
                    <div key={index}>
                        <h3>{project.name}</h3>
                        <h4>{project.description}</h4>
                        <Actions props={project.id}/>
                    </div>
                )
            })}
        </div>
    )
}
export default Projects;