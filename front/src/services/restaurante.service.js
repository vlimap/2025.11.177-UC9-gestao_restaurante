import { get } from "./api.service.js";

export function listarUsuarios() {
  return get("/usuarios");
}

export function listarMesas() {
  return get("/mesas");
}

export function listarCardapio() {
  return get("/cardapio");
}
