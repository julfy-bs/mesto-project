export default class Section {
  constructor(data, renderer, containerSelector) {
    this._array = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._array.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  prepend(element) {
    this._container.prepend(element);
  }
}
