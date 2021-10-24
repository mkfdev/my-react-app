import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

class AuthService {
  constructor(app) {
    this.firebaseAuth = getAuth();
    this.database = getDatabase(app);
  }

  async createAndUpdateUser(email, password, name) {
    let createdUser = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    );
    //프로필 업데이트
    await updateProfile(createdUser.user, { displayName: name });
    //database에 저장
    set(ref(this.database, `users/${createdUser.user.uid}`), {
      name: createdUser.user.displayName,
    });
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  onAuthChange(onUpdated) {
    this.firebaseAuth.onAuthStateChanged(user => onUpdated(user));
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}

export default AuthService;
