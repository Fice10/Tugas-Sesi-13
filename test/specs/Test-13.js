import { expect } from 'chai';

describe('Appium DEMO App', () => {

  afterEach(async () => {
    // Terminate the app (if running)
    await browser.execute('mobile: terminateApp', { appId: 'io.appium.android.apis' });

    // Short delay to ensure app is closed
    await browser.pause(9000);

    // Start the app again
    await browser.execute('mobile: activateApp', { appId: 'io.appium.android.apis' });
  });

  it('Klik elemen', async () => {
    // menu: home page
    const elemenKlik = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);
    await elemenKlik.waitForDisplayed({ timeout: 10000 });
    await elemenKlik.click();
  });
  
  it('Input ke elemen', async () => {
    // menu: App > Alert Dialogs > Text Entry dialog
    const appMenu = await $(`//android.widget.TextView[@content-desc="App"]`);
    const alertdialogMenu = await $(`//android.widget.TextView[@content-desc="Alert Dialogs"]`);
    const textentryMenu = await $(`//android.widget.Button[@content-desc="Text Entry dialog"]`);
    await appMenu.click();
    await alertdialogMenu.click();
    await textentryMenu.click();

    // input ke elemen
    const nameField = await $(`//android.widget.EditText[1]`);
    const passField = await $(`//android.widget.EditText[2]`);
    await nameField.setValue('admin_fikriluthfi');
    await passField.setValue('admin1234');
  });
  
  it('Memastikan App bisa terbuka dan elemen tersedia', async () => {
    const accessibilityMenu = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);

    // Wait, then click
    await accessibilityMenu.waitForDisplayed({ timeout: 10000 });
    const isVisible = await accessibilityMenu.isDisplayed();
    expect(isVisible).to.be.true;
  });

  describe('Swipe Hard-Coded Example', () => {
  it('Swipe elemen Gallery di ApiDemos', async () => {
    // Navigasi menu: Views > Gallery > 1. Photos
    const viewsMenu = await $('~Views');
    const galleryMenu = await $('~Gallery');
    const photosMenu = await $('~1. Photos');

    await viewsMenu.click();
    await galleryMenu.click();
    await photosMenu.click();

    // Pastikan elemen Gallery terlihat
    const galleryWidget = await $('//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]');
    await galleryWidget.waitForDisplayed({ timeout: 10000 });
    expect(await galleryWidget.isDisplayed()).to.be.true;

    // SWIPE: hitung posisi & size
    const location = await galleryWidget.getLocation();
    const size = await galleryWidget.getSize();
    const margin = 50; // Biar swipe nggak mepet edge
    const y = location.y + size.height / 2;
    const startX = location.x + size.width - margin;
    const endX = location.x + margin;

    console.log(`Swiping from X:${startX} to X:${endX} at Y:${y}`);

    await browser.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: 300, x: endX, y: y },
        { type: 'pointerUp', button: 0 }
      ]
    }]);

    await browser.releaseActions();

    console.log('Swipe berhasil dijalankan!');
  });
    // Always release actions after use

    // case: scroll scrollview sampai ketemu element
    /*const scrollView = await $(`android=new UiSelector().resourceId("abc")`);
    const targetElement = await $(`//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]`);

    let maxScrolls = 5;
    let isVisible = await targetElement.isDisplayed().catch(() => false);

    while (!isVisible && maxScrolls > 0) {
      const location = await scrollView.getLocation();
      const size = await scrollView.getSize();

      const centerX = location.x + size.width / 2;
      const startY = location.y + size.height * 0.8;
      const endY = location.y + size.height * 0.2;

       Swipe up inside the scrollView
      await browser.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: centerX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 200 },
          { type: 'pointerMove', duration: 300, x: centerX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
      await browser.releaseActions();

      // Wait briefly before checking again
      await browser.pause(1000);

      isVisible = await targetElement.isDisplayed().catch(() => false);
      maxScrolls--;
    }

    expect(isVisible).to.be.true;
    */

  });

  it('Scroll down', async () => {
    const viewsMenu = await $(`//android.widget.TextView[@content-desc="Views"]`);
    await viewsMenu.waitForDisplayed({ timeout: 10000 });
    await viewsMenu.click();

    // Ensure the scrollable view is loaded before scrolling
    await browser.pause(1000);

    // scroll down
    const target = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Layouts"))`);
    await target.waitForDisplayed({ timeout: 40000 });
    await target.click();

  });
});