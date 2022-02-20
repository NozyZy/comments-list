<template>
 <div id="comment">
   <div id="infos">
     <h1 id="title">{{comment.title}}</h1>
     <h2 id="author-name">by {{comment.name}}</h2>
     <div id="buttons" v-if="currentUser.role !== 'disconnected'">
       <button v-if="currentUser.role.includes('admin') || currentUser.fullName === this.comment.name" type="button" @click="toggleHidden">{{hidden ? 'Show' : 'Hide'}} description</button>
       <button v-if="currentUser.role.includes('admin') || currentUser.fullName === this.comment.name" type="button" @click="remove">Delete</button>
       <button type="button" id="button-ask-edit" @click="editing = !editing" v-if="(currentUser.role.includes('admin') || currentUser.fullName === this.comment.name) && !editing">Edit</button>
       <i class="far fa-star" v-if="!fav" @click="setFav(true)"></i>
       <i class="fas fa-star" v-else @click="setFav(false)"></i>
     </div>
   </div>
   <div id="description-edit" v-if="(currentUser.role.includes('admin') || currentUser.fullName === this.comment.name) && editing">
     <textarea name="description" id="text-edit" v-model="description"></textarea>
     <button type="button" id="button-edit" @click="updateComment()">Edit</button>
   </div>
   <div id="description" v-else>
     <p v-if="!hidden">{{description}}</p>
   </div>

 </div>
</template>

<script>
import datas from "@/assets/datas";

export default {
  name: "Comment",
  async created() {
    if (datas.isAuthenticated()) {
      this.currentUser = datas.getUserDetails();
      this.favs = this.currentUser.favs;
      for (let f of this.favs) {
        if (f === this.comment.id) this.fav = true;
      }
    } else {
      this.currentUser = {
        name: 'disconnected',
        role: 'disconnected'
      }
    }
    this.description = this.comment.description
  },
  data() {
    return {
      hidden: this.comment.hidden,
      currentUser: '',
      favs: [],
      fav: false,
      description: '',
      editing: false
    }
  },
  props: {
    comment: Object,
  },
  methods: {
    updateComment() {
      datas.updateComment(this.comment.id, this.hidden, this.description);
      this.editing = false;
    },
    toggleHidden() {
      this.hidden = !this.hidden;
      datas.updateComment(this.comment.id, this.hidden, this.description);
    },
    remove() {
      this.$emit('remove_comment', this.comment.id);
    },
    setFav(adding) {
      this.fav = adding;
      let temp = []
      this.favs = datas.getUserDetails().favs

      if (adding) {
        this.favs[this.favs.length] = this.comment.id;
      } else {
        for (let i = 0; i < this.favs.length; i++) {
          if (this.favs[i] !== this.comment.id && this.favs[i] !== '') {
            temp.push(this.favs[i]);
          }
        }
        this.favs = temp;
      }
      const user = {
        email: this.currentUser.email,
        favs: this.favs
      }
      datas.updateUserFav(user);
    }
  },
}
</script>

<style scoped>

#comment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

#infos {
  padding: 15px;
  flex-basis: 25%;
  height: 100%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  color: darkgray;
}

#buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#buttons > * {
  margin: 3px;
}

#description {
  padding: 15px;
  flex-basis: 75%;
  font-size: 1.2em;
  text-align: justify;
  display: flex;
  flex-direction: column;
}

i {
  cursor: pointer;
}

.fas {
  color: orange;
}

#description-edit {
  flex-basis: 75%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#description-edit > * {
  margin: 5px;
}

#text-edit {
  width: 95%;
  height: 175px;
}

#button-edit {
  align-self: flex-end;
}

@media (max-width: 1200px) {
  #buttons {
    flex-direction: column;
    align-items: center;
  }

  #buttons > * {
    margin: 5px;
    width: 100px;
  }
}

@media (max-width: 900px) {
  button {
    margin: 5px;
    width: 125px;
  }
}

@media (max-width: 750px) {
  #comment {
    flex-direction: column;
  }

  #infos {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  #buttons {
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
    width: 125px;
  }

  #description-edit {
    width: 85%;
  }
}

@media (max-width: 375px) {
  #buttons {
    flex-direction: column;
  }
}

</style>
