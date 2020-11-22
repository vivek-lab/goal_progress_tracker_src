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
      goals: [
        {
          key: 1,
          priority: 1,
          name: "Complete project",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          startDate: new Date().toLocaleDateString(),
          endDate: new Date().toLocaleDateString(),
        },
        {
          key: 2,
          priority: 2,
          name: "Data Structure",
          description: "Revise it",
          startDate: "Sep",
          endDate: "Dec",
        },
        {
          key: 3,
          priority: 3,
          name: "Data Structure",
          description: "Revise it",
          startDate: "Sep",
          endDate: "Dec",
        },
        {
          key: 4,
          priority: 4,
          name: "Data Structure",
          description: "Revise it",
          startDate: "Sep",
          endDate: "Dec",
        },
        {
          key: 5,
          priority: 5,
          name: "Data Structure",
          description: "Revise it",
          startDate: "Sep",
          endDate: "Dec",
        },
        {
          key: 6,
          priority: 6,
          name: "Data Structure",
          description: "Revise it",
          startDate: "Sep",
          endDate: "Dec",
        },
      ],
    };
  },
  mounted() {
    this.axios
      .get("http://localhost:3000/goals")
      .then((response) => {
        console.log(response.data);
        response.data.forEach((goal) => {
          goal.startDate = new Date(goal.startDate).toLocaleDateString();
          goal.endDate = new Date(goal.endDate).toLocaleDateString();
          goal.type == "Short"
            ? this.shortGoals.push(goal)
            : this.longGoals.push(goal);
        });
      })
      .catch((error) => console.log(error));
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
