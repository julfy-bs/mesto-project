export default class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(items) {
    items.reverse().forEach((item) => this._renderer(item));
  }

  prepend(element) {
    this._container.prepend(element);
  }
}
