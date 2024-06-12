export default class Place {
  #name;
  #distance;

  constructor(name, distance) {
    this.#name = name;
    this.#distance = distance;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}
