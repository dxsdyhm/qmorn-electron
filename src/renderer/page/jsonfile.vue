<template>
  <div class="container-fluid">
    <br>
    <b-form-file
      accept="text/*"
      v-model="filepath"
      :state="Boolean(file)"
      placeholder="选择文件或者拖放文件到此..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="row no-gutters justify-content-between">
    <div class="col">
    <div class="my-2">源文件</div>
     <div ref="file" class="left"></div>
    </div>
    <div class="col-1 align-items-start px-5 mt-5">
    <div class="btn btn-primary btn-block my-1" @click="reset()">></div>
     <div class="btn btn-primary btn-block my-1" @click="save()"><</div>
    </div>
    <div class="col">
    <div class="my-2">修改</div>
     <div ref="jsoneditor" ></div>
    </div>
  </div>
    
    
  </div>
</template>

<script>
const fs = require('fs')
export default {
  name: 'jsonfile',
  data () {
    return {
      filepath: 'file name',
      editer: null,
      fileEditer: null
    }
  },
  mounted () {
    let options = {
      mode: 'tree',
      indentation: 2,
      search: true
    }
    this.editer = new this.$jsoneditor(this.$refs.jsoneditor, options)
    let optionsfile = {
      mode: 'code',
      indentation: 2,
      search: true
    }
    this.fileEditer = new this.$jsoneditor(this.$refs.file, optionsfile)
  },
  watch: {
    filepath (file) {
      this.readfile(file)
    }
  },
  methods: {
    update (str) {
      if (str) {
        this.editer.set(str)
        this.fileEditer.set(str)
      } else {
        alert('文件读取失败')
      }
    },
    save () {
      let result = this.editer.get()
      fs.writeFile(this.filepath.path, JSON.stringify(result), 'utf8', err => {
        if (err) {
          alert('写入文件失败')
          throw err
        }
        this.reset()
      })
    },
    reset () {
      this.readfile(this.filepath)
    },
    readfile (file) {
      try {
        let result = JSON.parse(fs.readFileSync(file.path))
        this.editer.set(result)
        this.fileEditer.set(result)
      } catch (e) {
        alert('文件读取失败')
      }
    }
  }
}
</script>

<style>
.left{
  width:100%;
  height: 100vh;
}
</style>