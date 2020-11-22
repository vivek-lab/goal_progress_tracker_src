<template>
  <div>
    <div class="header fixed-top" id="header">
      <nav :class="['nav', 'nav-tabs', 'nav-justified']">
        <a
          :class="[
            'nav-link',
            'btn-outline-dark',
            'navigation',
            { clicked: isGoalsClicked },
          ]"
          @click="changeTab('Goals')"
          >Goals</a
        >

        <button
          type="button"
          class="btn btn-outline-success add-goal"
          :class="[
            'btn',
            'btn-outline-success',
            'add-goal',
            { active: isAddGoalFormActive },
          ]"
          @click="changeTab('AddGoalForm')"
        >
          +
        </button>

        <a
          :class="[
            'nav-link',
            'btn-outline-dark',
            'navigation',
            { clicked: isCalendarClicked },
          ]"
          @click="changeTab('Calendar')"
          >Calendar</a
        >
      </nav>

      <date-carousel v-if="isCalendarClicked"></date-carousel>
    </div>
    <div :style="{ 'margin-top': topMargin }">
      <goals v-if="isGoalsClicked"></goals>
      <add-goal-form v-else-if="isAddGoalFormActive"></add-goal-form>
      <calendar v-else></calendar>
    </div>
  </div>
</template>

<script>
import Goals from "./components/Goals.vue";
import Calendar from "./components/Calendar.vue";
import DateCarousel from "./components/DateCarousel.vue";
import AddGoalForm from "./components/AddGoalForm.vue";

export default {
  name: "App",
  components: {
    Goals,
    Calendar,
    DateCarousel,
    AddGoalForm,
  },
  data() {
    return {
      isFixed: true,
      isGoalsClicked: true,
      isCalendarClicked: false,
      isAddGoalFormActive: false,
      topMargin: "0px",
    };
  },
  mounted() {
    this.setTopMargin();
    window.addEventListener("resize", this.setTopMargin);
  },
  updated() {
    this.setTopMargin();
  },
  unmounted() {
    window.removeEventListener("resize", this.setTopMargin);
  },
  methods: {
    changeTab(tabName) {
      if (tabName === "Calendar") {
        this.isGoalsClicked = false;
        this.isAddGoalFormActive = false;
        this.isCalendarClicked = true;
      } else if (tabName === "Goals") {
        this.isGoalsClicked = true;
        this.isAddGoalFormActive = false;
        this.isCalendarClicked = false;
      } else if (tabName === "AddGoalForm") {
        this.isGoalsClicked = false;
        this.isAddGoalFormActive = true;
        this.isCalendarClicked = false;
      }
    },
    setTopMargin() {
      this.topMargin = document.getElementById("header").offsetHeight + "px";
    },
  },
};
</script>

<style>
/* #app {} */

.navigation {
  font-weight: bold;
}

a.navigation.clicked {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}
.add-goal {
  font-weight: 900;
  z-index: 1;
}

.header {
  background-color: #ffffff;
}

.tooltip-inner {
  max-width: 350px;
  /* If max-width does not work, try using width instead */
  width: 350px;
}

.popover {
  /* Max Width of the popover (depending on the container!) */
  max-width: 70%;
}

:root {
  scroll-behavior: auto;
}
</style>
