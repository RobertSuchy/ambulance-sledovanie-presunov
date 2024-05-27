import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceForm } from '../xsuchy-ambulance-form';

describe('xsuchy-ambulance-form', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      url: `http://localhost/`,
      components: [XsuchyAmbulanceForm],
      html: `<xsuchy-ambulance-form transport-id="transport1" department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-form>`,
    });
    
    await page.waitForChanges();
    
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("div");
  });
});
