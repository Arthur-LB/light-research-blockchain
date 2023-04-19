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
            <button class="addCit" @click="nbCasesInc()"> Add citation </button>
            <button class="remCit" @click="nbCasesDec()"> Remove citation </button>
            <!-- <input type="text" v-model="citation.text" placeholder="Citation address" /> -->
                <div v-for="(weight, index) in nbWeight" :key="index">
                    <input type="text" v-model="citations" placeholder="Citation url" />
                    <input type="number" v-model="weights" placeholder="Weight" />
                </div>
            
            <input type="submit" value="Submit">
        </form>
    </div>
</template>



<script>
export default {
    components: {
        
    },
    name: "FormArticle",
    props: {
    },
    data() {
        return {
            nbCitation: 1,
            nbWeight: 1,
            authorName: "",
            authorAddress: "",
            articleTitle: "",
            articleUrl: "",
            citations: [],
            weights: [],
        };
    },
    methods: {
        nbCasesInc() {
            if (this.nbCitation >= 10) {
                alert("You can't add more than 10 citations");
                return;
            }
            this.nbCitation++;
            this.nbWeight++;
        },
        nbCasesDec() {
            if (this.nbCitation <= 1) {
                alert("You must have at least 1 citation");
                return;
            }
            this.nbCitation--;
            this.nbWeight--;
        },
    },
};
</script>