<template>
  <div id="Formbody">
    <form id="registerForm">
      <input type="text" placeholder="Your name" v-model="name">
      <input type="email" placeholder="Your email address" v-model="email">
      <input type="password" placeholder="Password" v-model="password1">
      <input type="password" placeholder="Confirm Password" v-model="password2">
      <div class="msg" id="error" v-if="errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div class="msg" id="confirm" v-if="confirm">
        <p>You have been sucessfully registered as {{ newUser.fullName }} !</p>
      </div>
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
      name: '',
      email: '',
      password1: '',
      password2: '',
      confirm: false,
      errors: [],
      emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)$/,
      passwordFormat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!#$%&'@<>£§;µ*+/=?^_`{|}~()-])/,
      newUser: {
        fullName: '',
        email: '',
        password: '',
        role: 'user',
      }
    }
  },
  methods: {
    registerFunction() {
      this.errors = [];
      if (!this.password1 || this.password1.length < 8) {
        this.errors.push('Password must contains at least 8 characters.');
      }
      if (this.password2 !== this.password1) {
        this.errors.push('Passwords don\'t match.');
      }
      if (!this.email || (!this.email.match(this.emailFormat) || this.email.length > 30)) {
        this.errors.push('Enter a real email.')
      }
      if (!this.password1.match(this.passwordFormat)) {
        this.errors.push('Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number.')
      }
      if (!this.name || this.name.length < 3) {
        this.errors.push('Your name must contains at least 2 characters.')
      }
      if (!this.errors.length) {
        this.newUser.fullName = this.name
        this.newUser.email = this.email.toLowerCase()
        this.newUser.password = this.password1

        datas.register(this.newUser)
            .then(res => this.confirm = res.status === 200)
            .then(() => {
              if (this.confirm) {
                datas.login({
                  email: this.email,
                  password: this.password1
                });

                this.name = ''
                this.email = ''
                this.password1 = ''
                this.password2 = ''

                this.$forceUpdate();
                window.location.reload();
              }
            })
            .catch(() => {
              if (!this.confirm) {
                this.errors.push('This email is already taken !')
              } else {
                this.errors.push('Server error, contact an admin.')
              }
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
  font-size: 14px;
}

.msg {
  width: 75%;
}

#error {
  color: red;
}

#confirm {
  color: limegreen;
}

</style>
