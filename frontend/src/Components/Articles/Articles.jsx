import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Navbar from '../Navbar';


const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;
const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;

function sectionObjectToArray({ Data }) {
    const keys = Object.keys(Data);
    const objects = keys.map((key) => Data[key]);
    const articles = objects['articles']
    return articles;
}

function Articles(){
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]);
    const { topicName } = useParams();
    const { topicID } = useParams();
    const sectionName = topicName;
    const sectionID = topicID;

    const fetchArticles = () => {
        axios.get(`${NUTRITION_ENDPOINT}/${sectionName}/${sectionID}`)
        .then(({ data }) => setArticles(sectionObjectToArray(data)))
        .catch(() => setError('There was a problem getting the list of sections'));
    };

    console.log('Articles:' + fetchArticles);

    useEffect(fetchArticles, []);

    return (
        <div>
            <Navbar/>
            <div className='wrapper'>
                <h1>{sectionName} Articles</h1>
            
                {articles.map((article) => (
                    <div className="finances-container">
                    <h2>{article}</h2>
                    
                    </div>
                ))}
            </div>

        </div>
        
      );
}


export default Articles;
