import styled from "styled-components"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

function Recipe() {
    let navigate = useNavigate();

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    
    const getDetails = async (name) => {
        const check = localStorage.getItem(name);
        if (check){
            setDetails(JSON.parse(check));
        }
        else{
            const data = await fetch(
                `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
                );
            const detailData = await data.json();
            localStorage.setItem(name, JSON.stringify(detailData))
            setDetails(detailData);
        }
    };
    useEffect(()=>{
        getDetails(params.name);

    }, [params.name]);
  return (
    <DetailWrapper>
        <Image>
            <h1>{details.title}</h1>
            <img src={details.image} alt=""/>
        </Image>
        <Info>
            <Button className={activeTab ==='instructions' ? 'active': ''} onClick={()=>setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab ==='ingredients' ? 'active': ''} onClick={()=>setActiveTab("ingredients")}>Ingredients</Button>
            <Button onClick={() => navigate(-1)}>Edit</Button> 
            <Button onClick={() => navigate(-1)}>Back</Button> 

            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                    <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                </div>
                
            )}
            {activeTab === 'ingredients' && (
                <ul>
                    {details.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}><h3>{ingredient.original}</h3></li>
                    ))}
                </ul>
            )}
            
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled(motion.div)`
    margin-top: 10rem;
    margin-bottom: 5rem;
    margin-left: 15%;
    margin-right: 15%;
    display: flax;
    h2{
        margin-bottom: 2rem;
    }
    .active{
        background: linear-gradient(36deg, #494949, #313131);
        color: white;
    }


`;
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    margin-bottom: 3rem;

`;
const Info = styled.div`
    margin-left: 5%;
    width: 60%;

`;
const Image = styled.div`
    img{
      margin-top: 10%;
    }
    display: grid;
`
export default Recipe
