/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { FcIdea } from "react-icons/fc";
import PetHeader from "../PetHeader/PetHeader";
import AddPetForm from "../AddPetForm/AddPetForm";
import EditPetForm from "../EditPetForm/EditPetForm";
import PetAsideMenu from "../PetAsideMenu/PetAsideMenu";
import PetList from "../PetList/PetList";
import { IoIosPaw } from "react-icons/io";
import "./PetInfo.scss";

const PetInfo = ({ InputFile, authService, petRepository }) => {
  const history = useHistory();
  const historyState = history.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [pets, setPets] = useState({});
  const [petForm, setPetForm] = useState(false);
  const [role, setRole] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  const changeFormRole = (role, selected) => {
    //Form이 true이고 role이 'add' 이면 AddPetForm 컴포넌트 오픈
    //Form이 true이고 role이 'edit' 이면 EditPetForm 컴포넌트 오픈
    setRole(role);
    setSelectedPet(selected);
    setPetForm(true);
  };

  //함수 변경없음. 재사용(캐시x)
  const goOutWriteForm = useCallback(() => {
    setPetForm(false);
  }, []);

  const createAndUpdatePet = useCallback(
    pet => {
      setPets(pets => {
        const updated = { ...pets };
        updated[pet.id] = pet;
        return updated;
      });

      petRepository.savePet(userId, pet);
      setPetForm(false);
    },
    [petRepository, userId],
  );

  const removePet = useCallback(
    pet => {
      setPets(pets => {
        const updated = { ...pets };
        delete updated[pet.id];
        return updated;
      });
      petRepository.removePet(userId, pet);
      setPetForm(false);
    },
    [petRepository, userId],
  );

  //함수 재사용, authService가 변경되면 다시 만들어지도록
  const logout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    //auth 상태 지켜보기
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/login");
      }
    });
  }, [authService, history, userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const updateSync = petRepository.syncPets(userId, pets => {
      setPets(pets);
    });
    //component unmout
    return () => updateSync();
  }, [userId, petRepository]);

  return (
    <div className="pet">
      <PetHeader logout={logout} handleHomeMenu={goOutWriteForm} />

      <div className="pet-wrapper">
        <PetAsideMenu
          changeFormRole={changeFormRole}
          removePet={removePet}
          pets={pets}
        />

        <div className="pet-info">
          {/* Empty View or Form(add or Edit) */}
          {!petForm ? (
            <section className="pet-contents">
              <h2 className="title">
                <IoIosPaw />
                등록된 펫 정보
              </h2>
              {/* 객체의 길이 체크 - length오류 */}
              {Object.keys(pets).length ? (
                <div className="pet-card-list">
                  <ul>
                    {Object.keys(pets).map(key => (
                      // Pet 등록 정보 보여줌
                      <PetList pet={pets[key]} key={key} />
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="pet-empty">
                  <FcIdea size="50" />
                  <p className="text">
                    아직 등록된 반려견 정보가 없습니다. <br />
                    나의 반려견 정보를 왼쪽 메뉴에서 등록해주세요.
                  </p>
                </div>
              )}
            </section>
          ) : role === "add" ? (
            <AddPetForm
              InputFile={InputFile}
              createAndUpdatePet={createAndUpdatePet}
              onClickCancel={goOutWriteForm}
            />
          ) : (
            <EditPetForm
              InputFile={InputFile}
              createAndUpdatePet={createAndUpdatePet}
              onClickCancel={goOutWriteForm}
              pet={selectedPet}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
