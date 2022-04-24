import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

class ApiService {
  static #API_KEY = '25741078-4fc96325b71ca39b2d0ebb27c';
  page = 1;
  query = '';
  totalPages = 12;

  async fetchPhotos() {
    const queryParams = new URLSearchParams({
      key: ApiService.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      page: this.page,
      per_page: this.totalPages,
    });
    const response = await axios.get(`?${queryParams}`);
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

const api = new ApiService();

export default api;
