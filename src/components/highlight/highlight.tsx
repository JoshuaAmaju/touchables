import { Component, Element, h } from "@stencil/core";

@Component({
  shadow: true,
  tag: "touchable-highlight",
  styles: ":host {transition: 0.5s; display: inline-block;}"
})
export class TouchableScale {
  contrast: number = 0.4;

  @Element() host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener("pointerup", this.pointerUp);
    this.host.addEventListener("pointerdown", this.pointerDown);
  }

  pointerDown = () => {
    const style = document.createElement("style");
    style.id = "style";
    style.innerHTML = `:host {filter: contrast(${this.contrast})}`;
    this.host.shadowRoot.appendChild(style);
  };

  pointerUp = () => {
    const root = this.host.shadowRoot;
    const style = root.querySelector("#style");
    root.removeChild(style);
  };

  render() {
    return <slot />;
  }
}
