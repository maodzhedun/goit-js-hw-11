import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38815747-812e0b1a0705a38baabb283c8";


async function fetchGalleryImage(page = 1, value) {
    axios.defaults.params = {
    key: API_KEY,
    q: value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: page,
    per_page: 40,
    }

    return await axios.get(BASE_URL)
}

//
export { fetchGalleryImage }