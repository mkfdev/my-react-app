/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { authService } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./PetInfo.scss";
import { FcIdea } from "react-icons/fc";
import { IoArrowForwardCircle } from "react-icons/io5";
import AddPetForm from "../AddPetForm/AddPetForm";
import PetHeader from "../PetHeader/PetHeader";
import PetAsideMenu from "../PetAsideMenu/PetAsideMenu";
// import PetList from "../PetList/PetList";
import { FaRegBell, FaGratipay } from "react-icons/fa";

const PetInfo = () => {
  // const [userName, setUserName] = useState(null);
  const [petForm, setPetForm] = useState(false);
  const [pets, setPets] = useState({});

  const createPet = pet => {
    setPets(pets => {
      const updated = { ...pets };
      updated[pet.id] = pet;
      return updated;
    });

    setPetForm(false);
  };
  const logout = () => {
    signOut(authService);
  };

  const handleAddForm = value => {
    setPetForm(value);
  };
  //firebase에서 현재 로그인한 사용자 name 가져오기
  // useEffect(() => {
  //   onAuthStateChanged(authService, user => {
  //     if (user) {
  //       setUserName(user.displayName);
  //     }
  //   });
  //   return () => {
  //     setUserName(null);
  //   };
  // }, []);

  return (
    <div className="pet">
      <PetHeader logout={logout} pets={pets} />

      <div className="pet-wrapper">
        <PetAsideMenu handleAddForm={handleAddForm} pets={pets} />

        <div className="pet-info">
          {!petForm ? (
            <section className="pet-contents">
              <p className="title">
                안녕하세요, <br />
                다양한 반려견 사진들을 구경해보세요!
                <Link to="search" className="link">
                  구경하러 가기 <IoArrowForwardCircle size="20" />
                </Link>
              </p>

              {/* 객체의 길이 체크 - length오류 */}
              {Object.keys(pets).length ? (
                <div className="pet-card-list">
                  <ul>
                    {Object.keys(pets).map(key => (
                      <li key={key}>
                        <div className="card-box">
                          <div className="thumbnail-wrap">
                            <div className="center">
                              <img
                                src={process.env.PUBLIC_URL + "/assets/pet.jpg"}
                                alt="example"
                              />
                            </div>
                          </div>
                          <div className="details-wrap">
                            <div className="info-box">
                              <p>
                                <FaGratipay size="18" />
                                {pets[key].name}는 강아지 나이로 30살 입니다.
                              </p>
                              <p>
                                <FaRegBell size="18" />
                                {pets[key].name}의 다음 접종일이 20일
                                남았습니다.
                              </p>
                            </div>
                            <p>이름: {pets[key].name}</p>
                            <p>견종: {pets[key].breed}</p>
                            <p>성별: {pets[key].gender}</p>
                            <p>몸무게: {pets[key].weight}kg</p>
                            <p>태어난날: {pets[key].birthDate}</p>
                            <p>마지막 접종일: {pets[key].shotDate}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="pet-empty">
                  <FcIdea size="50" />
                  <p className="text">
                    아직 등록된 반려견 정보가 없습니다. <br />
                    나의 반려견 정보를 왼쪽 등록 메뉴에서 등록해주세요.
                  </p>
                </div>
              )}
            </section>
          ) : (
            <AddPetForm createPet={createPet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
