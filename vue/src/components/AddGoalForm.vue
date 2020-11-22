<template>
  <form @submit.prevent="saveGoal">
    <div class="form-floating">
      <input
        name="name"
        type="text"
        class="form-control"
        id="goal-name"
        placeholder="Goal Name"
      />
      <label for="goal-name">Name</label>
    </div>

    <div class="form-floating">
      <textarea
        name="description"
        class="form-control"
        placeholder="Goal Description"
        id="goal-description"
        style="height: 100px"
      ></textarea>
      <label for="goal-description">Description</label>
    </div>

    <label for="goal-priority" class="form-label">Priority</label>
    <input
      name="priority"
      type="range"
      class="form-range"
      min="0"
      max="5"
      id="goal-priority"
    />

    <label for="start-date" class="form-label">Start Date</label>
    <input
      name="startDate"
      type="date"
      class="form-control"
      id="goal-start-date"
    />

    <label for="end-date" class="form-label">End Date</label>
    <input name="endDate" type="date" class="form-control" id="goal-end-date" />

    <label>Goal Occurrence</label>
    <div>
      <div
        class="form-check form-check-inline"
        v-for="(day, index) in weekDays"
        :key="index"
      >
        <input
          name="day"
          class="form-check-input"
          type="checkbox"
          :id="'goal-occurrence-' + day + ''"
          :value="day"
        />
        <label class="form-check-label" :for="'goal-occurrence-' + day + ''">{{
          day
        }}</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</template>

<script>
export default {
  name: "AddGoalForm",
  data() {
    return {
      weekDays: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    };
  },
  methods: {
    saveGoal() {
      let dayObj = {};
      document.getElementsByName("day").forEach(function (day) {
        dayObj[day.value] = day.checked;
      });

      this.axios
        .post("http://localhost:3000/saveGoal", {
          name: document.getElementById("goal-name").value,
          description: document.getElementById("goal-description").value,
          priority: document.getElementById("goal-priority").value,
          startDate: document.getElementById("goal-start-date").value,
          endDate: document.getElementById("goal-end-date").value,
          occurrence: dayObj,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


