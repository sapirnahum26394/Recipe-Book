import { useState, useEffect } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);
    const getPopular=()=>{
        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Accept-Language", "en-US,en;q=0.9");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("Referer", "http://localhost:3000/");
        myHeaders.append("Sec-Fetch-Dest", "empty");
        myHeaders.append("Sec-Fetch-Mode", "no-cors");
        myHeaders.append("Sec-Fetch-Site", "same-site");
        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36");
        myHeaders.append("sec-ch-ua", "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"");
        myHeaders.append("sec-ch-ua-mobile", "?0");
        myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          mode: 'no-cors'
        };
        
        fetch("http://localhost:56733/get", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
      useEffect(()=>{
        getPopular()
      },[])


    // useEffect(() => {
    //     getPopular();
    // },[]);

    // const getPopular = async () => {
    //     const requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow',
    //         mode: 'no-cors'
    //      };
    //     const api = await fetch(`http://localhost:56733/get`, requestOptions)
    //     const data = await api.json();
    //     console.log(data)
    //     setPopular(data.recipes);
        
    // }
  return (
    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
            <Splide options={{
                perPage:4,
                drag: 'free',
                gap: '5rem'
            }}>
                {popular.map((recipe) => {
                return(
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <Link to={'/recipe/'+recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title}></img>
                                <Gradient/>
                            </Link>
                        </Card>
                    </SplideSlide>
                );
                })}
            </Splide>
        </Wrapper>

    </div>
  )
}
const Wrapper = styled.div`
    margin: 4rem 0rem;
`;
const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%,0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height:40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: liear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;
export default Popular