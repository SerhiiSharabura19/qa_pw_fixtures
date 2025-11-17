import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';
import { generateNewArticleData } from '../../../common/testData/generateNewArticleData';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function createArticle(page, tagsCount, logger) {
  let article;
  await test.step(`Create an article`, async () => {
    const createNewArticle = new CreateArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page); 
    article = generateNewArticleData(tagsCount, logger);
    await homePage.clickNewArticleLink();
    await createNewArticle.fillTitleField(article.title);
    await createNewArticle.fillDescriptionField(article.description);
    await createNewArticle.fillTextField(article.text);
    if (tagsCount) {
      await createNewArticle.fillTagsField(article.tags);
    }
    await createNewArticle.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });
    logger.debug(`New article generated: ${article}`);
    return article;
}