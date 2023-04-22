import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '../style/category.css';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    let params = useParams();
    const getFavorites = async (name) => {
        const check = localStorage.getItem('favorites');
        if (check){
            setFavorites(JSON.parse(check));
        }
        else{
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=italian`);
            const recipes = await data.json();
            localStorage.setItem('favorites', JSON.stringify(recipes.results))
            setFavorites(recipes.results)        
         }
    };
    useEffect(() => {
        getFavorites(params.type)
    },[params.type])
   
  return (
    <div className="wapper">
        <h2>מועדפים</h2>
        <Splide options={{
        perPage: 4,
        gap: "4rem",
        focus: 'center',
        type: 'loop',
        drag: "free",
        }}>
            {favorites.map((favorite) => {
            return(
                <SplideSlide key={favorite.id}>
                    <div className="card">
                        <Link to={'/recipe/'+favorite.id}>
                            <p>{favorite.title}</p>
                            <img src={favorite.image} alt={favorite.title}></img>
                        </Link>
                    </div>
                </SplideSlide>
            );
            })}
        </Splide>
    </div>
  )
}


export default Favorites
