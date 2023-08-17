import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGalleryImage } from "./js/pixabay-api";
import { createMarkup } from './js/template/createmarkup';

const refs = {
    searchForm: document.getElementById("search-form"),
    searchBtn: document.querySelector(".js-btn"),
    imageGallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".js-load-more")
};

const { searchForm, searchBtn, imageGallery, loadMoreBtn } = refs;


searchForm.addEventListener("submit", createImageGallery);

function createImageGallery(event) { 
    event.preventDefault();
    const value = event.currentTarget.searchQuery.value.trim();
    if (!value) { 
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
    }
      
    fetchGalleryImage(value).then((resp) => {

            // console.log(resp.data.hits);
        if (!resp.data.hits) { 
            Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            return;
        }
        imageGallery.innerHTML = createMarkup(resp.data.hits)
        lightbox.refresh();
     }).catch((error) => console.log(error))
   
    imageGallery.innerHTML = "";
}

let lightbox = new SimpleLightbox('.gallery a', { 
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

//Paginations function
let page = 1;
let per_page = 40;

loadMoreBtn.addEventListener("click", onLoadMore);

function onLoadMore() { 
    page += 1;

}