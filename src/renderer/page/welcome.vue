<template>
  <div class="container">
    <div class="row align-items-center mh-100 mt-5">
      <div class="col mt-5">
        <img src="~@/assets/logo.svg" class="img-responsive logo mx-auto d-block" alt="logo" />
        <div class="text-center my-3">启萌星桌面软件</div>
        <button type="button" class="btn btn-outline-success btn-block" @click="roauterTest()">开始</button>
        <button type="button" class="btn btn-outline-success btn-block" @click="jsonfile()">Json编辑</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    roauterTest () {
      this.$router.replace('/second')
    },
    jsonfile () {
      this.$router.replace('/jsonfile')
    }
  }
}
</script>
<style>
.logo {
  width: 100px;
}
</style>