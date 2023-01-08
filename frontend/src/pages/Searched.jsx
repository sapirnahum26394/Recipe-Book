import styled from "styled-components"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
    const getSearchedRecipes = async (input) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${input}`
            );
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    };
    useEffect(() => {
        getSearchedRecipes(params.search);
    },[params.search]);

    return (
            <Grid>
                {searchedRecipes.map((item)=> {
                    return(
                        <Card key={item.id}>
                            <Link to={'/recipe/'+item.id}>

                                <img src={item.image} alt=""/>
                                <h4>{item.title}</h4>
                            </Link>
                        </Card>
                    )
                })};
            </Grid>
    );
}
const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
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
export default Searched