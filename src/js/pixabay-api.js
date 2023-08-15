import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38815747-812e0b1a0705a38baabb283c8";

const params = new URLSearchParams({
    key: "API_KEY",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
})

function fetchGalleryImage() {
    return axios.get(`${BASE_URL}?${params}`)
}

export { fetchGalleryImage }