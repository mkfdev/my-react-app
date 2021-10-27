import React, { useState } from "react";
import "./AddPetForm.scss";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Radio, Select } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";
import moment from "moment";
import "antd/dist/antd.css";

const AddPetForm = ({ InputFile, createAndUpdatePet, onClickCancel }) => {
  const [file, setFile] = useState({ fileName: null, fileURL: null });
  //react-hook-form 사용
  //control 외부 라이브러리 제어
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    const pet = {
      id: Date.now(),
      name: data.name,
      breed: data.breed,
      weight: data.weight,
      gender: data.gender,
      size: data.size,
      shotDate: data.shotDate,
      birthDate: data.birthDate,
      imgURL: file.fileURL || "",
      imgName: file.fileName || "",
    };

    //부모컴포넌트로 pet정보 보내기
    createAndUpdatePet(pet);
  };

  //DatePicker 출력 dateFormat
  const dateFormat = "YYYY-MM-DD";

  //DatePicker disabledDate 설정
  function disabledDate(current) {
    return current && current > moment().startOf("day");
  }
  //Select Option
  const { Option } = Select;

  const onFileChange = file => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };
  return (
    <section className="petForm">
      <h2>Give us the basics about your pop.</h2>
      <div className="petForm-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li>
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="pet's name"
                {...register("name", {
                  required: true,
                  maxLength: 10,
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <p>name 입력해주세요.</p>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <p>최대 10자까지만 입력 가능합니다.</p>
              )}
            </li>
            <li>
              <label className="label" htmlFor="breed">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                placeholder="pet's breed"
                {...register("breed", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors.breed && errors.breed.type === "required" && (
                <p>견종을 입력해주세요.</p>
              )}
              {errors.breed && errors.breed.type === "maxLength" && (
                <p>최대 20자까지만 입력 가능합니다.</p>
              )}
            </li>
            <li>
              <label className="label" htmlFor="weight">
                Weight
              </label>
              <span className="inp-unit">
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  className="inp-weight"
                  placeholder="pet's weight"
                  {...register("weight", {
                    required: true,
                    pattern: /^[^0](\d{1,2})?$/,
                  })}
                />
              </span>
              {errors.weight && errors.weight.type === "required" && (
                <p>강아지의 몸무게를 입력해주세요</p>
              )}
              {errors.weight && errors.weight.type === "pattern" && (
                <p>숫자 세 자리까지 입력가능합니다.</p>
              )}
            </li>
            <li>
              <label className="label" htmlFor="size">
                Size
              </label>
              <Controller
                control={control}
                id="size"
                name="size"
                render={({ field }) => (
                  <Select {...field} defaultValue="소형견/중형견/대형견">
                    <Option value="소">소형견(10kg미만)</Option>
                    <Option value="중">중형견(10kg~25kg미만)</Option>
                    <Option value="대">대형견(25kg이상)</Option>
                  </Select>
                )}
                rules={{ required: true }}
              />
              {errors.size && <p>사이즈를 선택해주세요.</p>}
            </li>
            <li>
              <div className="inp-datepicker">
                <label className="label" htmlFor="birth">
                  Birthday
                </label>
                <Controller
                  control={control}
                  name="birthDate"
                  format={dateFormat}
                  // render를 사용해서, field값을 복사하거나 꺼내 쓰면 된다.
                  // field안에는 value나 onBlur와 같은 함수도 있음
                  // render안의 onChange를 조작해, onChange안에 들어갈 값을
                  // 선택할 수 있다.
                  render={({ field: { onChange } }) => (
                    // antd의 datepicker에서 e.target.value는
                    // moment 객체 그대로를 반환하기에,
                    // "2021-04-15"와 같은 값을 얻고싶다면, 두번째 파라미터
                    // "dateString"을 추가해서 값을 넣어야 한다.
                    <DatePicker
                      locale={locale}
                      onChange={(value, dateString) => {
                        onChange(dateString);
                      }}
                      format={dateFormat}
                      disabledDate={disabledDate}
                    />
                  )}
                  rules={{ required: true }}
                />
              </div>
              {errors.birthDate && <p>태어난 날을 선택해주세요.</p>}
            </li>
            <li>
              <div className="inp-datepicker">
                <label className="label" htmlFor="shot">
                  광견병 주사 접종일
                </label>
                <Controller
                  control={control}
                  name="shotDate"
                  format={dateFormat}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      locale={locale}
                      onChange={(value, dateString) => {
                        onChange(dateString);
                      }}
                      format={dateFormat}
                      disabledDate={disabledDate}
                    />
                  )}
                  rules={{ required: true }}
                />
              </div>
              {errors.shotDate && <p>마지막 접종 날짜를 선택해주세요.</p>}
            </li>
            <li>
              <label className="label" htmlFor="gender">
                Gender
              </label>
              <Controller
                control={control}
                id="gender"
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <Radio.Group
                    value={value}
                    onChange={e => onChange(e.target.value)}
                  >
                    <Radio value={"female"}>Female</Radio>
                    <Radio value={"male"}>Male</Radio>
                  </Radio.Group>
                )}
                rules={{ required: true }}
              />
              {errors.gender && <p>성별을 선택해주세요.</p>}
            </li>
            <li>
              <span className="label">펫 이미지 업로드</span>
              <InputFile name={file.fileName} onFileChange={onFileChange} />
            </li>
          </ul>
          <div className="btn-wrap">
            <button type="submit" className="btn">
              등록
            </button>
            <button type="submit" className="btn" onClick={onClickCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPetForm;
