<template>
<div>
  <div class='main-container'>
    <h1>Sequels or Prequels?</h1>
    <h2>Enter your argument here</h2>
    <form @submit.prevent="addComment">
      <input v-model="name" placeholder="Name">
      <p></p>
      <textarea v-model="message"></textarea>
      <br />
      <button class='submit' type="submit">Submit</button>
  </form>
    <div v-for="comment in comments" v-bind:key="comment.id">
      <div class="comment">
        <div class="message">
          <p>{{comment.message}}</p>
          <p><i>-- {{comment.name}} on {{comment.today}}</i></p>
          <form @submit.prevent="deleteComment">
            <button class='delete' @click="deleteComment(comment)">DELETE COMMENT</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'testimony',
  data() {
    return {
      name: '',
      message: '',
    }
  },
  computed: {
    comments() {
      return this.$root.$data.getComments();
    }
  },
  methods: {
    addComment() {
      this.$root.$data.addComment(this.name, this.message);
      this.name = "";
      this.message = "";
    },
    deleteComment(comment) {
      for(let i = 0; i < this.$root.$data.comments.length; i++) {
        if (this.$root.$data.comments[i].id == comment.id) {
          this.$root.$data.comments.splice(i, 1);
        }
      }
    }
  }
}

</script>

<style scoped>

.delete {
  margin: 0px;
  height: 20px;
  font-size: 8px;
}

p {
  margin-bottom: 5px;
}

input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

.main-container {
  color: black;
}

h2 {
  font-size: 0.8em;
}

.message {
  width: 70%;
}

.comment {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

.submit {
  margin-bottom: 20px;
}
button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
