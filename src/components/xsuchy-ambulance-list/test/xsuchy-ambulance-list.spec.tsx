import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulanceList } from '../xsuchy-ambulance-list';

describe('xsuchy-ambulance-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulanceList],
      html: `<xsuchy-ambulance-list></xsuchy-ambulance-list>`,
    });
    expect(page.root).toEqualHtml(`
      <xsuchy-ambulance-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xsuchy-ambulance-list>
    `);
  });
});
