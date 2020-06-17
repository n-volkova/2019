<template>
    <div id="app">
        <!-- <router-view /> -->
        <client-page></client-page>
    </div>
</template>

<script>
    // function randomInteger(min, max) {
    //     let rand = min - 0.5 + Math.random() * (max - min + 1)
    //     return Math.round(rand)
    // }

    // window.SHARE_ID = randomInteger(1, 7)
    import ClientPage from './views/Client'
    export default {
        name: 'App',
        components: {
            'client-page': ClientPage
        }
    }
</script>

<style lang="scss">

@import '/styles/fonts.scss';
@import '/styles/main.scss';
@import '/styles/animations.scss';

#app {
    position: relative;
    background-color: #E6343A;
}
.section {
    padding: 0 25px;
}
.spacer {
    flex-grow: 1;
}
.logo {
    position: absolute;
    top: 18px;
    left: 25px;
    font-size: 26px;
    color: #fff;
    font-weight: 600;
    @media (max-width: 879px) {
        font-size: 22px;
    }
}
.rouble-sign {
    font-family: pragmatica-extended;
    font-weight: 300;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
