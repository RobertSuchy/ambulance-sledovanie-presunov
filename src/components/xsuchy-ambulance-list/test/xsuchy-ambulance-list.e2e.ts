import { newE2EPage } from '@stencil/core/testing';

describe('xsuchy-ambulance-list', () => {
  it('renders and displays transport list', async () => {
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

    const listItem = await listElement.find('md-list-item');
    expect(listItem).not.toBeNull();

    const headline = await listItem.find('div[slot="headline"]');
    expect(headline).not.toBeNull();
    expect(headline.textContent).toBe('John Doe');
  });
});
