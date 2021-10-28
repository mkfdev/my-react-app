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
      params: { limit: 21 },
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
      limit: 10,
    };
    const response = await this.api.get("images/search", {
      params: query_params,
    });

    return response.data;
  }

  async searchImageAndData(query) {
    let query_params = {
      breed_ids: query,
      limit: 1, //기본정보는 같아서 대표로 1개만 요청
    };
    const response = await this.api.get("images/search", {
      params: query_params,
    });

    // console.log(response);
    return response.data.map(item => ({
      ...item,
      temperament: item.breeds[0].temperament || "No data",
      weight: item.breeds[0].weight.metric || "No data",
      lifeSpan: item.breeds[0].life_span || "No data",
    }));
  }
}

export default PetAPI;
