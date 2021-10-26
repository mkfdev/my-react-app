import React, { useEffect, useState } from "react";
import "./PetList.scss";
import { FaRegBell, FaGratipay } from "react-icons/fa";

const PetList = ({ pet }) => {
  const DEFAULT = "/assets/pet.jpg";
  const { name, breed, gender, size, weight, birthDate, shotDate, imgURL } =
    pet;
  const img_url = imgURL || DEFAULT;
  const [age, setAge] = useState(null);
  const [personAge, setPersonAge] = useState(null);

  const today = new Date();

  const calculateAge = () => {
    const ageL = [
      15, 24, 28, 32, 36, 45, 50, 55, 61, 66, 72, 77, 82, 88, 93, 120,
    ];
    const ageM = [
      15, 24, 28, 32, 36, 42, 47, 51, 56, 60, 65, 69, 74, 78, 83, 87,
    ];
    const ageS = [
      15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
    ];
    //현재 년도에서 출생년도 뺀 값
    let age = today.getFullYear() - birthDate.substr(0, 4);
    let ageIndex = age - 1 < 0 ? 0 : age;
    //사람 나이
    setPersonAge(age + 1);
    //입력받은 size(소,중,대) 따라서 강아지 나이 환산법이 달라짐
    switch (size) {
      case "소":
        setAge(ageS[ageIndex]);
        break;
      case "중":
        setAge(ageM[ageIndex]);
        break;
      case "대":
        setAge(ageL(ageIndex));
        break;
      default:
        alert("pet정보에 size가 제대로 입력되지 않았습니다.");
    }
  };

  useEffect(() => {
    //강아지 나이 계산기
    calculateAge();
  });

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
              {name}는 사람 나이 {personAge}살, 강아지 나이 {age}살 입니다.
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
