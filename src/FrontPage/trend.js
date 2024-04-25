import React, { useEffect, useState } from 'react';
import Slide from './Slider'
import Foot from './foot'
export default function Trending() {
  // Assuming your Slider component requires some data items

  const [response, setResponse] = useState('');
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);

  async function funtosee(data) {
    console.log(data);
    let temp = data.map((item) => [
      item['TranslatedRecipeName'],
      item['Cuisine'],
      item['Diet'],
      item['Course'],
      item['Image'],
      item['_id']
    ])

    return temp
  }
  const sendMessage = async (searchQuery, currentPage, perPage) => {
    try {
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: searchQuery, currentPage: currentPage, perPage: perPage }),
      });

      const data = await response.json();
      setResponse(data.response);
      console.log(funtosee(data.datavalue))
      return funtosee(data.datavalue);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  useEffect(() => {
    const fetchCall = async() => {
      console.log("shit")
      setArr(await sendMessage("Dinner", 1, 20))
      setArr1(await sendMessage("Lunch", 1, 20))
      setArr2(await sendMessage("Breakfast", 1, 20))
    }
    fetchCall()
  }, []);

  return (

    <div className='Search'>

      <div className='Recommed'>
        TRENDING RECIPE
      </div>
      <Slide images1={arr2} />
      <div className='Recommed'>
        Cuisines
      </div>
      <div className='absolute left-1/2 transform -translate-x-1/2'>
        <div className='flex w-full mt-[4vw] text-gray-100 text-[1vw] font-semibold'>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Dinner</div>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Breakfast</div>
          <div className='p-2 mr-4 border border-grey-100 bg-red-400 rounded-full'>Lunch</div>
          <div className='p-2 border border-grey-100 bg-blue-400 rounded-full'>Non-Veg</div>
        </div>
      </div>
      <div className='mt-[4vw]'>
        <Slide images1={arr2} />
      </div>
      <div className='Recommed'>
        Cursins
      </div>
      <div className='absolute left-1/2 transform -translate-x-1/2'>
        <div className='flex w-full mt-[4vw] text-gray-100 text-[1vw] font-semibold'>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Dinner</div>
          <div className='p-2 mr-4 border border-grey-100 bg-red-400 rounded-full'>Breakfast</div>
          <div className='p-2 mr-4 border border-grey-100 bg-blue-400 rounded-full'>Lunch</div>
          <div className='p-2 border border-grey-100 bg-blue-400 rounded-full'>Non-Veg</div>
        </div>
      </div>
      <div className='mt-[4vw]'>
        <Slide images1={arr2} />
      </div>
      <br />

      <div>
        <Foot />
      </div>
    </div>
  );
}