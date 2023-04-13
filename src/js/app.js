const config = require("../../config.json");
const Web3 = require("web3");

const { JSDOM } = require("jsdom");

// Create a fake DOM environment
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

// Set global variables in the fake DOM environment
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    initweb3 = await App.initWeb3();
    // Load articles.
    if (document) {
      var articleRow = document.querySelector("#articleRow");
      var articleTemplate = document.querySelector("#articleTemplate");
    }
    // Get the number of articles from the smart contract
    const numberOfArticles = await App.contracts.Article.count();

    // Loop through each article and display it
    for (let i = 0; i < numberOfArticles; i++) {
      // Get the article from the smart contract
      const article = await App.contracts.Article.getArticle(i);

      // Fill in the article template with the article information
      articleTemplate.querySelector(".panel-title").textContent = article.title;
      articleTemplate.querySelector(".article-author").textContent =
        article.author;
      articleTemplate.querySelector(".article-content").textContent =
        article.content;
      articleTemplate.querySelector(".article-timestamp").textContent =
        article.timestamp;

      // Append the article to the article row
      articleRow.innerHTML += articleTemplate.innerHTML;
    }

    return initweb3;
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    // Check if we're running in a web browser
    if (window && window.ethereum) {
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
    else if (window && window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If we're not running in a web browser, use the HTTP provider
    else {
      //url and port is in the .env file
      App.web3Provider = new Web3.providers.HttpProvider(
        `${config.WEB3_HTTP_PROVIDER_URL}:${config.WEB3_HTTP_PROVIDER_PORT}`
      );
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    return fetch("@artifacts/Article.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var ArticleArtifact = data;
        App.contracts.Article = TruffleContract(ArticleArtifact);
        // Set the provider for our contract
        App.contracts.Article.setProvider(App.web3Provider);

        return App.bindEvents();
      })
      .then(function () {
        return App.createArticle();
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  bindEvents: function () {
    // No events to bind
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
        alert("Article created successfully!");
        // Handle the event emitted by the contract when an articleis created
      })
      .catch(function (err) {
        console.log(err.message);
        alert("Failed to create article");
      });
  },
};

if (window) {
  window.onload = function () {
    App.init();
  };
} else {
  App.init();
}
