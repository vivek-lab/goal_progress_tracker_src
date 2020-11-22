<template>
  <div
    id="date-carousel"
    class="carousel slide small-screen-font"
    data-ride="carousel"
    data-interval="false"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <ul class="nav nav-pills nav-justified" id="first-week">
          <li
            class="nav-item"
            v-for="(date, index) in firstWeek"
            :key="index"
            @click="scroll('HEADER_OFFSET')"
          >
            <a class="nav-link" :href="'#' + weekDays[date.getDay()]"
              >{{ weekDays[date.getDay()] }}<br />{{
                (10 > date.getDate() ? "0" + date.getDate() : date.getDate()) +
                " " +
                months[date.getMonth()]
              }}</a
            >
          </li>
        </ul>
      </div>
      <div class="carousel-item">
        <ul class="nav nav-pills nav-justified" id="second-week">
          <li
            class="nav-item"
            v-for="(date, index) in secondWeek"
            :key="index"
            @click="scroll('HEADER_OFFSET')"
          >
            <a class="nav-link" :href="'#' + weekDays[date.getDay()]"
              >{{ weekDays[date.getDay()] }}<br />{{
                (10 > date.getDate() ? "0" + date.getDate() : date.getDate()) +
                " " +
                months[date.getMonth()]
              }}</a
            >
          </li>
        </ul>
      </div>
    </div>

    <a
      class="carousel-control-prev"
      href="#date-carousel"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </a>

    <a
      class="carousel-control-next"
      href="#date-carousel"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </a>
  </div>
</template>

<script>
import "bootstrap/js/dist/carousel";
import ScrollSpy from "bootstrap/js/dist/scrollspy";

export default {
  name: "DateCarousel",
  data() {
    return {
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      currentWeek: "first",
      previousDirection: "right",
      firstWeek: [],
      secondWeek: [],
    };
  },
  methods: {
    addDays(baseDate, days) {
      let date = new Date(baseDate.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    },
    populateDateArray(weekArray, firstIndexDate) {
      for (let dateIdx = 0; dateIdx < 7; dateIdx++) {
        weekArray[dateIdx] = this.addDays(firstIndexDate, dateIdx);
      }
    },
    populateDateCarousel() {
      let currentDate = new Date();
      let dayOfWeek = currentDate.getDay();
      let dayOffset = dayOfWeek == 0 ? 6 : dayOfWeek - 1;
      this.populateDateArray(
        this.firstWeek,
        this.addDays(currentDate, dayOffset * -1)
      );
      this.populateDateArray(
        this.secondWeek,
        this.addDays(currentDate, dayOffset * -1 + 7)
      );
    },
    activateScrollSpy(weekID) {
      new ScrollSpy(document.body, {
        target: "#" + weekID,
        offset: document.getElementById("header").offsetHeight,
      });
    },
    deactivateScrollSpy() {
      ScrollSpy.getInstance(document.getElementsByTagName("body")[0]).dispose();
    },
    scroll(where) {
      switch (where) {
        case "TOP":
          window.scrollTo(window.scrollX, 0);
          break;
        case "CURRENT_DATE":
          this.activateScrollSpy("first-week");
          window.scrollTo(
            window.scrollX,
            document.getElementById(this.weekDays[new Date().getDay()])
              .offsetTop -
              document.getElementById("header").offsetHeight +
              1
          );
          break;
        case "HEADER_OFFSET":
          setTimeout(() => {
            window.scrollTo(
              window.scrollX,
              window.scrollY -
                document.getElementById("header").offsetHeight +
                1
            );
          }, 10);
          break;
      }
    },
    addDateCarouselEventHandler() {
      document
        .getElementById("date-carousel")
        .addEventListener("slide.bs.carousel", (event) => {
          this.scroll("TOP");
          this.deactivateScrollSpy();
          this.activateScrollSpy(
            event.from == 0 ? "second-week" : "first-week"
          );
          if (this.previousDirection == event.direction) {
            if (event.from == 0) {
              this.populateDateArray(
                this.secondWeek,
                this.addDays(
                  this.firstWeek[0],
                  event.direction == "left" ? 7 : -7
                )
              );
            } else if (event.from == 1) {
              this.populateDateArray(
                this.firstWeek,
                this.addDays(
                  this.secondWeek[0],
                  event.direction == "left" ? 7 : -7
                )
              );
            }
          }
          this.previousDirection = event.direction;
        });
    },
    activateScrollSpyAndMoveToCurrentDay() {
      setTimeout(() => {
        this.activateScrollSpy();
        this.scroll("CURRENT_DATE");
      }, 10);
    },
  },
  created() {
    this.populateDateCarousel();
  },
  beforeMount() {
    this.scroll("TOP");
  },

  mounted() {
    this.addDateCarouselEventHandler();
    this.activateScrollSpyAndMoveToCurrentDay();
  },
  unmounted() {
    this.deactivateScrollSpy();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carousel-control-prev,
.carousel-control-next {
  width: 3%;
  /* filter: invert(100%); */
  border-style: solid;
  border-color: #000000;
  background-color: #343a40;
}

.carousel-inner {
  width: 94%;
  margin-left: 3%;
}

.carousel-inner > .carousel-item {
  -webkit-transition: -webkit-transform 1s ease-in-out !important;
  -o-transition: -o-transform 1s ease-in-out !important;
  transition: transform 1s ease-in-out !important;
}

/* @media only all and (max-width: 600px) {
  .small-screen-font {
    font-size: 70%;
  }
} */
</style>
