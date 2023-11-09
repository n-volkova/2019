<template>
  <div class="scramble-container">
    <span class="invisible">{{ text }}</span>
    <span class="absolute">{{ tweenedValue }}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    disableInitialScramble: {
      type: Boolean,
      default: false
    },
    scrambleDuration: {
      type: Number,
      default: 20
    },
    scrambleCharacterSet: {
      type: String,
      default: '!<>-_\\/[]{}—=+*^?#________'
    },
  },
  data () {
    return {
      queue: [],
      tweenedValue: '',
      frame: null,
      frameRequest: null
    };
  },
  watch: {
    text: function (newValue, oldValue) {
      this.setText(`${oldValue}`, `${newValue}`);
    }
  },
  mounted() {
    if (this.disableInitialScramble) {
      this.tweenedValue = `${this.text}`;
    } else {
      this.setText(this.tweenedValue, `${this.text}`);
    }
  },
  methods: {
    setText(oldText, newText) {
      const length = Math.max(oldText.length, newText.length);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * this.scrambleDuration);
        const end = start + Math.floor(Math.random() * this.scrambleDuration);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
    },
    randomChar() {
      return this.scrambleCharacterSet[
        Math.floor(Math.random() * this.scrambleCharacterSet.length)
      ];
    },
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        const { from, to, start, end, charTmp } = this.queue[i];
        let char = charTmp;
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }
      this.tweenedValue = output;
      if (complete !== this.queue.length) {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }
};
</script>
<style lang="scss">
  .scramble-container {
    position: relative;
    overflow: hidden;

    .invisible {
      visibility: hidden;
      user-select: none;
    }

    .absolute {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>