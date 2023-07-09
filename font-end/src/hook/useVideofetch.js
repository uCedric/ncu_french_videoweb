import axios from 'axios';

const useVideoFetch =async () => {
    try{
        const {data} =await axios.get("http://localhost:8081/video/all");
        return data;
    }catch{

    }
};

export default useVideoFetch;