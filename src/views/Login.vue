<template>
  <div id="Formbody">
    <h4></h4>
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
import datas from "@/assets/datas";

export default {
  name: "Login",
  created(){
    if(datas.isAuthenticated()){
      this.$router.push("/CommentList");
    }
  },
  data() {
    return {
      email: '',
      password: '',
      correct: true,
      loggedin: false,
      done: false
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
        datas.login(creds)
            .then(() => this.loggedin = datas.getUserDetails() && datas.getUserDetails().role)
            .then(() => {
              console.log(this.loggedin)
              console.log(datas.getUserDetails());

              if (this.loggedin) {
                this.correct = true;
                this.$forceUpdate();
                window.location.reload();
              } else {
                this.password = ''
                this.correct = false
              }
            })
            .catch(() => {
              this.password = ''
              this.correct = false
            })


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
