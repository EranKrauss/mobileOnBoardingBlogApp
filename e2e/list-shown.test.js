describe('show-list-test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the posts list on app launch', async () => {
    await expect(element(by.id('posts-list'))).toBeVisible();
  });
});
