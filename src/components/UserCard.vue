<template>
  <div class="userCard">
    <div class="informations">
      <p>User's Name : {{user.fullName}}</p>
      <p>Email : {{user.email}}</p>
      <p>Role : {{user.role}}</p>
    </div>
    <button v-if="user.role != 'admin'">Ban User</button>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: Object,
  }
}
</script>

<style scoped>
.userCard{
  display: flex;
}

.informations{
  text-align:left;
}


</style>
