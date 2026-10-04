import axios from "axios";

const api = axios.create({
    baseURL: "https://todoapplication-wkfi.onrender.com/api"
});


export default api;