const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function tratarResposta(resposta) {
  const corpo = await resposta.json().catch(() => ({}));

  if (resposta.ok) {
    return corpo;
  }

  const mensagemErro = corpo.msg || corpo.erro || corpo.mensagem || "Erro na requisição";
  throw new Error(mensagemErro);
}

export async function get(rota) {
  const resposta = await fetch(`${API_BASE}${rota}`, {
    method: "GET",
    credentials: "include"
  });

  return tratarResposta(resposta);
}

export async function post(rota, payload = {}) {
  const resposta = await fetch(`${API_BASE}${rota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(payload)
  });

  return tratarResposta(resposta);
}
