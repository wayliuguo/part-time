<template>
  <div class="home">
    <navigation />
    <div class="home-search">
      <van-cell-group>
        <van-field
          v-model="searchContent"
          placeholder="搜职位类别/城市"
        />
        <van-icon name="search"
          class="search-icon"
          size=".5rem"
          @click="search()"/>
      </van-cell-group>
      <van-tabs animated swipeable>
        <van-tab v-for="index in hotCity" :title="index.title" :key="index.key">
          <div v-for="item of positions" :key="item._id">
            <div v-if="item.location === index.title"
              class="job-detail"
              @click="jobDetails(item._id)">
              <div class="job-top">
                <div class="job-title">{{item.title}}</div>
                <div class="job-salary">{{item.salary}}</div>
              </div>
              <div class="job-description">描述: {{item.description}}</div>
              <div class="job-publisher">
                <div class="publisher-img" :style="'background-image:url('+item.publisher.avatar_url+')'"></div>
                <div class="publisher-name">{{item.publisher.name}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="position-publishing" @click="publishing()">
        <van-icon size=".5rem" name="plus" />
        <div>发布</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  name: 'home',
  data () {
    return {
      searchContent: '',
      // 热门城市
      hotCity: [
        { title: '北京', key: 0 },
        { title: '上海', key: 1 },
        { title: '广州', key: 2 },
        { title: '深圳', key: 3 },
        { title: '杭州', key: 4 },
        { title: '成都', key: 5 },
        { title: '南京', key: 6 }
      ],
      positions: []
    }
  },
  methods: {
    search () {
      if (this.searchContent.length > 0) {
        this.$router.push({
          path: 'searchDetail',
          query: {
            q: this.searchContent
          }
        })
      } else {
        this.$toast.fail('请输入搜索内容')
      }
    },
    jobDetails (id) {
      this.$router.push({
        path: 'jobDetail',
        query: {
          id: id
        }
      })
    },
    publishing () {
      this.$router.push({
        path: 'publishing'
      })
    }
  },
  components: {
    Navigation
  },
  created () {
    this.$http({
      method: 'get',
      url: '/positions'
    }).then(res => {
      console.log(res)
      this.positions = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  position: absolute;
  right: .2rem;
  top: .2rem;
}
.job-detail {
  margin-bottom: 24px;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;
  .job-title {
    font-size: .35rem;
    font-weight: 500;
  }
  .job-salary {
    color: red;
  }
  .publisher-img {
    width:1rem;
    height:1rem;
    margin: .5rem 0;
    background-size:cover;
    background-repeat: no-repeat;
    background-position: top center ;
  }
  .publisher-name {
    margin-left: 1.5rem;
    margin-top: -1rem;
  }
}
.position-publishing {
  position: fixed;
  top: 5rem;
  right: .5rem;
}
.van-icon-plus::before {
  color: red;
  border: 1px solid red;
  border-radius: .5rem;
}
</style>
