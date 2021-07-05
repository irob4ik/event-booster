import cardTemplate from '../templates/cards.hbs';

const gallery = document.querySelector('.card-set');

export default class ApiService{
  constructor() {
    this.searchKeyword = '';
    this.searchCountry = '';
    this.currentPage = 0;
    this.params = {};
  }

  async getCountryByLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const result = await response.json();
        this.country = result.country;
        // добавить условие проверки деф страны!!!!!!!
        return result.country;
      } catch (error) {
          const DEFAULT_COUNTRY = 'GB';
          this.country = DEFAULT_COUNTRY;
          return DEFAULT_COUNTRY;
        }
  }

  async fetchEvents() {
    const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json`;
    const options = this.changeSearchOptions();

    try {
      const response = await fetch(BASE_URL+options);
      const result = await response.json();
      return result;
    } catch (error) {
      //
    }
  }

  async fetchEventByPage(page, country) {
    const apiKey = 'YtCjidrbY3XtU1FoAyynQpKvw26PaQjK';
    const sort = 'date,asc';
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=${country}&sort=${sort}&size=20&page=${page}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      
      console.log(result);
      this.getEvents(result._embedded.events);
    } catch (error) {
      //
    }
  }

  async fetchEventById(id) {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json`;
    const options = this.changeSearchOptions();
  
    try {
        const response = await fetch(url+options);
        const result = await response.json();
        return result;
    } catch (error) {
        //
    }
  }

  async getEvents(eventsArray) {
    try {
      await eventsArray.forEach(event => {
          event.images = [event.images.find(image => !image.fallback)]
      });
      gallery.innerHTML = '';
      this.createCardsMarkup(eventsArray);
    } catch (error) {
      //
    }
  }
  
  changeSearchOptions() {
    this.params.apikey = 'YtCjidrbY3XtU1FoAyynQpKvw26PaQjK';
    this.params.countryCode = this.searchCountry;
    this.params.sort = 'date,asc';
    this.params.size = '20';
    this.params.page = this.currentPage;
    this.params.keyword = this.keyword;

    if (this.keyword === '') {
      delete this.params.keyword;
    }
    const keys = Object.keys(this.params);
    return keys.length
      ?
        "?" + keys
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.params[key]))
        .join("&")
      : "";
  }

  createCardsMarkup(events) {
    gallery.innerHTML = cardTemplate(events);
  }
  
  get keyword() {
    return this.searchKeyword;
  }
  get country() {
    return this.searchCountry;
  }
  get page() {
    return this.currentPage;
  }
  set keyword(newKeyword) {
    this.searchKeyword = newKeyword;
  }
  set country(newCountry) {
    this.searchCountry = newCountry;
  }
  set page(newPage) {
    this.currentPage = newPage - 1;
  }
}

