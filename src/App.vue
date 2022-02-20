<template>
  <Navbar/>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "app",
  components: {
    Navbar
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://wallpaperaccess.com/full/342303.png") fixed no-repeat;
  min-height: 100vh;
  margin: 0;
}

button {
  padding: 5px;
  background-color: orange;
  border: none;
  border-radius: 16px;
  width: 125px;
  min-height: 30px;
}

button:hover {
  cursor: pointer;
}

button:active {
  background-color: darkorange;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
}

input, textarea {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px;
  color: white;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

a {
  color: orange;
  text-decoration: none;
}

.glass {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px;
  color: white;
}

</style>
