// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Article {
    struct ArticleData {
        uint256 id;
        string title;
        string url;
        string authorName;
        address authorAddress;
        uint256[] citations;
        uint256[] weights;
    }

    ArticleData[] public articles;

    event ArticleCreated(
        uint256 id,
        string title,
        string url,
        string authorName,
        address authorAddress,
        uint256[] citations,
        uint256[] weights
    );

    function createArticle(
        string memory _title,
        string memory _url,
        string memory _authorName,
        uint256[] memory _citations,
        uint256[] memory _weights
    ) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_url).length > 0, "URL cannot be empty");
        require(bytes(_authorName).length > 0, "Author name cannot be empty");

        uint256[] memory citations = new uint256[](_citations.length);
        uint256[] memory weights = new uint256[](_weights.length);

        uint256 totalWeight = 0;

        for (uint i = 0; i < _citations.length; i++) {
            require(_citations[i] != 0, "Invalid citation ID");
            require(
                _weights[i] >= 0 && _weights[i] <= 100,
                "Weight must be between 0 and 100"
            );
            citations[i] = _citations[i];
            weights[i] = _weights[i];
            totalWeight += _weights[i];
        }

        if (totalWeight > 100) {
            for (uint i = 0; i < weights.length; i++) {
                weights[i] = (100 * weights[i]) / totalWeight;
            }
        } else if (totalWeight < 100) {
            uint256 missingWeight = 100 - totalWeight;
            uint256[] memory newWeights = new uint256[](weights.length + 1);
            for (uint i = 0; i < weights.length; i++) {
                uint256 newWeight = (missingWeight * weights[i]) /
                    (100 - totalWeight);
                newWeights[i] = weights[i] + newWeight;
            }
            newWeights[weights.length] = missingWeight;
            weights = newWeights;
        }

        uint256 id = articles.length;
        articles.push(
            ArticleData(
                id,
                _title,
                _url,
                _authorName,
                msg.sender,
                citations,
                weights
            )
        );

        emit ArticleCreated(
            id,
            _title,
            _url,
            _authorName,
            msg.sender,
            citations,
            weights
        );
    }

    function getArticle(
        uint256 _id
    )
        public
        view
        returns (
            uint256 id,
            string memory title,
            string memory url,
            string memory authorName,
            address authorAddress,
            uint256[] memory citations,
            uint256[] memory weights
        )
    {
        require(_id < articles.length, "Invalid article ID");
        ArticleData memory article = articles[_id];
        citations = new uint256[](article.citations.length);
        weights = new uint256[](article.weights.length);

        for (uint i = 0; i < article.citations.length; i++) {
            citations[i] = article.citations[i];
            weights[i] = article.weights[i];
        }

        id = article.id;
        title = article.title;
        url = article.url;
        authorName = article.authorName;
        authorAddress = article.authorAddress;
    }
}
