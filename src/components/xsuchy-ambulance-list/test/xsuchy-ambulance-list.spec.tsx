import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceList } from '../xsuchy-ambulance-list';

describe('xsuchy-ambulance-list', () => {

  it('renders transport list', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceList],
      html: `<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>`,
    });

    // Simulate the data fetching
    await page.waitForChanges();

    const listElement = page.root.shadowRoot.querySelector('md-list');
    expect(listElement).not.toBeNull();
  });

  it('displays error message when API call fails', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceList],
      html: `<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>`,
    });

    // Simulate API error
    page.rootInstance.errorMessage = 'Cannot retrieve list of transports: API error';
    await page.waitForChanges();

    const errorMessageElement = page.root.shadowRoot.querySelector('.error');
    expect(errorMessageElement).not.toBeNull();
    expect(errorMessageElement.textContent).toContain('Cannot retrieve list of transports: API error');
  });
});
