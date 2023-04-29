import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import '../style/category.css';

function Categories() {
    
    const categories =  [
        {
            'id':'meat',
            'title': 'בשרי',
            'background': 'https://imageproxy.wolt.com/venue/63a47b3c6d3bc0c1f60a555c/67162998-9712-11ed-8ebf-1650e9068854_img_9616.jpg?w=960',
        },
        {
            'id':'dairy',
            'title': 'חלבי',
            'background': 'https://imageproxy.wolt.com/venue/5f82c5700ae24a87e6f9f936/941481ec-65b2-11ed-90b2-c6769ebdbadb_9nov_tlv19663.jpg?w=960',
        },
        {
            'id':'fish',
            'title': 'דגים',
            'background': 'https://imageproxy.wolt.com/venue/625c0ff3bd3bdb74bda06acb/91fef4c4-c098-11ec-9102-5e2d326b14b6__.jpg?w=600',
        },
        {
            'id':'vegetarian',
            'title': 'פרווה',
            'background': 'https://imageproxy.wolt.com/venue/5d63b7ecac643b1e3cc21699/f0a94bfaefd416b176641fdf4c569876-edits/a2686798a03a8082648c2d8625ef53c3?w=600',
        },
        {
            'id':'salads',
            'title': ' סלטים',
            'background': 'https://imageproxy.wolt.com/venue/5cb3003be6fb73000cd7f637/2d8c0470f1cdf3711e680e98142c3682-edits/018e0a749826e37c5f60f46fdbe3d364?w=600',
        },
        {
            'id':'dessert',
            'title': 'קינוחים',
            'background': 'https://imageproxy.wolt.com/venue/5f62044174d8e8d5b2f5e157/2b9caaf8-81ed-11ec-93a8-c2f500c93a78_____.jpg?w=960',
        },

    ]

  return (
    <div className="wapper">
        <h2>קטגוריות</h2>
        <Splide options={{
        perPage: 4,
        gap: "4rem",
        focus: 'center',
        type: 'loop',
        drag: "free",
        }}>
            {categories.map((category) => {
            return(
                <SplideSlide key={category.id}>
                    <div className="card">
                        <Link to={'/recipes/category/'+category.id}>
                            <p>{category.title}</p>
                            <img src={category.background} alt={category.title}></img>
                        </Link>
                    </div>
                </SplideSlide>
            );
            })}
        </Splide>
    </div>
  )
}


export default Categories
