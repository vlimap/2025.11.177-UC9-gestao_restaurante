import { atualizarStatusAutenticacao } from "../components/auth-status.component.js";
import { mostrarResultado } from "../components/output.component.js";
import { buscarPerfil, login, logout } from "../services/auth.service.js";
import { listarCardapio, listarMesas, listarUsuarios } from "../services/restaurante.service.js";

async function restaurarSessao() {
  try {
    const perfil = await buscarPerfil();
    atualizarStatusAutenticacao(true);
    mostrarResultado({ mensagem: "Sessão restaurada.", perfil });
  } catch {
    atualizarStatusAutenticacao(false);
    mostrarResultado({ mensagem: "Faça login para continuar." });
  }
}

function configurarLogin() {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await login(emailInput.value, senhaInput.value);
      atualizarStatusAutenticacao(true);
      mostrarResultado(data);
    } catch (error) {
      atualizarStatusAutenticacao(false);
      mostrarResultado({ erro: error.message });
    }
  });
}

function configurarBotoesConsulta() {
  document.getElementById("btn-perfil").addEventListener("click", async () => {
    try {
      const data = await buscarPerfil();
      mostrarResultado(data);
    } catch (error) {
      mostrarResultado({ erro: error.message });
    }
  });

  document.getElementById("btn-usuarios").addEventListener("click", async () => {
    try {
      const data = await listarUsuarios();
      mostrarResultado(data);
    } catch (error) {
      mostrarResultado({ erro: error.message });
    }
  });

  document.getElementById("btn-mesas").addEventListener("click", async () => {
    try {
      const data = await listarMesas();
      mostrarResultado(data);
    } catch (error) {
      mostrarResultado({ erro: error.message });
    }
  });

  document.getElementById("btn-cardapio").addEventListener("click", async () => {
    try {
      const data = await listarCardapio();
      mostrarResultado(data);
    } catch (error) {
      mostrarResultado({ erro: error.message });
    }
  });

  document.getElementById("btn-sair").addEventListener("click", async () => {
    try {
      const data = await logout();
      atualizarStatusAutenticacao(false);
      mostrarResultado(data);
    } catch (error) {
      mostrarResultado({ erro: error.message });
    }
  });
}

export function iniciarPaginaInicial() {
  configurarLogin();
  configurarBotoesConsulta();
  restaurarSessao();
}
