// const postRecipe = async (recipe) => {
//     fetch(
//             `http://localhost:56733/recipes/create`,{
//                 method: 'POST',
//                 mode: 'cors',
//                 body: JSON.stringify(recipe)
//             }
//         );
// };
// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     mode: 'no-cors'
//  };
    
// const api = await fetch("http://localhost:56733/recipes", requestOptions)
// .then(result => console.log(result))
// .catch(error => console.log('error', error));
// const data = api.json();
// console.log(data);
const popular_api = async () => {
    const api = await fetch(`"http://localhost:56733/recipes"`)
    const data = await api.json();
    return data
}
export default popular_api