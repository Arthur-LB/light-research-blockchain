<template>
  <div class="citations">
    <h3>Citations:</h3>
    <div class="citation" v-for="(citation, index) in citations" :key="index">
      <p>{{ citation }} - {{ weights[index] }}</p>
    </div>
  </div>
</template>

<script>


export default {
  name: "CitationsDetails",
  components: {
  },
  props: {
    citations: {
      type: Array,
      required: true,
    },
    weights: {
      type: Array,
      required: true,
    },
  },
};
</script>
