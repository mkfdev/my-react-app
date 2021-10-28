import React, { useCallback, useEffect, useRef, useState } from "react";
import PetAPI from "../../service/pet_api";
import PetHeader from "../PetHeader/PetHeader";
import "./PetSearch.scss";

const petAPI = new PetAPI();

const PetSearch = ({ authService }) => {
  const [petData, setPetData] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectRef = useRef();

  const loadPetimages = async () => {
    setLoading(true);
    try {
      const res = await petAPI.getImages();
      setPetData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
  const onSelectBreeds = async () => {
    const selectedBreeds = selectRef.current.value;
    setLoading(true);
    try {
      const res = await petAPI.searchImage(selectedBreeds);
      setPetData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (petData.length === 0) {
      //랜덤 이미지 로드
      loadPetimages();
      //셀렉트 옵션값 breeds api 로드
      loadBreeds();
    }
  }, []);

  //함수 재사용, authService가 변경되면 다시 만들어지도록
  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

  return (
    <div className="pet pet-search">
      <PetHeader logout={logout} />
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
          <h2 className="title">
            펫 사진 리스트{" "}
            <span className="sub-text">*검색결과 최대 10개 노출</span>
          </h2>
          {loading && (
            <div className="loading">
              <span className="loader">loading...</span>
            </div>
          )}
          {!loading && (
            <div className="pet-search-list">
              <ul>
                {petData &&
                  petData.map(item => (
                    <li key={item.id}>
                      <span>
                        <img src={item.url} alt="" />
                      </span>
                      <div>
                        <span>{item.temperament}</span>
                        {/* <span>{item.weight}kgs</span> */}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetSearch;
