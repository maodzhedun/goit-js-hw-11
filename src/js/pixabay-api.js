import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38815747-812e0b1a0705a38baabb283c8";


function fetchGalleryImage(value) {
    axios.defaults.params = {
    key: API_KEY,
    q: value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    }

    return axios.get(BASE_URL)
}

//
export { fetchGalleryImage }