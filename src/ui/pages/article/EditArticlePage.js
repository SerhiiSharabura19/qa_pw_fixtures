import { test, expect } from '@playwright/test';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('h1');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}