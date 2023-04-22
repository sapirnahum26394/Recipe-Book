import FormStyle from "../style/style"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandle = (e) => {
        e.preventDefault();  
        console.log(input)
        navigate('/search/'+input)
    };
  return (
    <FormStyle onSubmit={submitHandle}>
        <div>
            <FaSearch></FaSearch>
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </div>
    </FormStyle>
  )
}

export default Search
