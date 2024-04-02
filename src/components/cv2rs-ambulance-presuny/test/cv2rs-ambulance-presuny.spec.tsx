import { newSpecPage } from '@stencil/core/testing';
import { Cv2rsAmbulancePresuny } from '../cv2rs-ambulance-presuny';

describe('cv2rs-ambulance-presuny', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Cv2rsAmbulancePresuny],
      html: `<cv2rs-ambulance-presuny></cv2rs-ambulance-presuny>`,
    });

    expect(page.root).toEqualHtml(`
      <cv2rs-ambulance-presuny>
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
    </cv2rs-ambulance-presuny>
    `);
  });
});
