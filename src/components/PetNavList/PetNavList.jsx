import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";

const PetNavList = ({ handleEdit, removePet, pet }) => {
  // const onHandleForm = e => {
  //   // Edit 버튼 클릭시, "btn-edit" 전달하여
  //   // PetInfo 컴포넌트에서 Edit Form 오픈
  //   handleForm(e);
  // };

  const handleEditForm = e => {
    // e.preventDefault();
    handleEdit(e.currentTarget.className.substr(4), pet);
  };

  //해당하는 pet 삭제
  const handleDelete = () => {
    removePet(pet);
  };

  return (
    <li>
      <div className="pet-panel">
        <div className="pet-img">
          <span className="center">
            <img src={pet.imgURL} alt="" />
          </span>
        </div>
        <span className="pet-name">{pet.name}</span>
        <button className="btn-edit" onClick={handleEditForm}>
          <BiEdit size="18" />
        </button>
        <button className="btn-remove" onClick={handleDelete}>
          <RiDeleteBinFill size="18" />
        </button>
      </div>
    </li>
  );
};

export default PetNavList;
