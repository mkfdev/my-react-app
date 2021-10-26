import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import "./PetNavList.scss";

const PetNavList = ({ handleEdit, removePet, pet }) => {
  const DEFAULT = "/assets/pet.jpg";
  const img_url = pet.imgURL || DEFAULT;
  const handleEditForm = e => {
    e.preventDefault();
    handleEdit(e.currentTarget.className.substr(4), pet);
  };

  //해당하는 pet 삭제
  const handleDelete = e => {
    e.preventDefault();
    removePet(pet);
  };

  return (
    <li>
      <div className="pet-panel">
        <div className="pet-img">
          <span className="center">
            <img src={img_url} alt="" />
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
