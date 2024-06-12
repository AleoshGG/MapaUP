import graph from "./dependences.mjs";

let btnAdd = document.getElementById("agregarNode");

let imprimir = (val) => {
  console.log(val);
};

btnAdd.addEventListener("click", () => {
  let lugar = document.getElementById("nombreLugar").value;
  let lugar2 = "B";
  graph.addV(lugar);

  console.log(graph.addV(lugar2));

  console.log(graph.addConexion(lugar, lugar2, 5));
  graph.bfs(imprimir);
  
});
