import React,{useState, useEffect} from 'react'
import API_URL from '../config';
import axios from 'axios';
const InstructionBookmark = ({id}) => {
  const [foodBookmark, setFoodBookmark] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_URL}api/UserBookMarked`, { id:id, onClickBook:false });
                setFoodBookmark(response.data.existed)
                // Handle the response from the backend as needed
            } catch (error) {
                console.error('Error fetching data from the backend:', error.message);
                // Handle errors if needed
            }
        };
        if(id && id!==null)
            fetchData();
    }, [id]);
    async function userClickHeartBtn() {
        try {
            const response = await axios.post(`${API_URL}api/UserBookMarked`, { id:id, onClickBook:true });
            if(response.data.existed){
                setFoodBookmark(response.data.existed)}
            else{
                setFoodBookmark(response.data.existed)}
            // Handle the response from the backend as needed
        } catch (error) {
            console.error('Error fetching data from the backend:', error);
            // Handle errors if needed
        }
    }
  return (
    <div onClick={userClickHeartBtn} className='Save' title="Bookmark">
      <i className={`bi bi-bookmark${foodBookmark ? '-fill text-gray-900' : ''}`}></i>
    </div>
  )
}

export default InstructionBookmark