import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

// Vue.config.productionTip = false
let data = {
  items: mock,
  currentID: 0,
  comments: [],
  getComments() {
   return this.comments;
 },
  addComment(name, message) {
    this.comments.push({
      id: this.currentID,
      name: name,
      message: message,
      today: new Date().toLocaleString()
    });
    this.currentID += 1;
  },
  deleteComment(id){
    this.comments.splice(0, id);
  }
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
