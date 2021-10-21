/* eslint-disable no-unused-vars */
import React from "react";
import { authService } from "../../firebase";
import { signOut } from "firebase/auth";

const PetInfo = () => {
  // const [userName, setUserName] = useState(null);

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
    <div>
      <h3>안녕하세요</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PetInfo;
