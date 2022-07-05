import firebase from "../firebase";

class AuthService {
  isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = false;
  }

  async login(email: string, password: string) {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (response.user) {
      this.isAuthenticated = true;
    }
  }
}

export default new AuthService();
