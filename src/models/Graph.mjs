import { LinkedList } from "./linkedList/LinkedLlist.mjs";

export default class Graph {
  #listaAdyacencia = [];
  #map = new Map();

  constructor() {}

  addV(value) {
    this.#listaAdyacencia.push(new LinkedList());
    this.#map.set(value, this.#listaAdyacencia.length - 1);
    return true;
  }

  addConexion(start, end, distance = 1) {
    if (this.#map.has(start) && this.#map.has(end)) {
      this.#listaAdyacencia[this.#map.get(start)].push(end, distance);
      return true;
    }
    return false;
  }

  bfs(callback) {
    let queue = [];
    let list = [];
    const entries = [...structuredClone(this.#map)];
    for (let i = 0; i < this.#listaAdyacencia.length; i++) list[i] = false;

    let [key] = entries[0];
    queue.push(key);

    while (queue.length > 0) {
      let val = queue.shift(); //Sacamos el primer elemento de la cola
      callback(val); //Imprimimos el valor
      list[this.#map.get(val)] = true; //Marcamos de visitado
      for (
        let i = 0;
        i < this.#listaAdyacencia[this.#map.get(val)].length;
        i++
      ) {
        if (this.#listaAdyacencia[this.#map.get(val)][i]) {
          let [key] = entries[i];
          if (!list[this.#map.get(key)] && !queue.includes(key))
            queue.push(key); //Agregamos los vecinos a la cola
        }
      }
    }
  }
}
