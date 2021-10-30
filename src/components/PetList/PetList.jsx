import React, { useEffect, useState } from "react";
import moment from "moment";
import "./PetList.scss";
import { FaRegBell, FaGratipay } from "react-icons/fa";

const PetList = ({ pet }) => {
  const DEFAULT = "/images/pet.jpg";
  const { name, breed, gender, size, weight, birthDate, shotDate, imgURL } =
    pet;
  const img_url = imgURL || DEFAULT;
  const [age, setAge] = useState(null);
  const [personAge, setPersonAge] = useState(null);
  const [term, setTerm] = useState(null);

  const today = new Date();

  const calcPetAge = () => {
    //소형견 나이 환산 배열
    const ageS = [
      15, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
    ];
    //중형견 나이 환산 배열
    const ageM = [
      15, 24, 28, 32, 36, 42, 47, 51, 56, 60, 65, 69, 74, 78, 83, 87,
    ];
    //대형견 나이 환산 배열
    const ageL = [
      15, 24, 28, 32, 36, 45, 50, 55, 61, 66, 72, 77, 82, 88, 93, 120,
    ];

    //현재 년도에서 출생년도 뺀 값
    let age = today.getFullYear() - birthDate.substr(0, 4);
    //배열 0부터 시작, 음수값은 0으로 처리
    let ageIndex = age - 1 < 0 ? 0 : age - 1;

    //사람 나이
    setPersonAge(age + 1);
    //입력받은 size(소,중,대) 따라서 강아지 나이 환산법이 달라짐
    //ageS, ageM, ageL 최대 16년까지만 나이 환산이 가능
    //ageS.length = 16 보다 크거나 같으면 배열 마지막 숫자(80, 87, 120)으로 지정
    switch (size) {
      case "소":
        ageIndex = ageIndex >= ageS.length ? ageS.length - 1 : ageIndex;
        setAge(ageS[ageIndex]);
        break;
      case "중":
        ageIndex = ageIndex >= ageM.length ? ageM.length - 1 : ageIndex;
        setAge(ageM[ageIndex]);
        break;
      case "대":
        ageIndex = ageIndex >= ageL.length ? ageL.length - 1 : ageIndex;
        setAge(ageL(ageIndex));
        break;
      default:
        alert("pet정보에 size가 제대로 입력되지 않았습니다.");
    }
  };

  const calcShotDate = () => {
    //오늘과 shotDate 비교, 오늘로부터 몇 일이 경과했는지 계산
    //Math.abs 절대값 반환
    const updated = Math.abs(
      moment(shotDate, "YYYY-MM-DD").diff(today, "days"),
    );
    setTerm(updated);
  };

  useEffect(() => {
    //강아지 나이 계산기
    calcPetAge();
    //주사 접종 경과일 계산
    calcShotDate();
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
              <FaGratipay className="info-icon" size="18" />
              <span className="info-text">
                {name}는 사람 나이 {personAge}살, 강아지 나이 {age}살 입니다.
              </span>
            </p>
            <p>
              <FaRegBell className="info-icon" size="18" />
              <span className="info-text">
                {name}가 광견병 주사를 접종한지 {term}일이 지났습니다.
              </span>
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
