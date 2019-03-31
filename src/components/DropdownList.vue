<template>
  <div>
    <div class="dropdown">
      <span
        class="dropdown__nav"
        @click="skipElement(-1)"
      >
        -
      </span>
      <span
        class="dropdown__value"
        @click="expand = !expand"
      >
        {{ pickedElementString }}
      </span>
      <span
        class="dropdown__nav"
        @click="skipElement(1)"
      >
        +
      </span>
      <ul
        v-if="expand"
        class="dropdown__list"
      >
        <li
          v-for="(h, i) in count"
          :key="i"
          class="dropdown__list-element"
          @click="pickedElement = i; expand = false"
        >
          {{ i }}
        </li>
      </ul>
    </div>
    <div class="dropdown__footer">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownList',
  props: {
    count: {
      default: 0,
      type: Number,
    },
    time: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      pickedElement: this.time,
      expand: false,
    };
  },
  computed: {
    pickedElementString() {
      if (this.pickedElement < 10) {
        return `0${this.pickedElement}`;
      }
      return this.pickedElement;
    },
  },
  watch: {
    pickedElement() {
      this.$emit('pickedElement', this.pickedElement);
    },
  },
  methods: {
    skipElement(howMany) {
      const newElement = this.pickedElement + howMany;
      if (newElement > this.count - 1) {
        this.pickedElement = 0;
      } else if (newElement < 0) {
        this.pickedElement = this.count;
      } else {
        this.pickedElement = newElement;
      }
    },
  },
};
</script>

<style>

</style>
