<template>
    <div class="flex-container">
        <slot name="logo"></slot>
        <slot name="scramble"></slot>

        <div class="friends-container">
            <div class="spacer"></div>
            <div class="smileys-group" :class="zeroFriends ? 'sad': ''"></div>
            <div class="spacer"></div>
            <div class="friends-count" :class="animated ? 'animated' : ''" v-html="friendsCount == 0 ? 'Нисколько' : friendsCount"></div>
            <div class="smiley" :class="[animated ? 'animated' : '', zeroFriends ? 'sad' : '']"></div>
        </div>

        <div class="bottom-text text" key="text">Представьте, сколько сможете пригласить в следующем!</div>

        <a class="big-button" :href="inviteUrl" target="_blank">Пригласить друзей</a>
    </div>
</template>

<script>
export default {
    data () {
        return {
            animationCompleted: false,
            animated: false
        }
    },
    computed: {
        inviteUrl() {
            return this.$root.results.invite_link
        },

        friendsCount() {
            return this.formatNumber(this.$root.results.invited_friends)
        },

        zeroFriends() {
            return this.friendsCount == 0
        },
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('ru-RU').format(Math.round(number))
        },
        animate() {
            this.animated = true
        }, 
        reset() {
            this.animated = false
        }
    }
}
</script>

<style lang="scss">
    .friends-container {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        @media (min-width: 401px) and (max-width: 767px) {
            .spacer {
                flex-grow: 0;
            }
            .smileys-group {
                flex-grow: 1;
                max-height: 230px;                
                width: 100%;
                margin-top: 20px;
                margin-bottom: 20px;
                background-repeat: no-repeat;    
                background-size: contain;
                background-position: center;
                background-image: url('~@/assets/friends-group.png');
                &.sad {
                    min-height: 120px;
                    margin: 0;
                    background-size: contain;
                    background-image: url('~@/assets/no-friends.png');
                }
            }
        }
        @media (max-width: 400px) {
            display: block;
            .spacer {
                flex-grow: 0;
            }
            .smileys-group {
                flex-grow: 1;
                max-height: 230px;                
                min-height: 120px;                
                width: 100%;
                margin-top: 10px;
                margin-bottom: 10px;
                background-repeat: no-repeat;    
                background-size: contain;
                background-position: center;
                background-image: url('~@/assets/friends-group.png');
                &.sad {
                    min-height: 93px;
                    margin: 0;
                    background-size: contain;
                    background-image: url('~@/assets/no-friends.png');
                }
            }
        }
    }
    .friends-section {
        padding-left: 0;
        padding-right: 0;

        @media (max-width: 400px) {
            .fp-tableCell {
                vertical-align: top;
            }
            .flex-container {
                display: block;
                height: auto;
            }
        }

        .bottom-text {
            margin-right: 25px;
            margin-left: 25px;
        }

        .scramble-text {
            margin-left: 25px;
            margin-right: 25px;
        }

        .big-button {
            @media (min-width: 768px) {
                height: 111px;
                font-size: 60px;
            }
        }
    }
    .smiley {
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('~@/assets/friend.png');
        transform: translateX(-100%);
        &.sad {
            background-image: url('~@/assets/no-friends.png');
        }
        
        @media (min-width: 768px) {
            width: 250px;
            height: 250px;

            &.animated {
                animation: roll 1.5s linear both;
            }
        }
        @media (max-width: 767px) {
            display: none;
        }
    }
    @keyframes roll {
        0% { 
            transform: translateX(-100%) rotate(-360deg); 
        }
        100% { 
            transform: translateX(calc(100vw - 50px - 100%)) rotate(0deg); 
        }
    }
    .friends-count {
        color: #000000;
        line-height: 1;
        transform: translateX(calc(-100% - 25px));

        &.animated {
            animation: fadeInLeft .2s .6s linear both;
        }
        @keyframes fadeInLeft {
            to {
                transform: translate3d(0%, 0, 0);
            }
        }
        @media (min-width: 1820px) {
            position: absolute;
            left: 25px;
            bottom: 0;
            font-size: 200px;
        }
        @media (min-width: 1200px) and (max-width: 1820px) {
            position: absolute;
            left: 25px;
            bottom: 0;
            font-size: 130px;
        }
        @media (min-width: 768px) and (max-width: 1199px) {
            position: absolute;
            left: 25px;
            bottom: 0;
            font-size: 85px;
        }
        @media (min-width: 401px) and (max-width: 767px) {
            order: 1;
            padding: 0 25px;
            font-size: 60px;
            text-align: center;
        }
        @media (max-width: 400px) {
            order: 1;
            padding: 0 25px;
            font-size: 30px;
            margin-bottom: 10px;
            text-align: center;
        }
    }
    .big-button {
        display: block;
        margin-left: 25px;
        margin-right: 25px;
        background: #FFFFFF;
        border: 5px solid #000000;
        border-radius: 90.5px;
        color: #000000;
        text-align: center;
        cursor: pointer;
        @media (min-width: 768px) {
            height: 100px;
            font-size: 70px;
            line-height: 100px;
            border: 5px solid #000000;
            margin-top: 40px;
            margin-bottom: 40px;
        }
        @media (min-width: 401px) and (max-width: 767px) {
            height: 80px;
            font-size: 30px;
            line-height: 80px;
            border: 2px solid #000000;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        @media (max-width: 400px) {
            border: 2px solid #000000;
            margin-top: 20px;
            margin-bottom: 20px;
            height: 50px;
            font-size: 25px;
            line-height: 50px;
        }
    }
</style>