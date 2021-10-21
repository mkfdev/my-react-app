/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { authService } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./PetInfo.scss";
import { MdLogout, MdAddCircle } from "react-icons/md";
import { FcIdea } from "react-icons/fc";
import { IoArrowForwardCircle } from "react-icons/io5";

const PetInfo = () => {
  // const [userName, setUserName] = useState(null);
  const [myPet, setMyPet] = useState([]);

  const handleLogout = () => {
    signOut(authService);
  };

  //firebase에서 현재 로그인한 사용자 name 가져오기
  // useEffect(() => {
  //   onAuthStateChanged(authService, user => {
  //     if (user) {
  //       setUserName(user.displayName);
  //     }
  //   });
  //   return () => {
  //     setUserName(null);
  //   };
  // }, []);

  return (
    <div className="pet">
      <header className="pet-header">
        <h1>[Logo] Pet App Name</h1>
        <nav className="pet-menu">
          <Link to="/petInfo" className="link">
            Home
          </Link>
          <Link to="/search" className="link">
            Search
          </Link>
        </nav>
        <button className="btn-logout" onClick={handleLogout}>
          <MdLogout size="20" />
          <span>Logout</span>
        </button>
      </header>

      <section className="pet-wrapper">
        <aside className="pet-asideMenu">
          <p className="text">
            마이펫을 등록해보세요!<span>(최대 5마리 등록 가능)</span>
          </p>
          <button className="btn-addPet">
            <MdAddCircle size="64" />
          </button>
        </aside>

        <section className="pet-contents">
          <p className="title">
            안녕하세요, <br />
            다양한 반려견 사진들을 구경해보세요!
            <Link to="search" className="link">
              구경하러 가기 <IoArrowForwardCircle size="20" />
            </Link>
          </p>

          {myPet.length ? (
            <div>반려견정보 있음</div>
          ) : (
            <div className="pet-empty">
              <FcIdea size="50" />
              <p className="text">
                아직 등록된 반려견 정보가 없습니다. <br />
                나의 반려견 정보를 왼쪽 등록 메뉴에서 등록해주세요.
              </p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default PetInfo;
