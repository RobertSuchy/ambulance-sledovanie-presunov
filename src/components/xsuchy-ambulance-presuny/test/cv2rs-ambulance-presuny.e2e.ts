import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-presuny', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-presuny></xsuchy-ambulance-presuny>');

    const element = await page.find('xsuchy-ambulance-presuny');
    expect(element).toHaveClass('hydrated');
  });
});
