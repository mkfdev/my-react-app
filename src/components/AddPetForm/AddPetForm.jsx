import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPetForm.scss";

const AddPetForm = () => {
  const genders = ["female", "male"];
  const size = [
    { option: "소형견(10kg미만)", type: "s" },
    { option: "중형견(10kg~25kg미만)", type: "m" },
    { option: "대형견(25kg이상)", type: "l" },
  ];
  const [birthDate, setBirthDate] = useState(new Date());
  const [shotDate, setShotDate] = useState(new Date());

  return (
    <section className="petForm">
      <h2>Give us the basics about your pop.</h2>
      <div className="petForm-wrapper">
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="inp-name"
              placeholder="pet's name"
            />
          </li>
          <li>
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              id="breed"
              name="breed"
              className="inp-breed"
              placeholder="pet's breed"
            />
          </li>
          <li>
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="inp-weight"
              placeholder="pet's weight"
            />
            kg
          </li>
          <li>
            {/* value={} oncahnge={}사용 */}
            <label htmlFor="gender">Gender</label>
            <select id="gender">
              {genders.map(v => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="size">Size</label>
            <select id="size">
              {size.map(item => (
                <option value={item.option} key={item.type}>
                  {item.option}
                </option>
              ))}
            </select>
          </li>
          <li>
            <div className="inp-datepicker">
              <label htmlFor="birth">생일</label>
              <DatePicker
                id="birth"
                selected={birthDate}
                onChange={date => setBirthDate(date)}
              />
            </div>
          </li>
          <li>
            <div className="inp-datepicker">
              <label htmlFor="shot">광견병 주사 접종일</label>
              <DatePicker
                id="shot"
                selected={shotDate}
                onChange={date => setShotDate(date)}
              />
            </div>
          </li>
          <li>
            <input type="file" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AddPetForm;
