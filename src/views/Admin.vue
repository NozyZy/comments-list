<template>
  <div class="container">
    <div v-for="user in userList" :key="user" class="user-list-item">
      <Usercard :user="user" @banUser="banUserFunction"/>
    </div>
  </div>
</template>

<script>
import datas from '@/assets/datas.js'
import Usercard from '@/components/UserCard.vue'

export default {
  name: "Admin",
  async created(){
    this.userList = await datas.getUsers();
  },
  data(){
    return{
      userList: [],
    }
  },
  components:{
    Usercard,
  },
  methods:{
    banUserFunction(){
      console.log("caca");
      const user = {
        email: datas.getUserDetails.fullName,
        role: 'ban'
      }
      datas.updateUser(user)
    }
  }
}
</script>

<style scoped>
.user-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  padding: 0;
  background: rgba(255, 255, 255, 0.20);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 15px;
  padding: 15px;
}
</style>
