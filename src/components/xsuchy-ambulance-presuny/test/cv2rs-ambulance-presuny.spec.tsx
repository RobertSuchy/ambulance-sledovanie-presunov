import { newSpecPage } from '@stencil/core/testing';
import { XsuchyAmbulancePresuny } from '../xsuchy-ambulance';

describe('xsuchy-ambulance', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsuchyAmbulancePresuny],
      html: `<xsuchy-ambulance></xsuchy-ambulance>`,
    });

    expect(page.root).toEqualHtml(`
      <xsuchy-ambulance>
      <mock:shadow-root>
        <div>
          <slot>
            XSUCHY - AMBULANCE - SLEDOVANIE PRESUNOV
          </slot>
        </div>
        <div>
          <slot>
            Povodny text...
          </slot>
        </div>
        <div>
          <button>
            Aktualizovat text
          </button>
        </div>
      </mock:shadow-root>
    </xsuchy-ambulance>
    `);
  });
});
