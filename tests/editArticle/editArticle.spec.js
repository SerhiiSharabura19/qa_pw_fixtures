import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { test } from '../_fixtures/fixtures';
import { Logger } from '../../src/common/logger/Logger';

let user;
let article;
let articleData;

test.beforeEach(async ({ page }) => {
  user = generateNewUserData();
  await signUpUser(page, user); 
  return user;
});

test('Edit the article title for the existing article', async ({
  viewArticlePage, createArticlePage, articleWithoutTags, logger}) => {
  const articleData = generateNewArticleData(0, logger);
  await viewArticlePage.clickEditButton();
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsUpdated(articleData.title);
});

test('Edit the article description for the existing article',
  async ({ 
    viewArticlePage,
    createArticlePage,
    homePage,
    articleWithoutTags, 
    logger
  }) => {
  const articleData = generateNewArticleData(0, logger);
  await viewArticlePage.clickEditButton();
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.waitForArticlePutResponse();
  await homePage.clickUserAvatar();
  await homePage.assertArticDescriptionIsUpdated(articleData.description);
});

test('Edit the article text for the existing article', async ({
    viewArticlePage,
    createArticlePage,
    articleWithoutTags,
    logger
}) => {
  const articleData = generateNewArticleData(0, logger);
  await viewArticlePage.clickEditButton();
  await createArticlePage.fillTextField(articleData.text);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsUpdated(articleData.text);
});

test('Add the tag for the existing article without tags', async ({
    viewArticlePage,
    createArticlePage,
    articleWithoutTags, 
    logger
}) => {
  articleData = generateNewArticleData(1, logger);
  await viewArticlePage.clickEditButton();
  await createArticlePage.fillTagsField(articleData.tags);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertTagsAdded(articleData.tags);
});

test('Add the tag for the existing article with tags', async ({
    viewArticlePage,
    createArticlePage,
    articleWithOneTag,
    logger
}) => {
  articleData = generateNewArticleData(2, logger);
  article = articleWithOneTag; 
  await viewArticlePage.clickEditButton();
  await createArticlePage.fillTagsField(articleData.tags);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertTagUpdated(article.tags, articleData.tags);
});
