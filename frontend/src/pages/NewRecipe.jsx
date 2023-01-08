import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";


function NewRecipe() {

    const bullet = "\u2022";
    const bulletWithSpace = `${bullet} `;
    const enter = 13;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [summary, setSummary] = useState('');
    const [instructions, setInstructions] = useState('');
    const submitHandle = (e) => {
        e.preventDefault();
        let ingcopy = ingredients;
        ingcopy = ingcopy.replaceAll(bulletWithSpace,'');
        let recipe = {
            "title": title,
            "ingredients": ingcopy.split("\n").filter(Boolean),
            "summary": summary,
            "instructions": instructions
        }  
        postRecipe(recipe);
        console.log(recipe);
    };
    const postRecipe = async (recipe) => {
        await fetch(
                `http://localhost:56733/recipes/create`,{
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(recipe)
                }
            );
    };
    const handleBullets = (e) => {

        const { keyCode, target } = e;
        const { selectionStart, value } = target;
        
        if (keyCode === enter) {
            target.value = [...value]
            .map((c, i) => i === selectionStart - 1
                ? `\n${bulletWithSpace}`
                : c
            )
            .join('');
            
            target.selectionStart = selectionStart+bulletWithSpace.length;
            target.selectionEnd = selectionStart+bulletWithSpace.length;
        }
        
        if (value[0] !== bullet) {
            target.value = `${bulletWithSpace}${value}`;
        }
    }
  return (
    <motion.div
      animate={{opacity:1}}
      initial={{opacity:0}}
      exit={{opacity:0}}
      transition={{duration:0.5}}
    >
        <FormStyle onSubmit={submitHandle}>
            <div>
                <p>Title</p>
                <input onChange={(e) => setTitle(e.target.value)} type="text" value={title}/>
                <p>Ingredients</p>
                <LongInput onChange={(e) => setIngredients(e.target.value)} type="textarea" value={ingredients} rows={4} onKeyUp={(e) => handleBullets(e)}/>
                <p>Summary</p>
                <LongInput onChange={(e) => setSummary(e.target.value)} type="text" value={summary} rows={4}/>
                <p>Instructions</p>
                <LongInput onChange={(e) => setInstructions(e.target.value)} type="text" value={instructions} rows={6}/>
                <input type="submit" value="Submit"/>
            </div>
        </FormStyle>
    </motion.div>
    
  )
}

const FormStyle = styled.form`

    div{
        width: 100%;
        position: relative;

    }
    input {
        border:  none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        margin-bottom: 1rem;
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;      
        transform: translate(100%,-50%);
        color: white;
    }
`;
const LongInput = styled.textarea`
    border:  none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
    margin-bottom: 1rem;

`;


export default NewRecipe