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

    // respnse.data데이터 구조
    // 0:
    // breeds: [{…}]
    // height: 500
    // id: "SJZIJgqEX"
    // width: 333
    // => data[0] - breeds객체,id,width,height 정보 있음.
    // breeds value의 객체 데이터를 출력하기 위해서
    // data[0].breeds[0]의 temperament, weight, life_span을 상위로 가져옴
    // 같은 breeds_ids 검색 결과로 정보가 같으므로 대표로 [0] 번째만 가져옴
    // 간혹 data가 없는 경우가 있어서 없다면, no data로 출력.
    return response.data.map(item => ({
      ...item,
      temperament: item.breeds[0].temperament || "No data",
      weight: item.breeds[0].weight.metric || "No data",
      lifeSpan: item.breeds[0].life_span || "No data",
    }));
  }
}

export default PetAPI;
