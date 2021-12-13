<template>
  <div id="Formbody">
    <form id="registerForm">
      <input type="text" placeholder="Your name" v-model="identifier">
      <input type="email" placeholder="Your email address" v-model="email">
      <input type="password" placeholder="Password" v-model="password1">
      <p class="inputMsg" v-if="!correct1">Incorrect password. At least 8 characters are required.</p>
      <input type="password" placeholder="Confirm Password" v-model="password2">
      <p class="inputMsg" v-if="!correct2">Passwords does not match</p>
      <button type="submit" @click.prevent="registerFunction">Register</button>
    </form>
    <p>Already have an account?
      <router-link to="/login">Click here</router-link>
    </p>
  </div>
</template>

<script>
import datas from "../assets/datas";

export default {
  name: "Register",
  data() {
    return {
      identifier: '',
      email: '',
      password1: '',
      password2: '',
      correct1: true,
      correct2: true,
    }
  },
  methods: {
    registerFunction() {
      if (this.password1.length < 2) {
        this.correct1 = false;
      }
      if (this.password2 !== this.password1) {
        this.correct2 = false;
      }
      if (this.correct1 && this.correct2) {
        this.correct1 = true;
        this.correct2 = true;
        const newUser = {
          fullName: this.identifier,
          email: this.email,
          password: this.password1,
          role: 'user',
        }
        datas.register(newUser)
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

#registerForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#registerForm input {
  width: 250px;
  margin-top: 15px
}

#registerForm button {
  margin-top: 15px;
}

p {
  font-size: 12px;
}

.inputMsg {
  color: red;
}
</style>
