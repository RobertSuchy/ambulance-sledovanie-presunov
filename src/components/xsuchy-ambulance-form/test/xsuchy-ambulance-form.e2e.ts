import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-form></xsuchy-ambulance-form>');

    const element = await page.find('xsuchy-ambulance-form');
    expect(element).toHaveClass('hydrated');
  });
});
