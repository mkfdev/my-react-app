import React, { useEffect, useRef, useState } from "react";
import PetAPI from "../../service/pet_api";
import PetHeader from "../PetHeader/PetHeader";
import "./PetSearch.scss";

const petAPI = new PetAPI();

const PetSearch = () => {
  const [petData, setPetData] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectRef = useRef();

  const loadPetimages = () => {
    setLoading(true);
    try {
      petAPI.getImages().then(data => {
        setPetData(data);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const loadBreeds = () => {
    try {
      petAPI.getBreeds().then(data => {
        setBreeds(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //선택한 breeds 받아서 get 요청보내고 일치하는 data 받아옴
  const onSelectBreeds = () => {
    const selectedBreeds = selectRef.current.value;
    try {
      petAPI.searchImage(selectedBreeds).then(data => setPetData(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //랜덤 이미지 로드
    loadPetimages();
    //셀렉트 옵션값 breeds api 로드
    loadBreeds();
  }, []);

  return (
    <div className="pet pet-search">
      <PetHeader />
      <div className="pet-search-form">
        <label className="search-title" htmlFor="sel-breeds">
          Breeds
        </label>
        <select ref={selectRef} id="sel-breeds">
          {breeds &&
            breeds.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <button type="button" className="btn-search" onClick={onSelectBreeds}>
          검색
        </button>
      </div>
      <div className="pet-wrapper">
        <div className="pet-search-result">
          <h2>펫 사진 리스트</h2>
          {loading && <div className="loading">loading...</div>}
          {/* {petData && <div>{petData}</div>} */}
          <ul>
            {petData &&
              petData.map(item => (
                <li key={item.id}>
                  <img src={item.url} alt="" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PetSearch;
