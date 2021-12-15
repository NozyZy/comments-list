<template>
  <div v-if="userRole !== 'ban'" class="container">
    <form v-on:submit.prevent="onSubmit">
      <div class="formItem">
        <label for="author">Author's name</label>
        <input type="text" name="author" id="author" placeholder="Name" minlength="1" maxlength="25" v-model="newComment.name" required>
      </div>
      <div class="formItem">
        <label for="title">Comment's title</label>
        <input type="text" name="title" id="title" placeholder="Title" minlength="1" maxlength="40" v-model="newComment.title" required>
      </div>
      <div class="formItem">
        <label>Comment</label>
        <textarea id="description" v-model="newComment.description"></textarea>
      </div>
      <button type="submit">Add Comment</button>
    </form>
    <div v-if="submitted" class="newComment">
      <h2>You comment has been added !</h2>
      <Comment :comment="newComment" />
    </div>
  </div>
  <div v-else>
    <h1> You have been banned, and cannot add comments.</h1>
  </div>
</template>

<script>
import datas from "@/assets/datas";
import Comment from "@/components/Comment";

export default {
  components: { Comment },
  name: "AddComment",
  data() {
    return {
      newComment: {
        name: '',
        title: '',
        description: '',
      },
      submitted: false,
    }
  },
  methods: {
    onSubmit() {
      datas.create(this.newComment);
      this.submitted = true;
    }
  }
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 75%;
  margin-top: 50px
}

form > * {
  width: 75%;
  margin-top: 25px;
}

.formItem {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.formItem > label {
  flex-basis: 25%;
}

.formItem > input, textarea {
  flex-basis: 70%;
  height: 35px
}

#description {
  height: 150px;
}

.newComment {
  width: 85%;
  margin-top: 25px;
}

.newComment > h2 {
  color: white;
}

@media (max-width: 900px) {
  form {
    width: 85%
  }

  form > * {
    width: 85%;
  }
}

@media (max-width: 700px) {
  .formItem {
    flex-direction: column;
    width: 100%;
  }

  .formItem > * {
    flex-basis: initial;
    width: 85%;
  }
}

</style>
