//Base configuration for axios requests shared across al requests to trim code
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})
