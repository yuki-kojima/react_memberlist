const handleResponse = (res) => {
    console.debug(res);
    if (res.data.code !== "200") {
        console.error(res.data.data);
        return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
};

export default handleResponse;