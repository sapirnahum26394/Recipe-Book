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
            setCuisine(JSON.parse(check));
        }
        else{
//             var myHeaders = new Headers();
//             myHeaders.append("Accept", "*/*");
//             myHeaders.append("Accept-Language", "en-US,en;q=0.9");
//             myHeaders.append("Connection", "keep-alive");
//             myHeaders.append("Referer", "http://localhost:3000/");
//             myHeaders.append("Sec-Fetch-Dest", "empty");
//             myHeaders.append("Sec-Fetch-Mode", "no-cors");
//             myHeaders.append("Sec-Fetch-Site", "same-site");
//             myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
//             myHeaders.append("sec-ch-ua", "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"");
//             myHeaders.append("sec-ch-ua-mobile", "?0");
//             myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
//             var requestOptions = {
//               method: 'GET',
//               headers: myHeaders,
//               redirect: 'follow',
//               mode: 'no-cors'
//             };
//
//             fetch( `http://localhost:56733/recipes/category/${name}`, requestOptions)
//               .then(response => console.log(response))
//               .then(result => console.log(result))
//               .catch(error => console.log('error', error));

//             const data = await fetch(`http://localhost:56733/recipes/category/${name}`,{
//                     method: 'GET',
//                     mode: 'no-cors'
//                 });
//             console.log(data)
//             const recipes = await data.json();
//             console.log(recipes)
//
//             localStorage.setItem(name, JSON.stringify(recipes.results))
//             setCuisine(recipes.results);
                axios.get(`http://localhost:56733/recipes/category/${name}`,
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }})
                    .then(res => {
                        const recipes = res.data;
                        console.log(recipes)
                        setCuisine(recipes);
                    })

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
    margin-right: 10%;
    margin-left: 10%;
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
export default Cuisine