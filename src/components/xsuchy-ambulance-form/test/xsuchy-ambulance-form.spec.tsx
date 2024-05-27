import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceForm } from '../xsuchy-ambulance-form';

describe('xsuchy-ambulance-form', () => {

  it('renders new transport form', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceForm],
      html: `<xsuchy-ambulance-form transport-id="@new" department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-form>`,
    });

    expect(page.root).toEqualHtml(`
      <xsuchy-ambulance-form transport-id="@new" department-id="dept1" api-base="http://localhost">
        <mock:shadow-root>
          <form>
            <md-filled-text-field label="Meno a priezvisko pacienta" required="">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-text-field>
            <md-filled-text-field label="Rodné číslo pacienta" required="">
              <md-icon slot="leading-icon">fingerprint</md-icon>
            </md-filled-text-field>
            <md-filled-select label="Oddelenie odkiaľ bude presun">
              <md-icon slot="leading-icon">domain</md-icon>
            </md-filled-select>
            <md-filled-select label="Oddelenie kam bude presun">
              <md-icon slot="leading-icon">domain</md-icon>
            </md-filled-select>
            <md-filled-text-field label="Plánovaný termín presunu" type="datetime-local">
              <md-icon slot="leading-icon">event</md-icon>
            </md-filled-text-field>
            <md-filled-text-field label="Predpokladaný čas presunu (v minútach)" type="number">
              <md-icon slot="leading-icon">hourglass_bottom</md-icon>
            </md-filled-text-field>
            <md-filled-select label="Mobilita pacienta">
              <md-icon slot="leading-icon">accessible</md-icon>
            </md-filled-select>
          </form>
          <md-divider></md-divider>
          <div class="actions">
            <md-filled-tonal-button id="delete" disabled="">
              <md-icon slot="icon">delete</md-icon>
              Zmazať
            </md-filled-tonal-button>
            <span class="stretch-fill"></span>
            <md-outlined-button id="cancel">
              Zrušiť
            </md-outlined-button>
            <md-filled-button id="confirm" disabled="">
              <md-icon slot="icon">save</md-icon>
              Uložiť
            </md-filled-button>
          </div>
        </mock:shadow-root>
      </xsuchy-ambulance-form>
    `);
  });

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
