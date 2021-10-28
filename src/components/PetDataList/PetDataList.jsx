import React, { useEffect, useState } from "react";
import { BiInfoSquare } from "react-icons/bi";
import { VscCircleOutline } from "react-icons/vsc";

const PetDataList = ({ selectedId, petAPI }) => {
  const [updateData, setUpdateData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMadeDataList = async () => {
    setLoading(true);
    try {
      const res = await petAPI.searchImageAndData(selectedId);
      setUpdateData(res);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (selectedId) {
      getMadeDataList();
    }
  }, [selectedId]);

  return (
    <div className="pet-search-info">
      <h3>
        <BiInfoSquare />
        정보
      </h3>
      {loading && (
        <div>
          <span className="loader">loading...</span>
        </div>
      )}
      {updateData.length > 0 && (
        <div>
          <p className="pet-data">
            <VscCircleOutline />
            성격: {updateData[0].temperament}
          </p>
          <p className="pet-data">
            <VscCircleOutline />
            몸무게: {updateData[0].weight}kg
          </p>
          <p className="pet-data">
            <VscCircleOutline />
            수명: {updateData[0].lifeSpan}
          </p>
        </div>
      )}
    </div>
  );
};

export default PetDataList;
