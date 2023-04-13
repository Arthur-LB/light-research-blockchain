// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Article {
    struct ArticleData {
        string authorName;
        address authorAddress;
        string articleTitle;
        string articleUrl;
        uint256[] citations;
        uint256[] weights;
    }

    mapping(uint256 => ArticleData) public articles;
    uint256 public articleCount;

    event NewArticleAdded(
        uint256 indexed articleId,
        string authorName,
        address authorAddress,
        string articleTitle,
        string articleUrl
    );
    event ArticleCited(
        uint256 indexed articleId,
        uint256 indexed citationId,
        uint256 weight
    );

    function addArticle(
        string memory _authorName,
        string memory _articleTitle,
        string memory _articleUrl
    ) public returns (uint256) {
        articleCount++;
        articles[articleCount] = ArticleData(
            _authorName,
            address(msg.sender),
            _articleTitle,
            _articleUrl,
            new uint256[](0),
            new uint256[](0)
        );
        emit NewArticleAdded(
            articleCount,
            _authorName,
            address(msg.sender),
            _articleTitle,
            _articleUrl
        );
        return articleCount;
    }

    function citeArticle(
        uint256 _articleId,
        uint256 _citationId,
        uint256 _weight
    ) public {
        require(_articleId != _citationId, "An article cannot cite itself");
        require(
            _weight >= 0 && _weight <= 100,
            "Weight must be between 0 and 100"
        );

        articles[_articleId].citations.push(_citationId);
        articles[_articleId].weights.push(_weight);
        emit ArticleCited(_articleId, _citationId, _weight);
    }

    function getArticleCitations(
        uint256 _articleId
    ) public view returns (uint256[] memory, uint256[] memory) {
        return (articles[_articleId].citations, articles[_articleId].weights);
    }

    /**
     * @dev Returns the article data for a given article id
        * @param _articleId The id of the article
        return the 
     */
    function getArticle(
        uint256 _articleId
    ) public view returns (ArticleData memory) {
        return articles[_articleId];
    }
}
