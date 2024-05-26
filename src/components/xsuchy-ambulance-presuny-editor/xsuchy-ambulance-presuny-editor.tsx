import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xsuchy-ambulance-editor',
  styleUrl: 'xsuchy-ambulance-editor.css',
  shadow: true,
})
export class XsuchyAmbulancePresunyEditor {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
