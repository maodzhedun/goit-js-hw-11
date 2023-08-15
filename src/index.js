import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGalleryImage } from "./js/pixabay-api";

const refs = {
    searchForm: document.getElementById("search-form"),
    searchBtn: document.querySelector(".js-btn"),
    imageGallery: document.querySelector(".gallery"),
};

const { searchForm, searchBtn, imageGallery } = refs;


searchBtn.addEventListener("submit", createImageGallery);

function createImageGallery(event) { 
    event.preventDefault();
    console.dir(event.target);
}
//     .then((resp) => resp.json())
//     .then((res) => console.log(res))
// .catch(err => console.log(object))