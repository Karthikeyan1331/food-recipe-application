import React, { useState, useEffect, useRef } from 'react'
import TopBar from '../component/TopBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const [arr, setArr] = useState([]);
    async function SearchD(data) {
        console.log(data);

        setArr(
            data.map((item) => [
                item['TranslatedRecipeName'],
                item['Cuisine'],
                item['Diet'],
                item['Course'],
                item['Image'],
                item['TranslatedIngredients'],
                item['TotalTimeInMins'],
                item['Servings'],
                item['TranslatedInstructions'],
                item['_id']
            ])
        );
    }
    const navigate = useNavigate();
    const redirectToNextPage = (data) => {
        // Redirect to '/Instruction' when the component is clicked
        console.log(data[0])
        navigate('/Instruction?id='+data[9], { state: data });
    };

    const DefSearch = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: 'search' }),
            });

            const data = await response.json();
            SearchD(data.datavalue);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    useEffect(() => {
        DefSearch();
    }, []);
    return (
        <div>
            <section id="SearchPsearch-results">
                {/* Sample Recipe Card */}
                {arr.map((item, index) => (
                    <div className="SearchPrecipe-card h-auto" key={index}>
                        <img src={item[4]} alt={item[0]} />
                        <div className="px-1">
                            <h2>{item[0]}</h2>
                            <h3>{item[1]}</h3>
                            <button onClick={() => redirectToNextPage(item)}
                                className='ml-1 mb-3 text-gray-100 font-bold px-3 py-2 w-auto bg-blue-500 rounded-lg hover:bg-blue-600'>
                                Get Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
export default Dashboard