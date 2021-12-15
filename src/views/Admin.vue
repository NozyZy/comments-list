<template>
  <div class="container">
    <div v-for="user in userList" :key="user._id" class="user-list-item">
      <Usercard :currentUser="user" @update="update"/>
    </div>
  </div>
</template>

<script>
import datas from '@/assets/datas.js'
import Usercard from '@/components/UserCard.vue'

export default {
  name: "Admin",
  components: {
    Usercard,
  },
  async created() {
    this.userList = await datas.getUsers();
  },
  data() {
    return {
      userList: [],
    }
  },
  methods: {
    async update(id) {
      const before = this.userList.find(user => user.id === id).role;
      while (before === this.userList.find(user => user.id === id).role) {
        this.userList = await datas.getUsers();
      }
      this.$forceUpdate();
    }
  }

}
</script>

<style scoped>
.user-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50%;
  max-width: 85%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 15px;
  padding: 15px;
}

@media (max-width: 1050px) {
  .user-list-item {
    min-width: 75%;
  }
}

@media (max-width: 540px) {
  .user-list-item {
    width: 85%;
  }
}

</style>
