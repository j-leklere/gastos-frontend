import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api/public"
    : "http://localhost:8080/api/public";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

type AuthMode = "register" | "login";

export type LoginPayload = { username: string; password: string };
export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

type AnyAuthResponse = {
  token?: string;
  idToken?: string;
  accessToken?: string;
  [k: string]: unknown;
};

async function authenticate(
  mode: "login",
  payload: LoginPayload
): Promise<string>;

async function authenticate(
  mode: "register",
  payload: RegisterPayload
): Promise<string>;

async function authenticate(
  mode: AuthMode,
  payload: LoginPayload | RegisterPayload
): Promise<string> {
  const path = mode === "login" ? "/login" : "/register";
  const { data } = await api.post<AnyAuthResponse>(path, payload);
  const token =
    data.token ?? data.idToken ?? (data.accessToken as string | undefined);
  if (!token) throw new Error("No se encontró el token en la respuesta");
  return token;
}

export function createUser(username: string, email: string, password: string) {
  return authenticate("register", { username, email, password });
}

export function login(username: string, password: string) {
  return authenticate("login", { username, password });
}
