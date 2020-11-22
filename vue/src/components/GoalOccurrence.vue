<template>
  <div class="card-body border border-light">
    <h5 class="card-title">{{goalOccurrence.name}}</h5>
    <p class="card-text">
      {{goalOccurrence.comment}}
    </p>
    <a href="#" class="btn btn-primary">Do something</a>
  </div>
</template>

<script>
export default {
  name: "GoalOccurrence",
  props: ["goalOccurrence"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
