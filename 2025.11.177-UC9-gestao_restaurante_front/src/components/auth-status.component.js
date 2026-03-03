export function atualizarStatusAutenticacao(autenticado) {
  const authStatus = document.getElementById("auth-status");
  authStatus.textContent = autenticado
    ? "Autenticado via cookie de sessão."
    : "Sem autenticação.";
}
