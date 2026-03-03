import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Carrega JWT_SECRET (e outras variáveis) do .env
dotenv.config();

function extrairTokenDoCookie(cookieHeader, nomeCookie) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [nome, ...valor] = cookie.split("=");
    if (nome && nome.trim() === nomeCookie) {
      return decodeURIComponent(valor.join("=").trim());
    }
  }

  return null;
}

// Middleware de autenticação.
// Ele roda ANTES do controller e decide se a requisição pode seguir.
//
// Como o token chega:
// - Header: Authorization: Bearer <token>
// - Ex.: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
export function autenticarToken(req, res, next) {
  const nomeCookie = process.env.AUTH_COOKIE_NAME || "auth_token";

  // Pega o header "authorization" (pode vir em minúsculo).
  const authHeader = req.headers["authorization"];

  // Se existir, separa por espaço e pega a segunda parte.
  // "Bearer <token>" -> token fica no índice 1.
  // Normal mente o token é retornado assim: Bearer ejyasdwmwmrksdadnasd
  const tokenBearer = authHeader && authHeader.split(" ")[1];
  const tokenCookie = extrairTokenDoCookie(req.headers.cookie, nomeCookie);
  const token = tokenBearer || tokenCookie;

  // Se não há token, a pessoa não está autenticada.
  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    // Valida o token e recupera o payload.
    // Se estiver expirado ou assinado com segredo diferente, vai cair no catch.
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    // Disponibiliza o usuário para os próximos handlers.
    // Assim o controller consegue acessar req.usuario.id, req.usuario.email, etc. 
    req.usuario = usuario;

    // next() faz o Express continuar para o próximo middleware/rota/controller.
    return next();
  } catch (erro) {
    // 403 = entendi a requisição, mas não autorizo.
    // Aqui o token existe, mas é inválido/expirou.
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}