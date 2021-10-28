import axios from "axios";

class PetAPI {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.thedogapi.com/v1",
      params: { key: process.env.REACT_APP_PET_API_KEY },
    });
  }

  async getImages() {
    const response = await this.api.get("images/search", {
      params: { limit: 5 },
    });

    return response.data;
  }

  async getBreeds() {
    const response = await this.api.get("breeds");
    return response.data;
  }

  async searchImage(query) {
    let query_params = {
      breed_ids: query,
      limit: 5,
    };
    const response = await this.api.get("images/search", {
      params: query_params,
    });

    console.log(response);
    return response.data;
  }
}

export default PetAPI;
