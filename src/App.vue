<template>
  <div>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="https://github.com/Arthur-LB">Arthur-Louis BONNEAU</a></li>
        <li><a href="https://github.com/ItsaiKara">Tyfenn ELOY</a></li>
        <!-- a link to display the form-->
      </ul>
    </nav>
    <button class="showForm" @click="showForm = !showForm">{{ showForm ? 'Hide' : 'Show' }} form</button>
    <FormArticle v-if="showForm"></FormArticle>
    <ListeArticle :articles="ListeArticles"></ListeArticle>
  </div>
</template>

<script>
import ListeArticle from "./components/ListeArticles.vue";
import FormArticle from "./components/formArticle.vue";

export default {
  name: "App",
  components: {
    ListeArticle,
    FormArticle
},
  data() {
    return {
      showForm : true, //display of the form
      ListeArticles: [
        {
          authorName: "John Doe",
          authorAddress: "123 Main St, Anytown, USA",
          articleTitle: "The Importance of VueJS in Modern Web Development",
          articleUrl: "https://example.com/article1",
          citations: [123, 456, 789],
          weights: [0.5, 0.3, 0.2],
        },
        {
          authorName: "Jane Smith",
          authorAddress: "456 Oak Ave, Anytown, USA",
          articleTitle: "Building Reactive Web Applications with VueJS",
          articleUrl: "https://example.com/article2",
          citations: [987, 654, 321],
          weights: [0.4, 0.4, 0.2],
        },
        {
          authorName: "Bob Johnson",
          authorAddress: "789 Elm St, Anytown, USA",
          articleTitle: "Optimizing Performance in VueJS Applications",
          articleUrl: "https://example.com/article3",
          citations: [111, 222, 333],
          weights: [0.2, 0.4, 0.4],
        },
        {
          authorName: "John Doe",
          authorAddress: "123 Main St, Anytown, USA",
          articleTitle: "The Importance of VueJS in Modern Web Development",
          articleUrl: "https://example.com/article1",
          citations: [123, 456, 789],
          weights: [0.5, 0.3, 0.2],
        },
        {
          authorName: "Jane Smith",
          authorAddress: "456 Oak Ave, Anytown, USA",
          articleTitle: "Building Reactive Web Applications with VueJS",
          articleUrl: "https://example.com/article2",
          citations: [987, 654, 321],
          weights: [0.4, 0.4, 0.2],
        },
        {
          authorName: "Bob Johnson",
          authorAddress: "789 Elm St, Anytown, USA",
          articleTitle: "Optimizing Performance in VueJS Applications",
          articleUrl: "https://example.com/article3",
          citations: [111, 222, 333],
          weights: [0.2, 0.4, 0.4],
        },
      ],
    };
  },
};
</script>

<style>
body {
  background-color: #303030;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.Article {
  border: 1px solid black;
  border-radius: 0.2em;
  padding: 0;
  margin: 1%;
  background-color: rgb(138, 138, 138);
  width: 30%;
}
.listeArticles {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
}
nav {
  background-color: #05031b;
  margin: 0;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0%;
}
nav > ul > li {
  display: inline;
  background-color: #0d0670;
  padding-bottom: 1px;
  padding-left: 0%;
  padding-right: 0%;
  font-size: 1.5em;
  margin: 0;
}
nav > ul > li > a {
  color: white;
  text-decoration: none;
  padding-bottom: 1px;
  padding-left: 1%;
  padding-right: 1%;
}
nav > ul > li > a:hover {
  color: #cda1ff;
  text-decoration: none;
  padding-bottom: 1px;
  padding-left: 1%;
  padding-right: 1%;
}

.Article > h2 {
  padding: 0.5em;
  font-size: 1.5em;
  background-color: rgb(107, 107, 107);
  margin: 0;
  text-align: center;
}
.Article{
  padding-bottom: 0;
}

.subArticle {
  padding: 0em;
}
.citations > h3 {
  font-size: 1.2em;
  text-align: center;
  background-color: #969696;
  margin: 0;
}
.citations {
  font-size: 0.8em;
  background-color: #9e9e9e;
}
.citation > p{
  margin-top: 0em;
  margin-bottom: 0em;
  padding-left: 0.3em;
  padding-right: 0.3em;
}
p{
  padding: 0.2em;
}
.divAuthor{
  display: flex;
  flex-direction: line;
  justify-content: space-evenly;
  padding: 0em;
}
.author{
  display: inline-flex;
}
.address{
  display: inline-flex;
}
.articleUrl{
  text-align: center;
}
a {
  color: #1900ff;
  text-decoration: none;
}
a:hover {
  color: #2937ff;
  text-decoration: none;
  }
button {
  background-color: #c7c2ff;
  font-size: 1.5em;
  border: none;
  padding: 0.2em, 0.1em;
  margin:1% auto;
  display:block;
  border-radius: 0.2em;
}
button:hover {
  background-color: #a39bff;
  font-size: 1.5em;
  border: none;
  padding: 0.2em, 0.1em;
  margin:1% auto;
  display:block;
  border-radius: 0.2em;
}
.formArticle{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  width: 95%;
  align-items: center;
  background-color: #c7c2ff;
  padding: 0;
  margin: 1% auto;
  text-align: center;
}
input{
  margin: 0.5em;
  padding: 0.5em;
  font-size: 1.0em;
}
.remCit{
  background-color: #ff0000;
  color: #ffffff;
  width: 30vh;

  border: none;
  padding: 0.2em, 0.1em;
  margin:1% 1%;
  display:inline;
  border-radius: 0.2em;
}
.addCit{
  background-color: #00ff00;
  color: #ffffff;
  width: 30vh;

  border: none;
  padding: 0.2em, 0.1em;
  margin:1% 1%;
  display:inline;
  border-radius: 0.2em;
}
.remCit:hover{
  background-color: #bd0000;
  width: 30vh;
  color: #ffffff;
  border: none;
  padding: 0.2em, 0.1em;
  margin:1% 1%;
  display:inline;
  border-radius: 0.2em;
}
.addCit:hover{
  background-color: #00bd00;
  color: #ffffff;
  width: 30vh;

  border: none;
  padding: 0.2em, 0.1em;
  margin:1% 1%;
  display:inline;
  border-radius: 0.2em;
}

</style>
