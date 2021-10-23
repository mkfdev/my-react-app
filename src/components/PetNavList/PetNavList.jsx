import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";

const PetNavList = ({ handleForm, removePet, pet }) => {
  const onHandleForm = e => {
    handleForm(e.currentTarget.className);
  };

  const handleDelete = () => {
    removePet(pet);
  };

  return (
    <li>
      <div className="pet-panel">
        <span className="pet-img"></span>
        <span className="pet-name">{pet.name}</span>
        <button className="btn-edit" onClick={onHandleForm}>
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
