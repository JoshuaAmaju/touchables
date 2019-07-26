import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  shadow: true,
  tag: "touchable-blur",
  styles: ":host {transition: 0.5s; display: inline-block;}"
})
export class TouchableScale {
  /**
   * @property blur
   * The amount of blur to be added
   */
  @Prop({ attribute: "blur" }) _blur: number = 4;

  @Element() host: HTMLElement;

  componentDidLoad() {
    this.host.addEventListener("pointerup", this.pointerUp);
    this.host.addEventListener("pointerdown", this.pointerDown);
  }

  pointerDown = () => {
    const style = document.createElement("style");
    style.id = "style";
    style.innerHTML = `:host {filter: blur(${this._blur}px)}`;
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
