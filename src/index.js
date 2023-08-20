import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGalleryImage } from "./js/pixabay-api";
import { createMarkup } from './js/template/createmarkup';
import { refs } from './js/refs';

const { searchForm, searchBtn, imageGallery, loadMoreBtn, spanMsg, scrollEl } = refs;
// const target = document.querySelector(".js-guard");

let page = 1;
let value = null;
let totalHitsImg = 0;

let options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(smoothScroll, options);

function smoothScroll(entries, observer) { 
    console.log(entries);
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            onLoadMore();
        }
    });
}

searchForm.addEventListener("submit", createImageGallery);

function createImageGallery(event) { 
    event.preventDefault();
    // imageGallery.innerHTML = "";
    value = event.currentTarget.searchQuery.value.trim();
    if (!value) { 
        Report.warning('Notiflix Warning', `Sorry, there are no images matching your search query. Please try again.`, 'Okay',);
        return;
    }
    resetGallery();  
    getImages();
    
    // loadMoreBtn.hidden = false;
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
    getImages();
}

async function getImages() { 
    try {
        const resp = await fetchGalleryImage(page, value);
          
        totalHitsImg += resp.data.hits.length;
        console.log('totalHitsImg', totalHitsImg);
        console.log("total", resp.data.total);

        
        if (!resp.data.total) {
            Report.warning('Notiflix Warning', `Sorry, there are no images matching your search query. Please try again.`, 'Okay',);
            // loadMoreBtn.hidden = true;
            return;
        }
        imageGallery.insertAdjacentHTML("beforeend", createMarkup(resp.data.hits));
        lightbox.refresh();
        observer.observe(scrollEl);

        
        if (totalHitsImg === resp.data.total || totalHitsImg < 40) { 
            spanMsg.textContent = "We're sorry, but you've reached the end of search results.";
            // loadMoreBtn.hidden = true;
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