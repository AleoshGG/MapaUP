import graph from "./dependences.mjs";

let i = 1;

//Obtengo mis elementos del HTML
let btnAddNode = document.getElementById("addNode");
let btnAddEdge = document.getElementById("addEdge");
let btnStartR = document.getElementById("startR");
let btnReloadR = document.getElementById("reloadR");

//TODO para agregar nodos al grafo
btnAddNode.addEventListener("click", () => {
  let lugar = document.getElementById("nombreLugar").value;

  if (lugar == "" || lugar == " ") {
    let alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    appendAlert("Datos Incorrectos", "success", alertPlaceholder);
  } else {
    if (graph.addV(lugar)) {
      alert("¡Éxito en la operación!");
      crearSelect(lugar, "edgeOne");
      crearSelect(lugar, "edgeTwo");
      crearSelect(lugar, "edgeThree");
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
    alert("¡Éxito en la operación!");
  } else {
    let alertPlaceholder = document.getElementById("liveAlertPlace");
    appendAlert("Datos Incorrectos", "success", alertPlaceholder);
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
    let alertPlaceholder = document.getElementById("liveAlert");
    appendAlert("Elija un lugar", "success", alertPlaceholder);
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

//Alerta
const appendAlert = (message, type, alertPlaceholder) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};
