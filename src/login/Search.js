import React, { useEffect, useState } from 'react';
import './sear.css';
import Foot from '../FrontPage/foot'
import { useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar'
const SearchPage = () => {
    const [response, setResponse] = useState('');
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
            ])
        );
    }

    useEffect(() => {
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
                setResponse(data.response);
                SearchD(data);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        };

        DefSearch();
    }, []);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        try {       
            console.log(searchQuery)
            let response = await fetch('http://localhost:8000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: searchQuery }),
            });

            const data = await response.json();
            setResponse(data.response);
            SearchD(data);
        } catch (error) {
            console.error('Error sending search query:', error);
        }
    };



    const navigate = useNavigate();

  const redirectToNextPage = (data) => {
    // Redirect to '/Instruction' when the component is clicked
    console.log(data[0])
    navigate('/Instruction', { state: data });
  };
    return (
        <div className='SearchP'>
            <TopBar />

            <section id="SearchPmiddle">
                <div className="SearchPinput1">
                    <input className='SearchTextField'
                        type="text"
                        placeholder="Type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <input className='SearchPSubmit'
                        type="submit"
                        value="Search"
                        onClick={handleSearch} />
                </div>
            </section>

            <section id="SearchPsearch-results">
                {/* Sample Recipe Card */}
                {arr.map((item, index) => (
                    <div className="SearchPrecipe-card h-auto" key={index}>
                        <img src={item[4]} alt={item[0]} />
                        <div className="px-1">
                            <h2>{item[0]}</h2>
                            <h3>{item[1]}</h3>
                            <button onClick={() => redirectToNextPage(item)}
                            className='ml-1 mb-3 text-gray-100 font-bold px-3 py-2 w-auto bg-blue-400 rounded-lg'>
                                Get Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <br />

            <div>
                <Foot />
            </div>
        </div>
    );
};

export default SearchPage;
