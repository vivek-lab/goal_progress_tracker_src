<template>
  <div class="card">
    <h5 class="card-header">{{ goal.name }}</h5>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <p>{{ goal.startDate }}</p>
        </div>
        <div class="col text-center">
          <span class="badge bg-info">{{ goal.priority }}</span>
        </div>
        <div class="col text-right">
          <p>{{ goal.endDate }}</p>
        </div>
      </div>

      <p
        class="text-center description"
        data-container="body"
        data-toggle="tooltip"
        data-placement="bottom"
        :title="goal.description"
        ref="tooltip"
      >
        {{
          goal.description.substring(0, 75) +
          (goal.description.length > 75 ? "..." : "")
        }}
      </p>

      <div class="row text-center">
        <div class="col">
          <button type="button" class="btn btn-outline-warning">Edit</button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-outline-success">
            Complete
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  name: "Goal",
  props: ["goal"],
  mounted(){
    new Tooltip(this.$refs["tooltip"]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
}
</style>


