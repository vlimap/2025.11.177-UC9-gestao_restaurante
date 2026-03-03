import { get, post } from "./api.service.js";

export function login(email, senha) {
  return post("/usuarios/login", { email, senha });
}

export function logout() {
  return post("/usuarios/logout", {});
}

export function buscarPerfil() {
  return get("/usuarios/perfil");
}
