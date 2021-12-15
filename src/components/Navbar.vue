<template>
  <div v-if="userName !== 'Unspecified'">
    <h3>Welcome, <span :class="userRole.includes('admin') ? 'admin' : 'user'">{{userName}}</span> !</h3>
    <h3 v-if="userRole === 'ban'" id="ban">You have been banned. Your actions are now restricted.</h3>
  </div>
  <div id="nav">
    <router-link to="/CommentList">Comment List</router-link>
    |
    <router-link to="/AddComment">Add Comment</router-link>
    |
    <button v-if="userRole !== 'disconnected'" id="userConnectionButton" @click="logOutFunction()">Logout</button>
    <div v-else>
      <router-link to="/Login">Login</router-link>|
      <router-link to="/Register">Register</router-link>
    </div>
    <div v-if="userRole.includes('admin')">
      |<router-link to="/Admin" class="admin">Admin-vue</router-link>
    </div>

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

#ban {
  color: crimson;
  font-style: italic;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

h3 {
  padding: 5px;
  margin: 0;
}

#userConnectionButton {
  background-color: unset;
  font-size: 17px;
  width: fit-content;
  height: fit-content;
  text-align: center;
  padding: 0 0 10px;
}


</style>
