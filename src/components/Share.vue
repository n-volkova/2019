<template>
  <div class="flex-container">
    <slot name="logo" />

    <div class="flex-horizontal">
      <slot name="scramble" />
      <div
        class="share-img"
        :class="`share-3`"
      />
    </div>

    <div class="social">
      <a
        :href="twitterLink"
        alt="твиттер"
        target="_blank"
        @click="shareClick('tw')"
      >Twitter</a>
      <a
        :href="fbLink"
        alt="фейсбук"
        target="_blank"
        @click="shareClick('fb')"
      >Facebook</a>
      <a
        :href="vkLink"
        alt="вконтакте"
        target="_blank"
        @click="shareClick('vk')"
      >VK</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      animated: false
    };
  },
  computed: {
    inviteUrl() {
      return 'https://n-volkova.github.io/2019/';
    },

    fbLink() {
      return `https://www.facebook.com/sharer.php?u=${this.inviteUrl}&hashtag=%23Рокетбанк2019`;
    },

    vkLink() {
      return `https://vk.com/share.php?url=${this.inviteUrl}&title=Рокет подводит итоги года`;
    },

    twitterLink() {
      return (
        'https://twitter.com/intent/tweet?hashtags=Рокетбанк2019&&related=rocketbank' +
                `&text=Рокет подводит итоги года&tw_p=tweetbutton&url=${this.inviteUrl}`
      );
    },
  },
  methods: {
    shareClick(s) {
      this.gtag(`share to ${s}`);
    },
        
    gtag: name => {
      if (process.env.NODE_ENV === 'development') console.log('gtag:', name);

      if (window.gtag) gtag('event', name);
    },
  }
};
</script>

<style lang="scss">
    .share-section {
        .text {
            @media (min-width: 1200px) {
                width: 50%;
            }
            @media (min-width: 767px) and (max-width: 1199px) {
                font-size: 45px;
                width: 50%;
            }
            @media (min-width: 401px) and (max-width: 767px) {
                font-size: 23px;
            }
            @media (max-width: 400px) {
                font-size: 18px;
            }
        }
        @media (max-width: 400px) {
            .fp-tableCell {
                vertical-align: top;
            }
        }

        .flex-container {
            @media (max-width: 400px) {
                display: block;
                overflow: auto;
                height: auto;
            }
        }
    }
    .flex-horizontal {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;

        @media (min-width: 880px) {
            flex-direction: row;
        }
        @media (min-width: 401px) and (max-width: 879px) {
            flex-direction: column;
        }
        @media (max-width: 400px) {
            display: block;
        }
    }
    .share-img {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

        @media (min-width: 880px) {
            width: 50%;
        }
        @media (max-width: 879px) {
            flex-grow: 1;
            width: 70%;
            margin: 10px auto;
            min-height: 143px;
        }

        &.share-1 {
            background-image: url('~@/assets/share-1.png');
        }
        &.share-2 {
            background-image: url('~@/assets/share-2.png');
        }
        &.share-3 {
            background-image: url('~@/assets/share-3.png');
        }
        &.share-4 {
            background-image: url('~@/assets/share-4.png');
        }
        &.share-5 {
            background-image: url('~@/assets/share-5.png');
        }
        &.share-6 {
            background-image: url('~@/assets/share-6.png');
        }
        &.share-7 {
            background-image: url('~@/assets/share-7.png');
        }
    }
    .social {
        display: flex;
        justify-content: center;
        align-items: center;

        @media (min-width: 880px) {
            flex-direction: row;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        @media (min-width: 401px) and (max-width: 879px) {
            flex-direction: column;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        @media (max-width: 400px) {
            display: block;
        }

        a {
            cursor: pointer;
            background: #FFFFFF;
            border: 5px solid #000000;
            border-radius: 90.5px;
            color: #000000;
            text-align: center;
            text-decoration: none;

            @media (min-width: 880px) {
                height: 100px;
                font-size: 70px;
                line-height: 100px;
                padding: 0 20px;

                &:nth-child(2) {
                    margin-left: 12px;
                }

                &:nth-child(3) {
                    margin-left: 12px;
                }
            }
            @media (min-width: 768px) and (max-width: 1199px) {
                height: 100px;
                font-size: 70px;
                line-height: 100px;
            }
            @media (min-width: 401px) and (max-width: 879px) {
                width: 100%;
                margin-bottom: 11px;
                padding: 0 15px;
                margin-left: 0;
            }
            @media (min-width: 401px) and (max-width: 767px) {
                height: 50px;
                font-size: 25px;
                line-height: 50px;
                border: 2px solid #000000;
            }
            @media (max-width: 400px) {
                display: block;
                margin-bottom: 5px;
                width: 100%;
                height: 50px;
                font-size: 25px;
                line-height: 50px;
                border: 2px solid #000000;
            }
        }
    }
</style>