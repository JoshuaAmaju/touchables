import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  shadow: true,
  tag: "touchable-opacity",
  styles: `
  :host {
    transition: 0.5s;
    display: inline-block;
  }
  `
})
export class TouchableOpacity {
  @Prop() opacity: number = 0.05;

  @Element() host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener("pointerup", this.pointerUp);
    this.host.addEventListener("pointerdown", this.pointerDown);
  }

  pointerDown = () => {
    const style = document.createElement("style");
    style.id = "style";
    style.innerHTML = `:host {filter: opacity(${this.opacity})}`;
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
