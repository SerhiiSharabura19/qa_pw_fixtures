import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.usersAvatar = page.locator('.hide-text.user-pic');
    this.newestArticleDescription = page.locator('.preview-link p').nth(0);
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickUserAvatar() {
    await test.step(`Click user's avatar and redirect to My Articles page`,
      async () => {
      await this.usersAvatar.click();
      await this.page.waitForURL(
        `https://conduit.mate.academy/profile/**`);
    });
  }

  async assertArticDescriptionIsUpdated(description) {
    await test.step(`Assert updated article's description`,
      async () => {
      await expect(this.newestArticleDescription).toContainText(description);
    });
  }

}
