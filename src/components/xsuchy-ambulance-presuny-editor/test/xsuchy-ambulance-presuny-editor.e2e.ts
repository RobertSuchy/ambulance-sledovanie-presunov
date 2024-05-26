import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-editor></xsuchy-ambulance-editor>');

    const element = await page.find('xsuchy-ambulance-editor');
    expect(element).toHaveClass('hydrated');
  });
});
