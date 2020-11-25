<template>
  <div>
    <div
      class="card"
      v-for="(weekDay, index) in weekDays"
      :key="index"
      :id="weekDay"
    >
      <h5 class="card-header">{{ weekDay }}</h5>
      <goal-occurrence
        v-for="(goalOccurrenceInfo, index) in goalOccurrences"
        :key="index"
        :goal-occurrence="goalOccurrenceInfo"
      ></goal-occurrence>
    </div>
  </div>
</template>

<script>
import GoalOccurrence from "./GoalOccurrence.vue";

export default {
  name: "Calender",
  components: { GoalOccurrence },
  props: ["activeWeek"],
  data() {
    return {
      weekDays: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      goalOccurrences: [
        {
          name: "Complete project",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          name: "Data Structure",
          comment: "Revise it",
        },
        {
          name: "Data Structure",
          comment: "Revise it",
        },
        // {
        //   name: "Data Structure",
        //   comment: "Revise it",
        // },
        // {
        //   name: "Data Structure",
        //   comment: "Revise it",
        // },
        // {
        //   name: "Data Structure",
        //   comment: "Revise it",
        // },
      ],
      allOccurrences: [],
    };
  },
  watch: {
    activeWeek(week) {
      // console.log(this.activeWeek.lastDay);
      console.log(week.lastDay);
    },
  },
  created() {
    this.axios
      .post("http://localhost:3000/allOccurrences", {
        from: new Date("2020-11-01"),
        to: new Date("2020-11-30"),
      })
      .then((response) => {
        console.log(response);
        this.allOccurrences = response;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
