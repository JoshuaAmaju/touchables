import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  shadow: true,
  tag: "touchable-scale",
  styles: `
  :host {
    transition: 0.5s;
    display: inline-block;
    will-change: transform;
  }
  `
})
export class TouchableScale {
  @Prop() scale: number = 0.7;

  @Element() host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener("pointerup", this.pointerUp);
    this.host.addEventListener("pointerdown", this.pointerDown);
  }

  pointerDown = () => {
    const style = document.createElement("style");
    style.id = "style";
    style.innerHTML = `:host {transform: scale3d(${this.scale}, ${
      this.scale
    }, 1);}`;

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
