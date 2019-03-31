<template>
  <div class="timer">
    <div class="timer__text">
      <h2 class="h2">
        THE EVENT
      </h2>
      <p>
        {{ text }}
      </p>
    </div>
    <div class="timer__counting-div">
      <h2 class="h2">
        LEFT
      </h2>
      <p
        v-if="timer.status === 'past'"
        class="timer__past-info"
      >
        OOOPS... THE TIME HAS PASSED...
      </p>
      <div class="timer__counting">
        <p
          v-for="obj in renderedTimer"
          :key="obj.text"
        >
          <span class="timer__digit">
            {{ obj.count }}
          </span>
          {{ obj.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Timer',
  props: {
    timerId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      now: new Date().getTime(),
      text: '',
      date: '',
      timer: {},
    };
  },
  computed: {
    renderedTimer() {
      return [{
        count: Math.floor(this.timer.days),
        text: 'days',
      },
      {
        count: Math.floor(this.timer.hours % 24),
        text: 'hours',
      },
      {
        count: Math.floor(this.timer.minutes % 60),
        text: 'minutes',
      },
      {
        count: Math.floor(this.timer.seconds % 60),
        text: 'seconds',
      },
      {
        count: this.miliseconds,
        text: '',
      },
      ];
    },
    miliseconds() {
      const miliseconds = Math.floor(this.timer.miliseconds % 1000);
      if ((miliseconds > 9) && (miliseconds < 100)) {
        return `0${miliseconds}`;
      }
      if (miliseconds < 10) {
        return `00${miliseconds}`;
      }
      return `${miliseconds}`;
    },
  },
  mounted() {
    const db = firebase.firestore();
    const docRef = db.collection('timers').doc(this.timerId);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.text = doc.data().text;
        this.date = doc.data().date;
        this.updateTime();
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  },
  methods: {
    updateTime() {
      const interval = setInterval(() => {
        this.now = new Date().getTime();
        const temp = {};
        if (this.date <= this.now) {
          temp.status = 'past';
          temp.miliseconds = this.now - this.date;
        } else {
          temp.miliseconds = this.date - this.now;
          temp.status = 'future';
        }
        temp.seconds = temp.miliseconds / 1000;
        temp.minutes = temp.seconds / 60;
        temp.hours = temp.minutes / 60;
        temp.days = temp.hours / 24;
        this.timer = temp;
      }, 1);
    },
  },

};
</script>

<style>
</style>
