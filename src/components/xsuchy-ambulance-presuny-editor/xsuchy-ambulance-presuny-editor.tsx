import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xsuchy-ambulance-presuny-editor',
  styleUrl: 'xsuchy-ambulance-presuny-editor.css',
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
