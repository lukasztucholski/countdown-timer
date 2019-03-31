<template>
  <div class="date-picker">
    <input
      v-model="pickedDate"
      readonly="readonly"
      type="text"
      class="input-text date-picker__input"
      @click="showCalendar = !showCalendar"
    >
    <div
      v-if="showCalendar"
      class="date-picker__calendar"
    >
      <div class="calendar__nav">
        <p class="month-nav">
          <span
            class="left-skip"
            @click="skipMonth(-1)"
          />
          <span colspan="2">
            {{ month }}
          </span>
          <span
            class="right-skip"
            @click="skipMonth(1)"
          />
        </p>
        <p class="year-nav">
          <span
            class="left-skip"
            @click="skipYear(-1)"
          />
          <span>
            {{ date.getFullYear() }}
          </span>
          <span
            class="right-skip"
            @click="skipYear(1)"
          />
        </p>
      </div>
      <table
        class="calendar__days-table"
      >
        <thead>
          <tr>
            <td
              v-for="(dayName, index) in daysNames"
              :key="index"
              class="calendar__day-name"
            >
              {{ dayName }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(week, i) in weeksCount"
            :key="i"
          >
            <td
              v-for="(d, j) in 7"
              :key="j"
              class="calendar__day-numb"
              :class="days[i * 7 + j].status"
              @click="pickDate(i * 7 + j)"
            >
              {{ days[i * 7 + j].day }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      date: new Date(),
      days: [],
      weeksCount: 0,
      month: '',
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      showCalendar: false,
    };
  },
  computed: {
    pickedDate() {
      return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`;
    },
  },
  watch: {
    date() {
      this.updateCalendar();
    },
  },
  created() {
    this.date.setMilliseconds(0);
    this.date.setSeconds(0);
    this.updateCalendar();
  },
  methods: {
    skipMonth(count) {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + count));
    },
    skipYear(count) {
      this.date = new Date(this.date.setFullYear(this.date.getFullYear() + count));
    },
    pickDate(index) {
      this.date = new Date(this.date.setDate(this.days[index].day));
      this.date.setMonth(this.days[index].month);
      this.showCalendar = false;
      this.$emit('pickedDate', this.date);
    },
    getDaysOfMonth(whichMonth) {
      const daysCount = new Date(this.date.getFullYear(), this.date.getMonth() + whichMonth + 1, 0).getDate();
      const daysArray = [];
      for (let i = daysCount; i > 0; i--) {
        daysArray.push(i);
      }
      return daysArray;
    },
    getFirstDayOfMonth(whichMonth) {
      let firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + whichMonth, 1).getDay();
      if (firstDayOfMonth === 0) {
        firstDayOfMonth = 7;
      }
      return firstDayOfMonth;
    },
    updateCalendar() {
      this.days = [];
      this.month = this.monthNames[this.date.getMonth()];
      const daysOfCurrentMonth = this.getDaysOfMonth(0);
      const daysOfPreviousMonth = this.getDaysOfMonth(-1);
      let firstDayOfCurrentMonth = this.getFirstDayOfMonth(0);
      const firstDayOfNextMonth = this.getFirstDayOfMonth(1);
      const cellsForNextMonthsDays = 8 - firstDayOfNextMonth;
      const cellsForPreviousMonthsDays = firstDayOfCurrentMonth - 1;
      const allDaysToRenderInTable = daysOfCurrentMonth.length + cellsForPreviousMonthsDays + cellsForNextMonthsDays;
      this.weeksCount = Math.ceil(allDaysToRenderInTable / 7);

      let tempFirstDayOfNextMonth = 1;
      for (let i = 0; i < allDaysToRenderInTable; i++) {
        if (firstDayOfCurrentMonth !== 1) {
          this.days.push({
            status: 'inactive',
            day: daysOfPreviousMonth[firstDayOfCurrentMonth - 2],
            month: this.date.getMonth() - 1,
          });
          firstDayOfCurrentMonth -= 1;
        } else if (daysOfCurrentMonth.length > 0) {
          this.days.push({
            status: 'active',
            day: daysOfCurrentMonth[daysOfCurrentMonth.length - 1],
            month: this.date.getMonth(),
          });
          daysOfCurrentMonth.length -= 1;
        } else if (cellsForNextMonthsDays < 8) {
          this.days.push({
            status: 'inactive',
            day: tempFirstDayOfNextMonth,
            month: this.date.getMonth() + 1,
          });
          tempFirstDayOfNextMonth += 1;
        }
      }
      this.days.forEach((obj) => {
        if (obj.day === this.date.getDate() && obj.month === this.date.getMonth()) {
          obj.status += ' picked';
        }
      });
    },
  },
};
</script>

<style>
</style>
