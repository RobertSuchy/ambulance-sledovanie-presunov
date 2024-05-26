import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'xsuchy-ambulance-presuny',
  styleUrl: 'xsuchy-ambulance-presuny.css',
  shadow: true,
})
export class XsuchyAmbulancePresuny {
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
