import styled from "styled-components"

const FormStyle = styled.form`
input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 1rem 3rem;
    font-size: 1.5rem;
    color: grey;
    background: linear-gradient(35deg, #f1f1f1, #f1f1f1);

}
margin: 5% 20%;
display: flex;
div{
    width: 100%;
    position: relative;
}
svg{
    position: absolute;
    top: 50%;
    left: 0%;      
    transform: translate(100%,-50%);
    color: grey;
}
`;

export default FormStyle;