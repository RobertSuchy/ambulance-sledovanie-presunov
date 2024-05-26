import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulancePresunyEditor } from '../xsuchy-ambulance-editor';

describe('xsuchy-ambulance-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulancePresunyEditor],
      html: `<xsuchy-ambulance-editor></xsuchy-ambulance-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <xsuchy-ambulance-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xsuchy-ambulance-editor>
    `);
  });
});
