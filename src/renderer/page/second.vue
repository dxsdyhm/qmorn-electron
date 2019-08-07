<template>
  <div class="container-fluid">
    <div class="input-group my-3">
      <input
        type="text"
        class="form-control"
        placeholder="书名或者ISBN"
        v-model="keywords"
        @keyup.enter="search"
      />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2" @click="search">
          <i class="material-icons">search</i>
        </span>
      </div>
    </div>
    <div class="list-group">
      <div class="list-group-item list-group-item-action" v-for="book in booklist" v-bind:key="book.id">
        <div class="row">
          <div class="col-sm-3">
            <img class="rounded covel" :src="book.coverUrl" alt="Card image cap" />
          </div>
          <div class="col-sm">
            <div class="card-body">
              <h5 class="card-title">{{ book.name }}</h5>
              <p class="card-text">{{ book.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'second',
  data () {
    return {
      keywords: '',
      booklist: []
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    search () {
      this.$http({
        method: 'post',
        url: 'https://dev.oss.qmorn.com/qmorn/oss/app/res/book/search',
        data: {
          key: this.keywords
        },
        headers: {
          'content-type': 'application/json',
          token: 'C5D9921FD458477CBEF5F6484DBBEC6D'
        }
      })
        .then(response => {
          this.booklist = response.data.bookList
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.covel{
  width: 180px;
}
</style>