import { useEffect, useState } from "react";
import { Project } from "./types/Project";

function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(`http://localhost:5241/Book/AllProjects?pageHowMany=${pageSize}&pageNum=${pageNum}`);
            const data = await response.json();
            setProjects(data.projects);
            setTotalItems(data.totalNumProjects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        };
        fetchProjects();
    }, [pageSize, pageNum]);

    const sortedProjects = [...projects].sort((a, b) => {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

    return (
        <>
            <h1>Book Projects</h1>
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <br /><br />
            {sortedProjects.map((p) => (
                <div id='projectCard' className='card' key={p.bookID}>
                    <h3 className='card-title'>{p.title}</h3>
                    <div className='card-body'>
                        <ul className='list-unstyled'>
                            <li><strong>Author: </strong>{p.author}</li>
                            <li><strong>Publisher: </strong>{p.publisher}</li>
                            <li><strong>ISBN: </strong>{p.isbn}</li>
                            <li><strong>Classification: </strong>{p.classification}</li>
                            <li><strong>Category: </strong>{p.category}</li>
                            <li><strong>Page Count: </strong>{p.pageCount}</li>
                            <li><strong>Price: </strong>${p.price}</li>
                        </ul>
                    </div>
                </div>
            ))}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>
            <br /><br />
            <label>
                Results per page:
                <select 
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default ProjectList;