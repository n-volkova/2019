<template>
  <div class="flex-container">
    <slot name="logo" />
    <slot name="scramble" />
        
    <div
      class="chevron-down"
      @click="$emit('scrollDown')"
    />
  </div>
</template>

<script>
export default {
  computed: {
    isClient() {
      return window.IS_CLIENT;
    },

    noData() {
      return window.NO_DATA;
    },

  }
};
</script>

<style lang="scss">
    .ready-section {
        .text, 
        .logo {
            color: #fff;
        }
        .fp-tableCell {
            vertical-align: top;
        }
        .flex-container {
            display: block;
        }
        .chevron-down {
            position: absolute;
            width: 44px;
            height: 24px;
            bottom: 40px;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            background-image: url('~@/assets/down.svg');
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
        }
        .scramble-text {
            @media (min-width: 768px) {
                font-size: 90px;
                line-height: 1;
            }

            @media (min-width: 401px) and (max-width: 767px) {
                font-size: 40px;
                line-height: 1.15;
            }

            @media (max-width: 400px) {
                font-size: 28px;
                line-height: 1.15;
            }
        }
    }
</style>