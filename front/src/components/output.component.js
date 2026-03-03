export function mostrarResultado(dados) {
  const output = document.getElementById("output");
  output.textContent = JSON.stringify(dados, null, 2);
}
