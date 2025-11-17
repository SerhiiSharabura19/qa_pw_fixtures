import { faker } from '@faker-js/faker';
// import { Logger } from '../logger/Logger';

export function generateNewArticleData(tagNumber = 0, logger) {
  const tags = Array.from({ length: tagNumber }, () => faker.lorem.words());
  // const logger = new Logger('info'); // Initialized logger

  let article = {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    text: faker.lorem.sentences(),
    tags,
  };

  logger.debug(`New article generated: ${article}`);

  return article;
}
 