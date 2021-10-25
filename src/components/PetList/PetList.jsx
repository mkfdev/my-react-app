import React from "react";
import "./PetList.scss";
import { FaRegBell, FaGratipay } from "react-icons/fa";

const PetList = ({ pet }) => {
  const DEFAULT = "/assets/pet.jpg";
  const { name, breed, gender, weight, birthDate, shotDate, imgURL } = pet;
  const img_url = imgURL || DEFAULT;

  return (
    <li>
      <div className="card-box">
        <div className="thumbnail-wrap">
          <div className="center">
            <img src={img_url} alt="example" />
          </div>
        </div>
        <div className="details-wrap">
          <div className="info-box">
            <p>
              <FaGratipay size="18" />
              {name}는 강아지 나이로 30살 입니다.
            </p>
            <p>
              <FaRegBell size="18" />
              {name}의 다음 접종일이 20일 남았습니다.
            </p>
          </div>
          <p>이름: {name}</p>
          <p>견종: {breed}</p>
          <p>성별: {gender}</p>
          <p>몸무게: {weight}kg</p>
          <p>태어난날: {birthDate}</p>
          <p>마지막 접종일: {shotDate}</p>
        </div>
      </div>
    </li>
  );
};

export default PetList;
