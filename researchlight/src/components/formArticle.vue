<template>
    <div class="formArticle">
        <form>
            <h2 class="formArticle">Add an article Form</h2>
            <label for="authorName">Author Name:</label>
            <input type="text" placeholder="Author Name" v-model="authorName">
            <label for="authorAddress">Author Address:</label>
            <input type="text" placeholder="Author Address" v-model="authorAddress">
            <label for="articleTitle">Article Title:</label>
            <input type="text" placeholder="Article Title" v-model="articleTitle">
            <label for="articleUrl">Article URL:</label>
            <input type="text" placeholder="Article URL" v-model="articleUrl">
            <h3 class="formArticleH3">
                Ajouter des citations
            </h3>
            <ul>
                <li v-for="nbCases in nbCase" :key="nbCases">
                    <input type="text" v-model="citation.text" placeholder="Citation text">
                </li>
                <li v-for="nbCases in nbCase" :key="nbCases">
                    <input type="text" v-model="citation.text" placeholder="Citation text">
                </li>
            </ul>
            <button class="addCit" @click="nbCases = nbCases++"> Add citation ({{ nbCases }})</button>
            <input typesubmit>
        </form>
    </div>
</template>

<script>
export default {
    name: "FormArticle",
    props: {
    },
    data() {
        return {
            nbCases: 1,
            authorName: "",
            authorAddress: "",
            articleTitle: "",
            articleUrl: "",
        };
    },
};
</script>