import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-list></xsuchy-ambulance-list>');

    const element = await page.find('xsuchy-ambulance-list');
    expect(element).toHaveClass('hydrated');
  });
});
