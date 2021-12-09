<template>
  <div v-if="comments" class="container">
    <form class="form" v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" id="searchForm">
      <label for="author">Search the author</label>
      <div id="search">
        <input type="text" name="author" id="author" placeholder="Search..." minlength="1" maxlength="25" v-model="searchName">
        <button type="submit">Search...</button>
        <button type="reset">Reset</button>
      </div>
    </form>
    <ul v-for="comment of comments" :key="comment.id" id="comment-list">
      <Comment :comment="comment" @remove_comment="remove_comment" @add_comment="add_comment" />
    </ul>
    <h1 v-if="comments.length === 0" >There is no comments ! Come add some <a href="/AddComment">here</a></h1>
  </div>
  <div v-else class="container">
    <h1>Loading...</h1>
  </div>
</template>


<script>
import datas from "@/assets/datas";
import Comment from "@/components/Comment";

export default {
  components: { Comment },
  name: "CommentList",
  async created() {
    this.comments = await datas.getAll();
  },
  data() {
    return {
      comments: '',
      searchName: '',
    }
  },
  methods: {
    async remove_comment(id) {
      const before = this.comments.length;
      datas.delete(id);
      while (before === this.comments.length) {
        this.comments = await datas.getAll();
      }
      this.$forceUpdate();
    },
    add_comment(newComment) {
      datas.create(newComment);
      this.$forceUpdate();
    },
    async onSubmit() {
      if (this.searchName === '') {
        this.comments = await datas.getAll()
      } else {
        this.comments = await  datas.find(this.searchName);
      }
      this.$forceUpdate();
    },
    async onReset() {
      this.comments = await datas.getAll()
      this.searchName = ""
    }
  },
}
</script>

<style scoped>

#searchForm {
  display: flex;
  flex-direction: column;
  width: 500px;
  color: white;
}

#search {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#search > * {
  margin: 5px;
}

label {
  margin-bottom: 5px;
}

button {
  width: 100px;
}

#author {
  flex-basis: 75%;
}

#comment-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  padding: 0;
}

@media (max-width: 750px) {
  #searchForm {
    width: 75%;
  }
}

</style>
