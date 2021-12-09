<template>
 <div id="comment">
   <div id="infos">
     <h1 id="title">{{comment.title}}</h1>
     <h2 id="author-name">by {{comment.name}}</h2>
     <div id="buttons">
       <button type="button" @click="toggleHidden()">{{hidden ? 'Show' : 'Hide'}} description</button>
       <button type="button" @click="remove">Delete</button>
     </div>
   </div>
   <div id="description">
     <p v-if="!hidden">{{comment.description}}</p>
   </div>

 </div>
</template>

<script>
import datas from "@/assets/datas";

export default {
  name: "Comment",
  data() {
    return {
      hidden: this.comment.hidden,
    }
  },
  props: {
    comment: Object,
  },
  methods: {
    toggleHidden() {
      this.hidden = !this.hidden;
      datas.toggleHidden(this.comment.id, this.hidden);
    },
    remove() {
      this.$emit('remove_comment', this.comment.id);
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
  background: rgba(255, 255, 255, 0.20);
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
}

#description {
  padding: 15px;
  flex-basis: 75%;
  font-size: 1.2em;
  text-align: justify;
}

@media (max-width: 1200px) {
  #buttons {
    flex-direction: column;
    align-items: center;
  }

  button {
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
}

</style>
