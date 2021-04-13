<template>
<div>
  <div class='main-container'>
    <div id="conversations">
    <button v-for="conversation in conversations" :key="conversation._id" @click="selectconversation(conversation)">{{conversation.name}}</button>
  </div>

  <!-- <div class="ararar" v-for="conversation in conversations" :key="conversation.id">
    <p>Arg name: {{conversation.name}}</p>
  </div> -->

    <h2>Enter your conversation here</h2>
    <form @submit.prevent="addComment">
      <input v-model="name" placeholder="Name">
      <p></p>
      <textarea v-model="message"></textarea>
      <br />
      <button class='submit' type="submit">Submit</button>
  </form>



  <!-- <div class="tryingThis" v-for="conversation in conversations" :key="conversation.id">
    <p>{{conversation.name}}</p>
  </div> -->
  <!-- <div class="todoComments" v-if="conversation">
    <p>conversation Works</p>
    <p>ppppppp{{}}</p>
  </div> -->

    <div v-for="comment in comments" v-bind:key="comment.id">
      <div class="comment">
        <div class="message">
          <p>{{comment.message}}</p>
          <p><i>-- {{comment.userName}} on {{comment.today}}</i></p>
          <form @submit.prevent="deleteComment">
            <button class='edit-delete' @click="deleteComment(comment)">DELETE COMMENT</button>
          </form>
          <form @submit.prevent="editComment">
            <button class='edit-delete' @click="editComment(comment)">EDIT COMMENT</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'testimony',
  data() {
    return {
      conversations: [],

      name: '',
      comments: [],
      userName: '',
      message: '',
      today: '',
    }
  },
  created() {
    console.log("tryna call");
    this.getconversations();
    console.log("after tried call");
  },
  methods: {
    async getconversations() {
      console.log("entering conversations");
      try {
        console.log("inside try");
        const response = await axios.get("/api/arguments");
        this.conversations = response.data;
        console.log(this.conversations);
        console.log("finishsed try");
      } catch (error) {
        console.log(error);
      }
    },
    selectconversation(conversation) {
      this.conversation = conversation;
      this.getComments();
    },
    async addComment() {
          try {
            await axios.post(`/api/arguments/6075c741fca33b59f015328e/comments`, {
              userName: this.name,
              message: this.message,
              date: this.today
            });
            this.name = "";
            this.message = "";
            this.today = "";
            this.getComments();
          } catch (error) {
            console.log(error);
          }
        },

        async getComments() {
          try {
            const response = await axios.get(`/api/arguments/${this.conversation._id}/comments`);
            this.comments = response.data;
          } catch (error) {
            console.log(error);
          }
        },


        async deleteComment(comment) {
          try {
            await axios.delete(`/api/arguments/${this.conversation._id}/comments/${comment._id}`);
            this.getComments();
          } catch (error) {
            console.log(error);
          }
        },
  }
}

</script>

<style scoped>

#conversations {
  margin-bottom: 20px;
}

.edit-delete {
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
