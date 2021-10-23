import React from "react";
import { MdAddCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import "./PetAsideMenu.scss";

const PetAsideMenu = ({ handleAddForm, removePet, pets }) => {
  // let history = useHistory();
  // const showAddForm = () => {
  //   history.push("/add");
  // };
  const openAddForm = () => {
    handleAddForm(true);
  };

  return (
    <aside className="pet-asideMenu">
      <p className="text">
        마이펫을 등록해보세요!<span>(최대 5마리 등록 가능)</span>
      </p>

      {/* 생성된 펫 정보가 5개이상이면 BUTTON 숨김 */}
      {/* {Object.keys(pets).length < 5 && (
        <button className="btn-addPet" onClick={openAddForm}>
          <MdAddCircle size="64" />
        </button>
      )} */}

      {/* 펫 정보가 추가되면 MENU에도 펫 패널 추가 */}
      <div className="pet-nav-list">
        <ul>
          {Object.keys(pets).map(key => (
            <li key={key}>
              <div className="pet-panel">
                <span className="pet-img"></span>
                <span className="pet-name">{pets[key].name}</span>
                <button className="btn-edit">
                  <BiEdit size="18" />
                </button>
                <button className="btn-remove">
                  <RiDeleteBinFill size="18" />
                </button>
              </div>
            </li>
          ))}
          {Object.keys(pets).length < 5 && (
            <li>
              <button className="btn-addPet" onClick={openAddForm}>
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
