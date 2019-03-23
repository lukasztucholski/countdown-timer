<template>
  <form class="form">
    <h1 class="default-h1 form__title">
      Create Your Custom Countdown Timer!
    </h1>
    <div class="form__column text">
      <h2 class="default-h2 text__title">
        ENTER YOUR TEXT
      </h2>
      <input
        v-model="text"
        type="text"
        placeholder="Your custom task, reminder, info or whatever else you want!"
        class="default-text-input text__input"
      >
      <p class="default-form__footer" />
    </div>
    <div class="form__column date">
      <h2 class="default-h2 date__title">
        CHOOSE THE DATE
      </h2>
      <Calendar @pickedDate="pickedDate($event)" />
      <div class="time">
        <p class="date__arrow" />
        <h2 class="default-h2">
          CHOOSE THE TIME
        </h2>
        <div class="time__pickers">
          <Time
            :count="24"
            :time="date.getHours()"
            @pickedElement="pickedHour($event)"
          >
            HH
          </Time>
          <Time
            :count="60"
            :time="date.getMinutes()"
            @pickedElement="pickedMinutes($event)"
          >
            MM
          </Time>
        </div>
      </div>

      <p class="default-form__footer" />
    </div>
    <div class="form__column submit">
      <h2 class="default-h2 submit__title">
        AND CREATE YOUR TIMER!
      </h2>
      <button
        class="submit__btn"
        type="submit"
        @click.prevent="submitForm()"
      >
        CREATE TIMER
      </button>
    </div>
  </form>
</template>

<script>
import firebase from 'firebase/app';
import Calendar from './Calendar.vue';
import Time from './DropdownList.vue';

export default {
  name: 'MyForm',
  components: { Calendar, Time },
  data() {
    return {
      text: '',
      date: new Date(),
    };
  },
  created() {
    this.date.setMilliseconds(0);
    this.date.setSeconds(0);
  },
  methods: {
    submitForm() {
      const db = firebase.firestore();
      const id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
      db.collection('timers').where('id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            db.collection('timers').doc(id).set({
              date: this.date.getTime(),
              text: this.text,
              id,
            })
              .then(() => {
                this.$router.push(`/${id}`);
              })
              .catch((error) => {
                console.log('Error writing document: ', error);
              });
          } else {
            this.submitForm();
          }
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    },
    pickedDate(test) {
      this.date.setFullYear(test.getFullYear());
      this.date.setMonth(test.getMonth());
      this.date.setDate(test.getDate());
    },
    pickedHour(hour) {
      this.date.setHours(hour);
    },
    pickedMinutes(minutes) {
      this.date.setMinutes(minutes);
    },
  },
};
</script>

<style>
</style>
