import React, { useCallback, useEffect, useRef, useState } from "react";
import PetAPI from "../../service/pet_api";
import PetDataList from "../PetDataList/PetDataList";
import PetHeader from "../PetHeader/PetHeader";
import "./PetSearch.scss";

const petAPI = new PetAPI();

const PetSearch = ({ authService }) => {
  //pet data
  const [petData, setPetData] = useState([]);
  //select option data
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  //selected data id
  const [selectedId, setSelectedId] = useState(null);

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
  const getDataSelectedBreeds = async () => {
    const selectedBreeds = selectRef.current.value;
    setSelectedId(selectedBreeds);
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
    //랜덤 이미지 로드
    loadPetimages();
    //셀렉트 옵션값 breeds api 로드
    loadBreeds();
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
        <button
          type="button"
          className="btn-search"
          onClick={getDataSelectedBreeds}
        >
          검색
        </button>
        <span className="sub-text">*검색결과 최대 10개 노출</span>
      </div>
      <div className="pet-wrapper">
        <div className="pet-search-result">
          <h2 className="title">반려동물 사진&amp;동영상 리스트</h2>
          {loading && (
            <div className="loading">
              <span className="loader">loading...</span>
            </div>
          )}
          {/* 선택된 pet에 대한 정보 - 한번만 출력하기 */}

          {!loading && (
            <div className="pet-search-list">
              {selectedId && (
                <PetDataList selectedId={selectedId} petAPI={petAPI} />
              )}
              <ul>
                {petData &&
                  petData.map(item => (
                    <li key={item.id}>
                      <img src={item.url} alt="" />
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
