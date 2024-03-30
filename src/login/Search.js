import React, { useEffect, useState } from 'react';
import './sear.css';
import Foot from '../FrontPage/foot'
import { useNavigate } from 'react-router-dom';
import TopBar from '../component/TopBar'
const SearchPage = () => {
    let curPage=1, totPage=10, perPage=20;
    const [response, setResponse] = useState('');
    const [arr, setArr] = useState([]);
    const [currentPage,setCurrentPage]=useState(curPage)
    const [totalPage, setTotalPage]=useState(totPage)

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
                    body: JSON.stringify({ message: 'search', currentPage:curPage, perPage:perPage}),
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
                body: JSON.stringify({ message: searchQuery, currentPage:curPage, perPage:perPage }),
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
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handlePageItemClick = (e) => {
        const targetClassName = e.target.className;
        if (targetClassName.includes('page-item')) {
          e.target.style.backgroundColor = 'blue';
        }
      };
    return (
        <div className='SearchP'>
            <TopBar />

            <section id="SearchPmiddle">
                <div className="SearchPinput1 absolute ml-20">
                    <input className='SearchTextField'
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress} />
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
                                className='ml-1 mb-3 text-gray-100 font-bold px-3 py-2 w-auto bg-blue-500 rounded-lg hover:bg-blue-600'>
                                Get Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <div
                id="pagination-container"
                className="text-center d-flex justify-content-between align-items-center mb-4"
            >
                <button id="prev-btn" className="btn btn-primary ml-20">Previous</button>

                <ul className="pagination" onClick={handlePageItemClick}>
                    <li className="page-item">1</li>
                    <li className="page-item">...</li>
                    <li className="page-item">3</li>
                    <li className="page-item">4</li>
                    <li className="page-item">5</li>
                    <li className="page-item">6</li>
                    
                    <li className="page-item">...</li>
                    <li className="page-item">10</li>
                </ul>
                <button id="next-btn" className="btn btn-primary mr-20">Next</button>
            </div>
            <div>
                <Foot />
            </div>
        </div>
    );
};

export default SearchPage;
