import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulance } from '../xsuchy-ambulance';

describe('xsuchy-ambulance', () => {

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/`,
      components: [XsuchyAmbulance],
      html: `<xsuchy-ambulance base-path="/"></xsuchy-ambulance>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("xsuchy-ambulance-list");
  });
});
