<template>
  <div class="publishing">
      <Retreat />
      <div class="publishing-text">职位发布</div>
      <div class="publishing-content">
          <van-cell-group>
            <van-field v-model="title" label="工作名" placeholder="请输入工作名" />
            <van-field v-model="location" label="城 市" placeholder="请输入城市" />
            <van-field v-model="salary" label="薪 酬" placeholder="请输入薪酬" />
            <van-field v-model="category" label="类 别" placeholder="请输入工作类别" />
            <van-field v-model="place" label="工作地点" placeholder="请输入工作地点" />
            <van-field
                v-model="description"
                rows="2"
                autosize
                label="描 述"
                type="textarea"
                maxlength="50"
                placeholder="请输入描述"
                show-word-limit
            />
          </van-cell-group>
      </div>
      <div class="publishing-buttom">
          <van-button size="large" type="info"
           @click="publishing()"
          >发  布
          </van-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'publishing',
  data () {
    return {
      title: '',
      location: '',
      salary: '',
      category: '',
      place: '',
      description: ''
    }
  },
  methods: {
    publishing () {
      if (this.title.length < 2) {
        this.$toast.fail('工作名长度不能小于2')
        return
      }
      if (this.location.length < 2) {
        this.$toast.fail('城市长度不能小于2')
        return
      }
      if (this.salary.length < 2) {
        this.$toast.fail('薪酬长度不能小于2')
        return
      }
      if (this.category.length < 2) {
        this.$toast.fail('类别长度不能小于2')
        return
      }
      if (this.place.length < 2) {
        this.$toast.fail('类别长度不能小于2')
        return
      }
      if (this.description.length < 10) {
        this.$toast.fail('描述长度不能小于10')
        return
      }
      const positionData = {
        'title': this.title,
        'location': this.location,
        'salary': this.salary,
        'category': this.category,
        'place': this.place,
        'description': this.description
      }
      this.$authHttp({
        method: 'post',
        url: 'positions',
        data: positionData
      }).then(res => {
        console.log(res)
        this.$toast.success('发布成功')
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
        this.$toast.fail('发布失败')
      })
    }
  },
  components: {
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.publishing-text {
    text-align: center;
    font-size: .35rem;
    font-weight: 500;
}
.publishing-content {
    width: 99%;
    height: 5rem;
    margin: 1rem auto;
}
</style>
