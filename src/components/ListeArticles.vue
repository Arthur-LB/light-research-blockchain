<template>
    <div class="listeArticles">
      <ArticleDetails v-for="(article, index) in articles" :key="index" :article="article" />
    </div>
  </template>
  
  <script>
  import ArticleDetails from './ArticleDetails.vue'
  
  export default {
    name: 'ListeArticles',
    components: {
      ArticleDetails
    },
    props:{
        articles: {
            type: Array,
            required: true
        }
    },
  }
  </script>

  <style scoped>

    </style>
  