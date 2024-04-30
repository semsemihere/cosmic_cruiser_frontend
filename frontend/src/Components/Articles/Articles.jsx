import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Navbar from '../Navbar';


const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;


function sectionObjectToArray({ Data }) {
    const keys = Object.keys(Data);
    const articles = keys.map((key) => Data[key]);
    return articles;
}

function Articles(){
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]);
    const { topicId } = useParams();
    const section = topicId.slice(0,3)
    const sectionId = topicId.slice(-3)

    const fetchArticles = () => {
        axios.get(`${FINANCES_ENDPOINT}/${section}/${sectionId}`)
        .then(({ data }) => setArticles(sectionObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of sections'));
    };

    useEffect(fetchArticles, []);

    return (
        <div>
            <Navbar/>
            <div className='wrapper'>
                <h1>{section} Articles</h1>
            
                {articles.map((articles) => (
                    <div className="finances-container">
                    <h2>{articles}</h2>
                    
                    </div>
                ))
                }
            </div>

        </div>
        
      );
}


export default Articles;
