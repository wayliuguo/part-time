<template>
    <div class="followingDetail">
        <Retreat />
        <div class="following-title">我的关注</div>
        <div v-if="following.length === 0">
            <van-empty description="您还没有关注任何用户，赶紧去关注吧！" />
        </div>
        <div class ="following-content" v-else
          v-for="item of following" :key="item._id">
            <div class="user-img"
                :style="'background-image:url(' + item.avatar_url + ')'">
            </div>
            <div class="user-name">
                <van-icon name="user-o" />
                {{item.name}}
            </div>
            <!-- <div class="user-mail">
                <van-icon name="comment-o" />
                123456
            </div> -->
            <div class="user-detail" @click="userDetails(item._id)">
                <van-icon size=".6rem" name="arrow" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'followingDetail',
  data () {
    return {
      following: []
    }
  },
  methods: {
    async init (userId) {
      await this.$http({
        method: 'get',
        url: `/users/${userId}/following`
      }).then(res => {
        console.log(res)
        this.following = res.data
      }).catch(err => {
        console.log(err)
        this.$toast.fail('发生错误，请重试')
      })
    },
    async userDetails (userId) {
      await this.$router.push({
        path: 'userDetail',
        query: {
          userId: userId
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
.following-title {
    width: 100%;
    text-align: center;
    font-size: .35rem;
    font-weight: 500;
}
.following-content {
    position: relative;
    width: 90%;
    margin: .1rem auto;
    padding: .2rem;
    height: 1.5rem;
    border-radius: .12rem;
    background: #e9ecef;
    .user-img {
    position: absolute;
    width: 1rem;
    height: 1rem;
    margin-top: 0.25rem;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .user-name {
    position: absolute;
    left: 1.5rem;
    top: .75rem;
  }
  .user-mail {
    position: absolute;
    left: 1.5rem;
    top: 1rem;
  }
  .user-detail {
    position: absolute;
    right: 1rem;
    top: .7rem;
  }
}
</style>
