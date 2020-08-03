<template>
  <div class="warp">
    <router-view/>
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/the-one">The One</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.warp{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
    height: 100vh;

    & .nav{
        width: 100%;
    }
}
</style>
