import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>');

    const element = await page.find('xsuchy-ambulance-list');
    expect(element).toHaveClass('hydrated');
  });

  it('displays transport list', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>');

    // Simulovať získanie dát
    await page.$eval('xsuchy-ambulance-list', (element: any) => {
      element.transports = [
        {
          id: '1',
          patientId: '123',
          patientName: 'John Doe',
          fromDepartmentId: 'dept1',
          toDepartmentId: 'dept2',
          scheduledDateTime: new Date().toISOString(),
          estimatedDurationMinutes: 30,
          mobilityStatus: { code: "WALK", value: "Walking", description: "" }
        }
      ];
    });

    await page.waitForChanges();

    const listElement = await page.find('xsuchy-ambulance-list >>> md-list');
    expect(listElement).not.toBeNull();
  });

  it('displays error message on API error', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsuchy-ambulance-list department-id="dept1" api-base="http://localhost"></xsuchy-ambulance-list>');

    // Simulovať chybu API
    await page.$eval('xsuchy-ambulance-list', (element: any) => {
      element.errorMessage = 'Cannot retrieve list of transports: API error';
    });

    await page.waitForChanges();

    const errorMessageElement = await page.find('xsuchy-ambulance-list >>> .error');
    expect(errorMessageElement).not.toBeNull();
    expect(errorMessageElement.textContent).toContain('Cannot retrieve list of transports: API error');
  });
});
