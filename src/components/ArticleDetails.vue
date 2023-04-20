<template>
  <div class="Article">
    <h2>{{ article.articleTitle }}</h2>
    <div class="subArticle">
    <div class="divAuthor">
        <p class="author">Author: {{ article.authorName }} </p>
        <p class="address">Adress: {{ article.authorAddress }}</p>
    </div>
      <p class="articleUrl"> 
        Article URL: <a :href="article.articleUrl">{{ article.articleUrl }}</a>
      </p>
      <CitationsDetails :citations="article.citations" :weights="article.weights"></CitationsDetails>
    </div>
  </div>
</template>

<script>
import CitationsDetails from "./CitationsDetails.vue";

export default {
  name: "ArticleDetails",
  components: {
    CitationsDetails,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
