import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-presuny-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-presuny-editor></xsuchy-ambulance-presuny-editor>');

    const element = await page.find('xsuchy-ambulance-presuny-editor');
    expect(element).toHaveClass('hydrated');
  });
});
