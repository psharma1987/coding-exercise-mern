// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import './App.css'; // Optional: Create styles for pagination

const App = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust items per page here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="container">
            <h1>Posts</h1>
            <ul className="list-group">
                {currentPosts.map(post => (
                    <li key={post.id} className="list-group-item">
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </div>
    );
};

export default App;
