import graph from "./dependences.mjs";

let i = 1;
let nombresLugares = [];

//Obtengo mis elementos del HTML
let btnAddNode = document.getElementById("addNode");
let btnAddEdge = document.getElementById("addEdge");
let btnStartR = document.getElementById("startR");
let btnReloadR = document.getElementById("reloadR");
let btnDijkstra = document.getElementById("dijkstra");
let btnReloadD = document.getElementById("reloadD");

//TODO para agregar nodos al grafo
btnAddNode.addEventListener("click", () => {
  let lugar = document.getElementById("nombreLugar").value;

  if (lugar == "" || lugar == " ") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Revise la entrada de datos",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    if (graph.addV(lugar)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Agregado Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      nombresLugares.push(lugar);
      crearSelect(lugar, "edgeOne");
      crearSelect(lugar, "edgeTwo");
      crearSelect(lugar, "edgeThree");
      crearSelect(lugar, "edgeFour");
    }
  }

  document.getElementById("nombreLugar").value = "";
});

//Crea los nodos en el HTML, para que puedan seleccionarce
function crearSelect(lugar, id) {
  let select = document.getElementById(id);

  let option = document.createElement("option");
  option.value = lugar;
  option.text = lugar;

  select.append(option);
}

//TODO para agregar lasa conexiones entre nodos (aristas)
btnAddEdge.addEventListener("click", () => {
  let start = document.getElementById("edgeOne").value;
  let end = document.getElementById("edgeTwo").value;
  let distance = parseInt(document.getElementById("distancia").value);

  if ((start, end != "default" && distance >= 0)) {
    graph.addConexion(start, end, distance);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Elija los lugares",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  document.getElementById("edgeOne").selectedIndex = 0;
  document.getElementById("edgeTwo").selectedIndex = 0;
  document.getElementById("distancia").value = "";
});

//TODO para iniciar un recorrido en profundidad
btnStartR.addEventListener("click", () => {
  let start = document.getElementById("edgeThree").value;

  if (start != "default") {
    graph.dfs(start, agregar);
    graph.getVisit().clear();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Revise la entrada de datos",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  document.getElementById("edgeThree").selectedIndex = 0;
});

//Callback
let agregar = (nombre) => {
  let cuerpoTabla = document.getElementById("cuerpo-tabla");

  let tr = document.createElement("tr");

  let tdNombre = document.createElement("td");
  let tdOrden = document.createElement("td");

  tdNombre.textContent = `${nombre}`;
  tdOrden.textContent = `${i++}`;
  tr.className = "rows";

  tr.appendChild(tdNombre);
  tr.appendChild(tdOrden);
  cuerpoTabla.appendChild(tr);
};

//TODO para reiniciar el recorrido
btnReloadR.addEventListener("click", () => {
  i = 1;
  let cuerpoTabla = document.getElementById("cuerpo-tabla");

  for (let i = 0; i < graph.size(); i++) {
    let rows = document.querySelector(".rows");
    cuerpoTabla.removeChild(rows);
  }
});

//TODO para iniciar Dijkstra
btnDijkstra.addEventListener("click", () => {
  let start = document.getElementById("edgeFour").value;

  if (start != "default"){
    let nodos = graph.dijkstra(start);
  mostrarRutas(nodos);
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Elija un lugar",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

//Imprimir las rutas en el archivo
let mostrarRutas = (nodos) => {
  let cuerpoTabla = document.getElementById("cuerpoTabla");
  let i = 0;
  let j = 0;

  nombresLugares.forEach(() => {
    let tr = document.createElement("tr");
    tr.className = "rows2";

    let nombre = document.createElement("td");
    nombre.textContent = nombresLugares[i];
    i++;
    tr.appendChild(nombre);

    let nodo = document.createElement("td");
    nodo.textContent = nodos[j];
    j++;
    tr.appendChild(nodo);

    cuerpoTabla.appendChild(tr);
  });
};

//TODO para reiniciar el dijkstra
btnReloadD.addEventListener("click", () => {
  i = 1;
  let cuerpoTabla = document.getElementById("cuerpoTabla");

  for (let i = 0; i < graph.size(); i++) {
    let rows = document.querySelector(".rows2");
    cuerpoTabla.removeChild(rows);
  }
});