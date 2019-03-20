import axios from "axios";

const axiosCreate = () => {
    const httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });

    return httpClient;
};

export default axiosCreate;