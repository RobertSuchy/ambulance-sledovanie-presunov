import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulancePresunyEditor } from '../xsuchy-ambulance-presuny-editor';

describe('xsuchy-ambulance-presuny-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulancePresunyEditor],
      html: `<xsuchy-ambulance-presuny-editor></xsuchy-ambulance-presuny-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <xsuchy-ambulance-presuny-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xsuchy-ambulance-presuny-editor>
    `);
  });
});
