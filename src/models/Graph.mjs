import { LinkedList } from "./linkedList/LinkedLlist.mjs";

export default class Graph {
  #listaAdyacencia = [];
  #matrizAdyacencia = [];
  #map = new Map();
  #visit = new Set();
  #count = 0;

  constructor() {}

  addV(value) {
    this.#listaAdyacencia.push(new LinkedList());
    this.#matrizAdyacencia.push([]);
    this.#map.set(value, this.#listaAdyacencia.length - 1);
    this.#count++;
    return true;
  }

  addConexion(start, end, distance = 1) {
    if (this.#map.has(start) && this.#map.has(end)) {
      this.#listaAdyacencia[this.#map.get(start)].push(end, distance);
      this.#listaAdyacencia[this.#map.get(end)].push(start, distance);

      this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] =
        distance;
      this.#matrizAdyacencia[this.#map.get(end)][this.#map.get(start)] =
        distance;

      return true;
    }
    return false;
  }

  dfs(start, callback) {
    this.#visit.add(start);
    callback(start);

    let list = this.#listaAdyacencia[this.#map.get(start)]; //lista adyacente al nodo

    for (let i = 0; i < list.size(); i++) {
      let v = list.getElementAt(i);
      if (!this.#visit.has(v)) {
        this.#visit.add(v);
        this.dfs(v, callback);
      }
    }
  }

  dijkstra(start) {
    // Declaramos constantes
    const INF = 100000;
    let l = []; // Conjunto de vértices visitados
    let v = []; // Conjunto de vértices
    let lp = []; // Conjunto de vértices no visitados
    let d = []; // Conjunto de distancias
    let dp = []; // Conjunto de distancias temporales

    // Inicializamos sus valores
    for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
      v[i] = i;
      lp[i] = v[i];
      d[i] = INF;
      dp[i] = INF; // Inicializamos dp también a INF
    }

    // Obtenemos el índice del vértice inicial
    let v1 = this.#map.get(start);
    d[v1] = 0; // Distancia del vértice inicial es 0
    dp[v1] = 0; // Distancia temporal del vértice inicial es 0

    while (l.length != v.length) {
      // Encuentra el vértice con la distancia mínima que no ha sido visitado
      let min = INF;
      let minIndex = -1;

      for (let i = 0; i < v.length; i++) {
        if (lp[i] !== null && dp[i] < min) {
          min = dp[i];
          minIndex = i;
        }
      }

      if (minIndex === -1) break; // Todos los vértices accesibles han sido visitados

      l.push(minIndex); // Marca el vértice como visitado
      lp[minIndex] = null; // Elimina el vértice del conjunto de no visitados

      for (let i = 0; i < v.length; i++) {
        if (lp[i] !== null) {
          let alt = dp[minIndex] + this.#matrizAdyacencia[minIndex][i];
          if (alt < dp[i]) {
            dp[i] = alt;
          }
        }
      }

      for (let i = 0; i < v.length; i++) {
        if (d[i] === INF && dp[i] !== INF && dp[i] >= 0) {
          d[i] = dp[i];
        }
      }
    }
    return d;
  }

  getVisit() {
    return this.#visit;
  }

  size() {
    return this.#count;
  }
}

/* PRIMERA VERSIÓN DEL ALGORITMO
dijkstra(start) {
  //Declaramos variables
  const INF = 100000;
  let l = [];
  let v = [];
  let lp = [];
  let d = [];
  let dp = [];

  //Iniciamos sus valores
  for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
    v[i] = i;
    lp[i] = v[i];
    d[i] = INF;
  }

  //Comenzamos el algoritmo

  let v1 = this.#map.get(start); //Obtenemos el indice del vertice inicial for(let i = 0; i < v.length; i++) {}
  for (let i = 0; i < v.length; i++) {
    //Iniciamos nuestra D
    if (v1 == v[i]) {
      d[i] = 0;
    } else {
      d[i] = INF;
    }
  }

  console.log(v1);
  console.log(d);

  let filtro = d.filter((number) => number >= 0);
  let min = Math.min(...filtro);

  for (let i = 0; i < v.length; i++) {
    if (d[i] == min) {
      l.push(i);
      break;
    }
  }

  console.log(l);

  for (let i = 0; i < v.length; i++) {
    if (l[i] == lp[i]) {
      lp[i] = null;
    }
  }

  console.log(lp);

  for (let i = 0; i < lp.length; i++) {
    if (lp[i] == null) {
      dp[i] = -1;
    } else {
      dp[i] = d[i];
    }
  }

  console.log(dp);

  let index = l[l.length - 1];

  for (let j = 0; j < v.length; j++) {
    if (dp[j] > min + this.#matrizAdyacencia[index][j]) {
      dp[j] = min + this.#matrizAdyacencia[index][j];
    }
  }

  console.log(dp);
  
  for (let i = 0; i < v.length; i++) {
    if (d[i] == INF && (dp[i] != INF && dp[i] >= 0)) {
      d[i] = dp[i];
    }
  }

  console.log(d);

  while (l.length != v.length) {
    let filtro = dp.filter((number) => number >= 0);
    let min = Math.min(...filtro);

    for (let i = 0; i < v.length; i++) {
      if (dp[i] == min) {
        l.push(i);
        break;
      }
    }

    console.log(l);

    for (let i = 0; i < v.length; i++) {
      if (l[i] == lp[i]) {
        lp[i] = null;
      }
    }

    console.log(lp);

    for (let i = 0; i < lp.length; i++) {
      if (lp[i] == null) {
        dp[i] = -1;
      } else {
        dp[i] = d[i];
      }
    }

    console.log(dp);

    let index = l[l.length - 1];

    for (let j = 0; j < v.length; j++) {
      if (dp[j] > min + this.#matrizAdyacencia[index][j]) {
        dp[j] = min + this.#matrizAdyacencia[index][j];
      }
    }

    console.log(dp);

    for (let i = 0; i < v.length; i++) {
      if (d[i] == INF && (dp[i] != INF && dp[i] >= 0)) {
        d[i] = dp[i];
      }
    }

    console.log(d);
  }
  return d;
}
*/
