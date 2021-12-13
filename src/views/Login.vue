<template>
  <div id="Formbody">
    <form id="loginForm">
      <input type="email" placeholder="Your email address" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <p class="inputMsg" v-if="!correct">Incorrect password</p>
      <button type="submit" @click.prevent="loginFunction">Login</button>
    </form>
    <p v-if="loggedin">Successfully logged in !</p>
    <p>Do not have an account yet?
      <router-link to="/register">Click here</router-link>
    </p>
  </div>
</template>

<script>
import datas from "../assets/datas";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      correct: true,
      loggedin: false,
    }
  },
  methods: {
    loginFunction() {
      if (this.password.length < 2) {
        this.correct = false;
      } else {
        const creds = {
          email: this.email,
          password: this.password
        }
        datas.login(creds).then(res => this.loggedin = res.status === 200)
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped>
#Formbody {
  margin-top: 50px;
  height: 50vh;
}

#loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#loginForm input {
  width: 250px;
  margin-top: 15px
}

#loginForm button {
  margin-top: 15px;
}

p {
  font-size: 12px;
}

.inputMsg {
  color: red;
}
</style>
