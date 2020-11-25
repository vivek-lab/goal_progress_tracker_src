<template>
  <div class="container-fluid goals">
    <div class="row">
      <div class="col-md-6">
        <div class="border rounded border-secondary short-long-goals">
          <h3>Short Goals</h3>
          <goal
            v-for="(goalInfo, index) in shortGoals"
            :goal="goalInfo"
            :key="index"
          ></goal>
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="border rounded border-secondary short-long-goals long-goals"
        >
          <h3>Long Goals</h3>
          <goal
            v-for="(goalInfo, index) in longGoals"
            :goal="goalInfo"
            :key="index"
          ></goal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Goal from "./Goal.vue";
export default {
  name: "Goals",
  components: {
    Goal,
  },
  data() {
    return {
      shortGoals: [],
      longGoals: [],
    };
  },
  methods: {
    isShortGoal(goal) {
      return goal.description.includes("short");
    },
    populateGoals() {
      this.axios
        .get("http://localhost:3000/goals")
        .then((response) => {
          // response.test();
          console.log(response.data);
          response.data.forEach((goal) => {
            goal.startDate = new Date(goal.startDate).toLocaleDateString();
            goal.endDate = new Date(goal.endDate).toLocaleDateString();
            this.isShortGoal(goal)
              ? this.shortGoals.push(goal)
              : this.longGoals.push(goal);
          });
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.populateGoals();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
}

.goals {
  padding-top: 15px;
  background-color: #f8f9fa;
}

.short-long-goals {
  background-color: #ffffff;
}

@media only all and (max-width: 768px) {
  .long-goals {
    margin-top: 10px;
  }
}
</style>
