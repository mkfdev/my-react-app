import React from "react";
import { MdAddCircle } from "react-icons/md";
import "./PetAsideMenu.scss";

const PetAsideMenu = ({ handleAddForm, pets }) => {
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
      {pets.length < 5 && (
        <button className="btn-addPet" onClick={openAddForm}>
          <MdAddCircle size="64" />
        </button>
      )}

      {/* 펫 정보가 추가되면 MENU에도 펫 패널 추가 */}
      <div>
        {pets.map(pet => (
          <div>
            <span>{pet.name}</span>
            <button>수정</button>
            <button>삭제</button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default PetAsideMenu;
