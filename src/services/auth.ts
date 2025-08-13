import axios from "axios";

const API_KEY = "AIzaSyAfD3Sq2Cb2ISLJ6sLKuGNu1kRp_TbgjJo";

type AuthMode = "signUp" | "signInWithPassword";

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

async function authenticate(
  mode: AuthMode,
  email: string,
  password: string
): Promise<string> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post<AuthResponse>(url, {
    email,
    password,
    returnSecureToken: true
  });

  return response.data.idToken;
}

export function createUser(email: string, password: string): Promise<string> {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string): Promise<string> {
  return authenticate("signInWithPassword", email, password);
}
