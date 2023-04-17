const Article = artifacts.require("Article");
const App = require("../src/js/app.js");

contract("Article", async (accounts) => {
  let app;

  beforeEach(async () => {
    app = await App.init();
  });

  it("should create an article", async () => {
    const title = "My First Article";
    const url = "https://example.com/my-first-article";
    const authorName = "John Doe";
    const citations = [1, 2, 3];
    const weights = [1, 1, 1];

    await app.createArticle(title, url, authorName, citations, weights);

    const articleCount = await Article.count();
    assert.equal(articleCount, 1, "Article count should be 1");

    const article = await Article.getArticle(0);
    assert.equal(article.title, title, "Article title should match");
    assert.equal(article.url, url, "Article URL should match");
    assert.equal(article.authorName, authorName, "Author name should match");
    assert.deepEqual(article.citations, citations, "Citations should match");
    assert.deepEqual(article.weights, weights, "Weights should match");
  });
});
