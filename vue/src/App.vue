<template>
  <div :class="['header', { 'fixed-top': isFixed }]" id="header">
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

      <button type="button" class="btn btn-outline-success add-goal">+</button>

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

    <date-carousel v-if="!toggleScreen"></date-carousel>
  </div>
  <div :style="{ 'margin-top': topMargin }">
    <goals v-if="toggleScreen"></goals>
    <calendar v-else></calendar>
  </div>

  <div id="add-goal-form" class="d-none">
    <form action="http://localhost:3000/addGoal" method="post" @submit.prevent>
      <div class="form-floating">
        <input
          name="name"
          type="text"
          class="form-control"
          id="goal-name-template"
          placeholder="Goal Name"
        />
        <label for="goal-name-template">Name</label>
      </div>

      <div class="form-floating">
        <textarea
          name="description"
          class="form-control"
          placeholder="Goal Description"
          id="goal-description-template"
          style="height: 100px"
        ></textarea>
        <label for="goal-description-template">Description</label>
      </div>

      <label for="goal-priority-template" class="form-label">Priority</label>
      <input
        name="priority"
        type="range"
        class="form-range"
        min="0"
        max="5"
        id="goal-priority-template"
      />

      <label for="start-date-template" class="form-label">Start Date</label>
      <input
        name="startDate"
        type="date"
        class="form-control"
        id="start-date-template"
      />

      <label for="end-date-template" class="form-label">End Date</label>
      <input
        name="endDate"
        type="date"
        class="form-control"
        id="end-date-template"
      />

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
            :id="'goal-occurrence-' + day + '-template'"
            :value="day"
          />
          <label
            class="form-check-label"
            :for="'goal-occurrence-' + day + '-template'"
            >{{ day }}</label
          >
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Goals from "./components/Goals.vue";
import Calendar from "./components/Calendar.vue";
import DateCarousel from "./components/DateCarousel.vue";
import Popover from "bootstrap/js/dist/popover";

export default {
  name: "App",
  components: {
    Goals,
    Calendar,
    DateCarousel,
  },
  data() {
    return {
      toggleScreen: true,
      isFixed: true,
      isGoalsClicked: false,
      isCalendarClicked: false,
      topMargin: "0px",
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    };
  },
  mounted() {
    this.setTopMargin();
    window.addEventListener("resize", this.setTopMargin);
    this.activatePopover();
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
        this.isCalendarClicked = true;
        this.toggleScreen = false;
      } else if (tabName === "Goals") {
        this.isGoalsClicked = true;
        this.isCalendarClicked = false;
        this.toggleScreen = true;
      }
    },
    setTopMargin() {
      this.topMargin = document.getElementById("header").offsetHeight + "px";
    },
    activatePopover() {
      new Popover(document.getElementsByClassName("add-goal")[0], {
        sanitize: false,
        container: "body",
        placement: "bottom",
        html: true,
        content: document
          .getElementById("add-goal-form")
          .innerHTML.replaceAll("-template", ""),
      });
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
