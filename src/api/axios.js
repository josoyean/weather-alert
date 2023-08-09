import axios from 'axios';

const instance = axios.create({
    baseURL: "https://apis.data.go.kr",
    // baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key:"39a357660c1ce650b3e6dade2c90cb82",
        language: "ko-KR"
    }
})

export default instance;