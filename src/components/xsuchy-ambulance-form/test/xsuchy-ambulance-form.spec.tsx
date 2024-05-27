import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceForm } from '../xsuchy-ambulance-form';

describe('xsuchy-ambulance-form', () => {

   it('renders existing transport form', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceForm],
      html: `<xsuchy-ambulance-form transport-id="transport1" department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-form>`,
    });

    // Simulate the data fetching
    await page.waitForChanges();

    const formElement = page.root.shadowRoot.querySelector('form');
    expect(formElement).not.toBeNull();

    const patientNameField = formElement.querySelector('[label="Meno a priezvisko pacienta"]');
    expect(patientNameField.getAttribute('value')).toBe('Jozef Mak'); // Assuming "Jozef Mak" is fetched for transport1
  });

});
