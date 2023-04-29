import styled from "styled-components";
import { motion } from 'framer-motion';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();
    const getCuisine = async (name) => {
        const check = localStorage.getItem(name);
        if (check){
            setCuisine(JSON.parse(check).recipes);
        }
        else{
            fetch(`http://localhost:56733/recipes/category/${name}`).then(response => response.json())
              .then(data => {
                localStorage.setItem(name, JSON.stringify(data))
                setCuisine(data.recipes);
              })
              .catch(error => {
                console.error(error);
              });
        }
    };
    useEffect(() => {
        getCuisine(params.name)
    },[params.name])
  return (
    <Grid
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
    >
        {cuisine.map((item) => {
            return(<Card key={item._id}>
                    <Link to={'/recipes/'+item._id}>
                        <img src={item.image} alt=""/>
                        <h4>{item.title}</h4>
                    </Link>
                </Card>);
        })}
    </Grid>
    
  );
}

const Grid = styled(motion.div)`
    margin-right: 10%;
    margin-left: 10%;
    margin-bottom: 10%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img {
        border-radius: 2rem;
        width: 100%;
        max-width: 350px;
    }
    a {
        text-decoration: none;
    }
    h1 {
        text-align: center;
        padding: 1rem;
    }
`;
export default Cuisine