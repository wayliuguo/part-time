<template>
    <div class="collectingDetail">
        <Retreat />
        <div class="collecting-title">我的收藏</div>
        <div v-if="collecting.length === 0">
          <van-empty description="您还没有收藏任何职位，赶紧去收藏吧！" />
      </div>
      <div v-else>
          <div class="publish-content"
              v-for="item of collecting"
              :key="item._id"
              @click="jobDetails(item._id)">
            <div class="position-title">{{item.title}}</div>
            <div class="position-location">
              <van-icon name="location-o"/>{{item.location}}
            </div>
            <div class="position-salary">{{item.salary}}</div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'collectingDetail',
  data () {
    return {
      collecting: []
    }
  },
  methods: {
    async init (userId) {
      await this.$http({
        method: 'get',
        url: `/users/${userId}/positionFollowing`
      }).then(res => {
        console.log(res)
        this.collecting = res.data
      }).catch(err => {
        console.log(err)
        this.$toast.fail('发生错误，请重试')
      })
    },
    jobDetails (id) {
      this.$router.push({
        path: 'jobDetail',
        query: {
          id: id
        }
      })
    }
  },
  created () {
    this.init(this.$route.query.userId)
  }
}
</script>

<style lang="less" scoped>
.collecting-title {
    width: 100%;
    text-align: center;
    font-size: .35rem;
    font-weight: 500;
}
.publish-content {
    position: relative;
    top: .3rem;
    height: 1.5rem;
    border-bottom: 0.01rem solid #fff;
    background: #e9ecef;
    border-radius: .2rem;
    .position-title {
      position: absolute;
      top: .2rem;
    }
    .position-location {
      position: absolute;
      bottom: .2rem;
    }
    .position-salary {
      position: absolute;
      top: .5rem;
      color: red;
      right: .2rem;
    }
}
</style>
