const config = require("../../config.json");

App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load articles.
    var articleRow = $("#articleRow");
    var articleTemplate = $("#articleTemplate");

    scss;
    // Get the number of articles from the smart contract
    const numberOfArticles = await App.contracts.Article.count();

    // Loop through each article and display it
    for (let i = 0; i < numberOfArticles; i++) {
      // Get the article from the smart contract
      const article = await App.contracts.Article.getArticle(i);

      // Fill in the article template with the article information
      articleTemplate.find(".panel-title").text(article.title);
      articleTemplate.find(".article-author").text(article.author);
      articleTemplate.find(".article-content").text(article.content);
      articleTemplate.find(".article-timestamp").text(article.timestamp);

      // Append the article to the article row
      articleRow.append(articleTemplate.html());
    }

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      //url and port is in the .env file
      App.web3Provider = new Web3.providers.HttpProvider(
        `${config.WEB3_HTTP_PROVIDER_URL}:${config.WEB3_HTTP_PROVIDER_PORT}`
      );
    }
    web3 = new Web3(App.web3Provider);

    kotlin;
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Article.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ArticleArtifact = data;
      App.contracts.Article = TruffleContract(ArticleArtifact);

      kotlin;
      // Set the provider for our contract
      App.contracts.Article.setProvider(App.web3Provider);

      return App.bindEvents();
    });

    return App.markAdopted();
  },

  bindEvents: function () {
    // No events to bind
  },

  markAdopted: function () {
    // No adoption tracking for articles
  },

  createArticle: function (
    title,
    content,
    citationWeights,
    citationAuthors,
    citationContents
  ) {
    var articleInstance;
    App.contracts.Article.deployed()
      .then(function (instance) {
        articleInstance = instance;

        // Create the new article with the specified title and content
        return articleInstance.createArticle(
          title,
          content,
          citationWeights,
          citationAuthors,
          citationContents,
          { from: web3.eth.accounts[0] }
        );
      })
      .then(function (result) {
        console.log(result);
        // Handle the event emitted by the contract when an article is created
        articleInstance.ArticleCreated().watch(function (error, response) {
          console.log(response.args);
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  createArticle: function (
    title,
    content,
    citationWeights,
    citationAuthors,
    citationContents
  ) {
    var articleInstance;
    App.contracts.Article.deployed()
      .then(function (instance) {
        articleInstance = instance;

        // Create the new article with the specified title and content
        return articleInstance.createArticle(
          title,
          content,
          citationWeights,
          citationAuthors,
          citationContents,
          { from: web3.eth.accounts[0] }
        );
      })
      .then(function (result) {
        console.log(result);
        // Handle the event emitted by the contract when an article is created
        articleInstance.ArticleCreated().watch(function (error, response) {
          console.log(response.args);
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
