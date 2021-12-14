<template>
  <h3 v-if="userName !== 'Unspecified'">
    Welcome, <span :class="userRole === 'admin' ? 'admin' : 'user' ">{{userName}}</span> !
  </h3>
  <div id="nav">
    <router-link to="/CommentList">Comment List</router-link>
    |
    <router-link to="/AddComment">Add Comment</router-link>
    |
    <div v-if="userRole==='user' || userRole==='admin'">
      <button id="userConnectionButton" @click="logOutFunction()">Logout</button>
      |
    </div>
    <div v-else>
      <router-link to="/Login">Login</router-link>|
      <router-link to="/Register">Register</router-link>|
    </div>
    <router-link v-if="userRole==='admin'" to="/Admin" class="admin">Admin-vue</router-link>
  </div>
</template>

<script>
import datas from '@/assets/datas.js'

export default {
  name: "Navbar",
  created() {
    if (datas.isAuthenticated()){
      this.userRole = datas.getUserDetails().role;
      this.userName = datas.getUserDetails().fullName;
    }
    else {
      this.userRole = 'disconnected';
      this.userName = 'Unspecified';
    }
  },
  data() {
    return {
      userRole: 'disconnected',
      userName: 'Unspecified',
    }
  },
  methods: {
    logOutFunction() {
      datas.logout();
      this.$router.push("/login");
      this.userRole = 'disconnected';
      this.userName = 'Unspecified';
    },
  },
}
</script>

<style scoped>
.admin {
  color: red;
  font-weight: bolder;
}

.user {
  color: orange;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content:center;
}

#nav a, #userConnectionButton, p {
  font-weight: bold;
  color: darkgray;
  margin-left: 10px;
  margin-right: 10px;
}

#nav a.router-link-exact-active, #userConnectionButton:active {
  color: orange;
}
h3{
  padding: 5px;
  margin: 0;
}

#userConnectionButton {
  background-color: unset;
  font-size: 17px;
  padding: unset;
  width: fit-content;
  height: fit-content;
  text-align: center;
  padding-bottom: 10px;
}
</style>
