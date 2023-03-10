import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

const createGalleryMarkup = (galleryItems) => {
    const { preview, original, description } = galleryItems;
    return `<a class="gallery__item" href="${original}"><img class="gallery__image" src=${preview} alt=${description} title=${description} /></a>`;
};
  
const gallery = document.querySelector(".gallery");
const createGallery = galleryItems.map(createGalleryMarkup).join("");
gallery.insertAdjacentHTML("beforeend", createGallery);

const lightbox = new SimpleLightbox('.gallery a', {captionDelay:250});