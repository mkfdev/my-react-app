import React, { useRef, useState } from "react";
import "./InputImageFile.scss";
import { FiPaperclip } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";

//onFileChange 다른 파일을 선택했을때
const InputImageFile = ({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onBtnClick = e => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async event => {
    setLoading(true);
    //파일 업로드(image_uploader 서비스, upload method)
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    //바뀐 파일 정보 전달
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  const onBtnRemove = e => {
    e.preventDefault();
    onFileChange({
      name: "",
      url: "",
    });
  };

  return (
    <div className="image-uploader">
      <input
        ref={inputRef}
        className="input-image"
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <FiPaperclip />
      <span className="image-name">{name || "No File"}</span>
      <button className="btn-image-remove" onClick={onBtnRemove}>
        <TiDelete size="24" />
      </button>

      {loading && <span className="loader">Loading...</span>}
      {!loading && (
        <button className="btn-image" onClick={onBtnClick}>
          Upload
        </button>
      )}
    </div>
  );
};

export default InputImageFile;
