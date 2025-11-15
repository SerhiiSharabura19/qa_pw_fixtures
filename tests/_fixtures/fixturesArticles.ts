import { test as base } from '@playwright/test';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  createArticlePage: CreateArticlePage,
  viewArticlePage: ViewArticlePage,
  editArticlePage: EditArticlePage,
  articleWithoutTags: ReturnType<typeof generateNewArticleData>,
  articleWithOneTag: ReturnType<typeof generateNewArticleData>,
  articleWithTwoTags: ReturnType<typeof generateNewArticleData>
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);
    await use(createArticlePage);
  },

  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);
    await use(viewArticlePage);
  },

  editArticlePage: async ({page}, use) => {
    const editArticlePage = new EditArticlePage(page);
    await use(editArticlePage);
  }, 

  articleWithoutTags: async ({page}, use) => {
    const article = await createArticle(page);
    await use(article);
  },

  articleWithOneTag: async ({page}, use) => {
    const article = await createArticle(page, 1);
    await use(article);
  },

  articleWithTwoTags: async ({page}, use) => {
    const article = await createArticle(page, 2);
    await use(article);
  }

});