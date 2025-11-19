import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editBtn = page.locator('span .btn.btn-outline-secondary.btn-sm')
    .nth(0);
    this.articleText = page.locator('.col-md-12');
    this.tag = page.locator('.tag-default.tag-pill.tag-outline');
  }

  async waitForArticlePutResponse() {
  const response = await this.page.waitForResponse(response => 
    response.url().includes('/api/articles/') &&
    response.request().method() === 'PUT'
  );

  const body = await response.json();
  const slug = body.article.slug;
  return slug;
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

  async clickEditButton() {
    await test.step(`Click the [Edit Article] in the header`, async () => {
    await this.editBtn.click();
    });
  }

  async assertArticleTitleIsUpdated(title) {
    await test.step(`Assert the article has updated title`, async () => {
    const slug = await this.waitForArticlePutResponse();
    await this.page.goto(`https://conduit.mate.academy/article/${slug}`);
    await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticDescriptionIsUpdated(description) {
    await test.step(`Assert the article has updated description`, async () => {
      const slug = await this.waitForArticlePutResponse();
      await this.page.goto(`https://conduit.mate.academy/article/${slug}`);
      await expect(this.articleTitleHeader).toContainText(description);
    });
  }

  async assertArticleTextIsUpdated(text) {
    await test.step(`Assert article has updated text`, async () => {
      const slug = await this.waitForArticlePutResponse();
      await this.page.goto(`https://conduit.mate.academy/article/${slug}`);
      await expect(this.articleText).toContainText(text);
    });
  }

  async assertTagsAdded(expectedTags) {
  await test.step(`Assert tags are updated`, async () => {
    const slug = await this.waitForArticlePutResponse();
    await this.page.goto(`https://conduit.mate.academy/article/${slug}`);

    // Wait for tag elements to appear
    const tagElements = this.page.locator(this.tag); 
    await expect(tagElements).toHaveCount(expectedTags.length);

    // Extract texts of all tags
    const actualTags = await tagElements.allTextContents();

    // Compare ignoring order
    for (const tag of expectedTags) {
      expect(actualTags).toContain(tag);
    }
  });
}

  async assertTagUpdated(oldTags, newTags) {
    await test.step(`Assert tags are updated`, async () => {
      const allExpectedTags = [...oldTags, ...newTags];
      const slug = await this.waitForArticlePutResponse();
      await this.page.goto(`https://conduit.mate.academy/article/${slug}`);
      for (const tag of allExpectedTags) {
        await expect(this.page.locator(`.tag-list >> text=${tag}`))
        .toBeVisible();
      }
    });
  }

}