import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';


const FINANCES_ENDPOINT = `${BACKEND_URL}/categories/finances`;
const NUTRITION_ENDPOINT = `${BACKEND_URL}/categories/nutrition`;

// const CURR_ENDPOINT = FINANCES_ENDPOINT
const CURR_ENDPOINT = NUTRITION_ENDPOINT

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
        // axios.get(`${CURR_ENDPOINT}/${sectionName}/${sectionID}`)
        // .then(({ data }) => setArticles(sectionObjectToArray(data)))
        axios.get(`${CURR_ENDPOINT}/${sectionID}/articles`)
        .then(({ data }) => {
            if(data && data.Data){
                const articlesArray = Object.values(data.Data);
                setArticles(articlesArray);
            }
            else{
                setError("Received unexpected data format");
            }
        })
        .catch(() => setError('There was a problem getting the list of sections'));
    };

    console.log('Articles:' + fetchArticles);

    useEffect(fetchArticles, []);

    return (
        <div>
            <Navbar/>
            <div className='wrapper'>
                <header>
                    <h1>{sectionName} Articles</h1>
                </header>
                

                {/* <div className='finances-container'>
                    {Array.isArray(articles) ? (
                        articles.map(article => (

                            // <h2 key={article.articleName}>
                            //     {article.articleName}
                            // </h2>

                            <h2 key={article.articleID}>
                                {article.articleName}
                            </h2>

                            
                        ))
                    ) : (
                        <div>No articles available</div>
                    )}
                </div> */}
                
                {/* <div className='finance-container'>
                    
                </div> */}
                {Array.isArray(articles) ? (
                    articles.map(article => (
                        <div className='grid-item' >
                            
                            <Link to={`${CURR_ENDPOINT}/${article.articleID}`}>
                                <h2>{article.articleName}</h2>
                            </Link>
                            <p>Section ID: {article.articleID} </p>
                        </div>
                    ))
                ) : (
                    <div>No articles available</div>
                )}




            </div>

        </div>
        
      );
}


export default Articles;
