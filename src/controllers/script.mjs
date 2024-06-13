import graph from "./dependences.mjs";

let btnAdd = document.getElementById("agregarNode");

let imprimir = (val) => {
  console.log(val);
};

btnAdd.addEventListener("click", () => {
  let lugar = document.getElementById("nombreLugar").value;
  let lugar2 = "B";
  graph.addV(lugar);
  graph.addV(lugar2);
  graph.addV("C");
  graph.addV("D");
  graph.addV("F");
  

  graph.addConexion(lugar, lugar2, 5);
  graph.addConexion(lugar2, "D", 5);
  graph.addConexion(lugar2, "F", 5);
  graph.addConexion(lugar, "C", 5);

  graph.dfs("A", imprimir);
  
});
