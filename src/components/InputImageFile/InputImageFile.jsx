import React, { useRef } from "react";
import "./InputImageFile.scss";

//onFileChange 다른 파일을 선택했을때
const InputImageFile = ({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();
  const onBtnClick = e => {
    e.preventDefault();
    inputRef.current.click();
  };
  const onChange = async event => {
    //async upload
    // imageUploader.upload(e.target.files[0]).then(console.log);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded);
    //바뀐 파일 정보 전달
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  return (
    <div className="image-uploader">
      <span className="input-title">강아지 이미지 업로드</span>
      <input
        ref={inputRef}
        className="input-image"
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button className="btn-image" onClick={onBtnClick}>
        {name || "No File"}
      </button>
    </div>
  );
};

export default InputImageFile;
