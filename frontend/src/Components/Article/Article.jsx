import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

import Navbar from '../Navbar';

const CATEGORIES_ENDPOINT = `${BACKEND_URL}/categories`;

function Article(){
    const [error, setError] = useState("");
    const [content, setContent] = useState("");
    const { topicName, topicID, articleID } = useParams();

    const contentID = articleID;
    
    console.log("ARTICLE ID: " + topicName + topicID + articleID);

    const fetchArticle = () => {
        axios.get(CATEGORIES_ENDPOINT,`/article/${contentID}`)
        .then(({ data }) => {
            
            console.log("Received data:", data); // currently receives all database ..
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
                    <h1>{articleID} ABOUT</h1>
                </header>




            </div>

        </div>
        
      );
}


export default Article;
