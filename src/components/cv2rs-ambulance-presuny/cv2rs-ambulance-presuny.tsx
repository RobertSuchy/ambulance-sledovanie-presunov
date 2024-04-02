import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'cv2rs-ambulance-presuny',
  styleUrl: 'cv2rs-ambulance-presuny.css',
  shadow: true,
})
export class Cv2rsAmbulancePresuny {
  @State() text: string = 'Povodny text...';

  changeText() {
    this.text = 'Novy text!';
  }

  render() {
    return (
      <Host>
        <div>
          <slot>XSUCHY - AMBULANCE - SLEDOVANIE PRESUNOV</slot>
        </div>
        <div>
          <slot>{this.text}</slot>
        </div>
        <div>
          <button onClick={() => this.changeText()}>Aktualizovat text</button>
        </div>
      </Host>
    );
  }

}
