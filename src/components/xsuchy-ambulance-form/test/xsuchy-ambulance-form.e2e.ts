import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-form', () => {

  it('submits form', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-form transport-id="@new" department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-form>');

    const element = await page.find('xsuchy-ambulance-form');
    const button = await element.find('md-filled-button#confirm');
    
    await page.$eval('xsuchy-ambulance-form >>> form', (form: HTMLFormElement) => {
      form.dispatchEvent(new Event('submit'));
    });

    expect(button).not.toHaveAttribute('disabled');
  });
});
