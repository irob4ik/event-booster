import cardTamplate from '../templates/cards.hbs';
const gallery = document.querySelector('.card-set');
const galleryText = document.querySelector('.default-info');

export default async function getEvents(obj) {
  try {
      galleryText.innerHTML = '';
      const eventsArray = obj._embedded.events;
     
      eventsArray.forEach(event => {
        event.images = [event.images.find(image => !image.fallback)]
      });
      createCardsMarkup(eventsArray);
  } catch (error) {
    
    // gallery.innerHTML = '';
    galleryText.insertAdjacentHTML('beforeend', '<p class="text">Sorry, no events matching your request &#129335; but we are ready to go and find something else for you. Try us again! &#128521;</p>');
    galleryText.insertAdjacentHTML('beforeend', '<div id="walk-container"><div id="walk"></div></div>'); 
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}