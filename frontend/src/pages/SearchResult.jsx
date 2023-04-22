import styled from "styled-components";
import { motion } from 'framer-motion';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function SearchResult() {
    const [searchResult, setSearchResult] = useState([]);
    let params = useParams();
    const getSearchResult = async (key) => {

        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${key}`);
        const recipes = await data.json();
        setSearchResult(recipes.results);
        
    };
    useEffect(() => {
        getSearchResult(params.key)
    },[params.key])
  return (
    <Grid
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
    >
        {searchResult.map((item) => {
            return(<Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                        <img src={item.image} alt=""/>
                        <h4>{item.title}</h4>
                    </Link>
                </Card>);
        })}
    </Grid>
  );
    
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
    margin-left: 10%;
    margin-right: 10%;
`;
const Card = styled.div`
    img {
        border-radius: 2rem;
        width: 100%;
    }
    a {
        text-decoration: none;
    }
    h1 {
        text-align: center;
        padding: 1rem;
    }
`;
export default SearchResult;