import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceList } from '../xsuchy-ambulance-list';

describe('xsuchy-ambulance-list', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      url: `http://localhost/`,
      components: [XsuchyAmbulanceList],
      html: `<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>`,
    });

    await page.waitForChanges();

    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("div");
  });
});
