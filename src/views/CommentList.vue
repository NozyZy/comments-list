<template>
  <div v-if="comments" class="container">
    <form class="form" v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" id="searchForm">
      <label for="author">Search the author</label>
      <div id="searchBox">
        <input type="text" name="author" id="author" placeholder="Search..." minlength="1" maxlength="25" v-model="searchName">
        <button type="submit" id="search" class="searchButton">Search</button>
        <button type="reset" id="reset" class="searchButton">Reset</button>
        <button type="button" id="favorites" class="searchButton" @click="showFavs">Favorites</button>
      </div>
    </form>
    <div v-if="comments === 'empty'">
      <h1 v-if="!name">There is no comments. Come add some <router-link to="/AddComment">here !</router-link></h1>
      <h1 v-else>There is no comments written by <span id="name">{{name}}</span>.</h1>
    </div>
    <ul v-else v-for="comment of comments" :key="comment.id" id="comment-list">
      <Comment :comment="comment" @remove_comment="remove_comment" @add_comment="add_comment"/>
    </ul>
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
      name: '',
      fav: false
    }
  },
  methods: {
    async remove_comment(id) {
      const before = this.comments.length;
      datas.updateUserFav({
        email: datas.getUserDetails().email,
        favs: datas.getUserDetails().favs.filter(e => e !== id)
      })
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
        this.comments = await datas.getAll();
      } else {
        this.comments = await datas.find(this.searchName.toLowerCase());
      }
      this.name = this.searchName;
      this.fav = false;
    },
    async onReset() {
      this.comments = await datas.getAll();
      this.searchName = '';
      this.name = '';
      this.fav = false;
    },
    async showFavs() {
      this.comments = await datas.getFavComms();
      this.fav = true;
    }
  },
}
</script>

<style scoped>

#searchForm {
  display: flex;
  flex-direction: column;
  width: 650px;
  color: white;
}

#searchBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#searchBox > * {
  margin: 5px;
  width: initial;
}

.searchButton {
  flex-grow: 1;
}

label {
  margin-bottom: 5px;
}

button {
  width: 100px;
}

#author {
  flex-grow: 3;
}

#comment-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  padding: 0;
}

#name {
  color: orange;
}

@media (max-width: 750px) {
  #searchForm {
    width: 75%;
  }

  #searchBox {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  #searchBox > * {
    flex-grow: unset;
  }

  #author {
    width: 100%;
  }

  .searchButton {
    width: 25% !important;
  }

  #search {
    order: 4;
  }

  #reset {
    order: 3;
  }

  #favorites {
    order: 2;
  }
}

</style>
