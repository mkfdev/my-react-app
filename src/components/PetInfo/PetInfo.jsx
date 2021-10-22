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
import PetList from "../PetList/PetList";

const PetInfo = () => {
  // const [userName, setUserName] = useState(null);
  const [petForm, setPetForm] = useState(false);
  const [pets, setPets] = useState([
    {
      id: Date.now(),
      name: "ari",
      breed: "믹스견",
      weight: "5",
      gender: "female",
      size: "s",
      birth: "2017-01-05",
      shot: "2021-10-01",
      imgURL: "/assets/pet.jpg",
    },
  ]);

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

              {pets.length ? (
                <div className="pet-update">
                  {pets.map(pet => (
                    <PetList pet={pet} key={pet.id} />
                  ))}
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
            <AddPetForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
