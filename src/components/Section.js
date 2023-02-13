export default class Section {
  #array;
  #container;
  #renderer;

  constructor(data, renderer, containerSelector) {
    this.#array = data;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  render() {
    this.#array.reverse().forEach((item) => {
      this.#renderer(item);
    });
  }

  prepend(element) {
    this.#container.prepend(element);
  }
}
