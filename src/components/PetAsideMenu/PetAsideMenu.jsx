import React from "react";
import { MdAddCircle } from "react-icons/md";
import "./PetAsideMenu.scss";
import PetNavList from "../PetNavList/PetNavList";

const PetAsideMenu = ({ changeFormRole, removePet, pets }) => {
  const handleForm = e => {
    // Add 버튼 클릭시, "btn-add" 전달하여
    // PetInfo 컴포넌트에서 Add Form 오픈
    // changeFormRole(e.currentTarget.className);
    changeFormRole(e.currentTarget.className.substr(4), null);
  };

  return (
    <aside className="pet-asideMenu">
      <p className="text">
        마이펫을 등록해보세요!<span>(최대 6마리 등록 가능)</span>
      </p>

      {/* 펫 정보가 추가되면 MENU에도 펫 패널 추가 */}
      <div className="pet-nav-list">
        <ul>
          {Object.keys(pets).map(key => (
            <PetNavList
              key={key}
              pet={pets[key]}
              handleEdit={changeFormRole}
              removePet={removePet}
            />
          ))}
          {/* 생성된 펫 정보가 5개이상이면 BUTTON 숨김 */}
          {Object.keys(pets).length < 6 && (
            <li>
              <button className="btn-add" onClick={handleForm}>
                <MdAddCircle size="64" />
              </button>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default PetAsideMenu;
