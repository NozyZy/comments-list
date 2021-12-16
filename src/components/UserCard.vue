<template>
  <div class="userCard">
    <div class="informations">
      <p>User's Name : {{currentUser.fullName}}</p>
      <p>Email : {{currentUser.email}}</p>
      <p>Role : {{currentUser.role}}</p>
      <p>Favs : {{currentUser.favs.length}}</p>
    </div>
    <div v-if="currentUser.fullName !== viewer.fullName" class="buttons">
      <button v-if="!currentUser.role.includes('admin')" @click="setRole('admin')">Set admin</button>
      <button v-if="currentUser.role === 'admin' && viewer.role === 'superadmin'" @click="setRole('user')">Remove admin</button>
      <button v-if="currentUser.role !== 'ban'" @click="setRole('ban')">Ban User</button>
      <button v-else @click="setRole('user')">Unban User</button>
    </div>
    <div v-else id="you">
      <h2>You</h2>
    </div>
  </div>
</template>

<script>
import datas from "@/assets/datas";

export default {
  name: "UserCard",
  props: {
    currentUser: Object,
  },
  data() {
    return {
      viewer: datas.getUserDetails()
    }
  },
  methods: {
    setRole(role) {
      const user = {
        email: this.currentUser.email,
        role: role
      }
      datas.updateUserRole(user);
      this.$emit('update', this.currentUser.id);
    },
  }
}
</script>

<style scoped>
.userCard {
  display: flex;
  flex-direction: row;
  align-items: space-evenly;
  justify-content: space-between;
  width: 75%;
}

.informations {
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#you {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: orange;
}

#you h2 {
  margin: 5px 0;
}

button, #you {
  width: 125px;
}

@media (max-width: 600px) {
  .userCard {
    flex-direction: column;
  }

  .informations {
    text-align: center;
  }

  .buttons {
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
    margin: 0 2px;
  }

  #you {
    align-self: center;
  }
}

@media (max-width: 375px) {
  .buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .buttons > * {
    margin: 5px;
  }
}


</style>
