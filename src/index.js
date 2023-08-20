import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGalleryImage } from "./js/pixabay-api";
import { createMarkup } from './js/template/createmarkup';
import { refs } from './js/refs';

let page = 1;
let value = null;
let totalHitsImg = 0;


const { searchForm, searchBtn, imageGallery, loadMoreBtn, spanMsg } = refs;

searchForm.addEventListener("submit", createImageGallery);

function createImageGallery(event) { 
    event.preventDefault();
    imageGallery.innerHTML = "";
    value = event.currentTarget.searchQuery.value.trim();
    if (!value) { 
        Report.warning('Notiflix Warning', `Sorry, there are no images matching your search query. Please try again.`, 'Okay',);
        return;
    }
    resetGallery();  
    getImages();
    
    loadMoreBtn.hidden = false;
}

let lightbox = new SimpleLightbox('.gallery a', { 
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

//Paginations function

loadMoreBtn.addEventListener("click", onLoadMore);


function onLoadMore() { 
    page += 1;
    // loadMoreBtn.hidden = true;
    getImages();
    // loadMoreBtn.hidden = false;

}

async function getImages() { 
    try {
        const resp = await fetchGalleryImage(page, value);
        
     
        total = resp.data.total;
        console.log('total', total);
        hits = resp.data.hits.length;
        console.log('hits', hits);
        totalHitsImg += hits;
        console.log('totalHitsImg', totalHitsImg);

        
        if (!resp.data.total) {
            Report.warning('Notiflix Warning', `Sorry, there are no images matching your search query. Please try again.`, 'Okay',);
            loadMoreBtn.hidden = true;
            return;
        }
        imageGallery.insertAdjacentHTML("beforeend", createMarkup(resp.data.hits));
        lightbox.refresh();
        
        if (totalHitsImg === total || totalHitsImg < 40) { 
            spanMsg.textContent = "We're sorry, but you've reached the end of search results.";
            loadMoreBtn.hidden = true;
            return;
        }

        if (totalHitsImg > 40) {
            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
            
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
            spanMsg.hidden = true;
            // loadMoreBtn.hidden = false;
        }
    } catch (error) {
        Report.failure('404', '');
        console.log(error.message);
    }

}


function resetGallery() { 
    page = 1;
    totalHitsImg = 0;
    loadMoreBtn.hidden = true;
    spanMsg.textContent = "";
    imageGallery.innerHTML = "";
}