import React, { useEffect, useState } from 'react'
import axios from 'axios'


function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}

function PostList() {
    const [list, setList] = useState([]);
    const getApi = () => {
        axios.get("https://api.github.com/repositories").then((response) => {
            setList(response.data);
            hideSpinner();
        });
    };
    useEffect(() => getApi(), []);
    return (
        <div className='preloading'>
            <div className='spinner-border' id='spinner'></div>
            <ul className='mt-5'>
                {list.map(item => <li className='text-center' key={item.id}>{item.full_name}</li>)}
            </ul>
        </div>
    )
}

export default PostList