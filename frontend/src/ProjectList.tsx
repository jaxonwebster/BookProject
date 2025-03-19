import { useEffect, useState} from "react";
import {Project} from './types/Project';

function ProjectList() {

    const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
    const fetchProjects =  async () => {
        const response = await fetch ('http://localhost:5241/Book/AllProjects');
        const data = await response.json();
        setProjects(data);
    };
    fetchProjects();
}, []);

    return (
        <>
            <h1>Book Projects</h1>
            <br></br>
            {projects.map((p) => (
                <div id='projectCard' key ={p.bookID}>
                    <h3>{p.title}</h3>

                    <ul>
                        <li>Author: {p.author}</li>
                        <li>Publisher: {p.publisher}</li>
                        <li>ISBN: {p.isbn}</li>
                        <li>Classification: {p.classification}</li>
                        <li>Category: {p.category}</li>
                        <li>Page Count: {p.pageCount}</li>
                        <li>Price: ${p.price}</li>
                    </ul>
                </div>
            ))}
        </>    
    );
}

export default ProjectList;