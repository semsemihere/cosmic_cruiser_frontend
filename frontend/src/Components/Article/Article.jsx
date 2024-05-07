import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

import Navbar from '../Navbar';

const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;
const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;


// const CURR_ENDPOINT = FINANCES_ENDPOINT
const CURR_ENDPOINT = NUTRITION_ENDPOINT
// const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;

function Article(){
    const [error, setError] = useState("");
    const [content, setContent] = useState("");
    const { topicName, topicID, articleID } = useParams();

    
    console.log("ARTICLE ID: " + topicName + topicID + articleID);

    const fetchArticle = () => {
        // axios.get(CATEGORIES_ENDPOINT,`/article/${contentID}`)
        axios.get(`${CURR_ENDPOINT}/${topicID}/articles/${articleID}`)
        .then(({ data }) => {
            console.log("Received data:", data); 
            setContent(data);
        })
        .catch(() => setError('There was a problem getting the list of sections'));
    };

    console.log('Article:' + content);

    useEffect(fetchArticle, []);

    return (
        <div>
            <Navbar/>
            <div className='wrapper'>
                <header>
                    <h1>{topicName}</h1>
                </header>

                <div className='grid-item' >
                    {content}
                </div>




            </div>

        </div>
      );
}


export default Article;
