<template>
  <div id="nav">
    <router-link to="/AddComment">Add Comment</router-link> |
    <router-link to="/CommentList">Comment List</router-link>
  </div>
  <router-view/>
</template>

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
  color: white;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://wallpaperaccess.com/full/342303.png") fixed no-repeat;
  min-height: 100vh;
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: darkgray;
}

#nav a.router-link-exact-active {
  color: orange;
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
  background: rgba(255, 255, 255, 0.2);
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

</style>
