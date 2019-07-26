import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  shadow: true,
  tag: "touchable-elevate",
  styles: ":host {transition: 0.5s; display: inline-block;}"
})
export class TouchableScale {
  @Prop() elevation: number = 4;

  @Element() host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener("pointerup", this.pointerUp);
    this.host.addEventListener("pointerdown", this.pointerDown);
  }

  pointerDown = () => {
    const style = document.createElement("style");
    style.id = "style";
    style.innerHTML = `:host {
      filter: drop-shadow(0px ${this.elevation}px 6px rgba(0, 0, 0, ${this
      .elevation / 10}))
    }`;
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
