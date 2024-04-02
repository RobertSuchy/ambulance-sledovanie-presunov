import { newE2EPage } from '@stencil/core/testing';

describe('cv2rs-ambulance-presuny', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cv2rs-ambulance-presuny></cv2rs-ambulance-presuny>');

    const element = await page.find('cv2rs-ambulance-presuny');
    expect(element).toHaveClass('hydrated');
  });
});
