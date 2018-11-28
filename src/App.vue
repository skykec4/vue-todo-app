<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:AddTodoList="AddTodoList"></todo-input>
    <todo-list v-bind:listdata="todolist" 
               v-on:deleteTodo="deleteTodo" 
               v-on:updateTodo="updateTodo" 
               v-on:getPosition="getPosition" 
               v-on:todoComplete="todoComplete"
               v-on:updateTodoComplete="updateTodoComplete"></todo-list>
    <todo-footer v-on:clearTodoList="clearTodoList"></todo-footer>
  </div>
</template>

<script>
import header from "./components/Header.vue";
import input from "./components/Input.vue";
import list from "./components/List.vue";
import footer from "./components/Footer.vue";

export default {
  components: {
    "todo-header": header,
    "todo-input": input,
    "todo-list": list,
    "todo-footer": footer
  },
  data() {
    return {
      todolist: []
    };
  },
  methods: {
    AddTodoList: function(input_text) {
      if (!input_text) {
        alert("내용을 입력하세요!");
        return;
      }
      if (this.getPosition(input_text) > -1) {
        alert("중복되는 내용이 있어요!!");
        return;
      }
      var data = {
        title: input_text,
        updateStatus: true,
        completed: false
      };

      this.todolist.push(data);

      this.todolistSaved();
    },
    updateTodo: function(title, updateStatus) {
      var elpos = this.getPosition(title);

      if (!this.todolist[elpos].updateStatus) {
        this.todolist[elpos].title = title;
      }

      this.todolist[elpos].updateStatus = !this.todolist[elpos].updateStatus;
    },
    updateTodoComplete(prevTitle, updateTitle, updateStatus) {
      if (prevTitle != updateTitle && this.getPosition(updateTitle) > -1) {
        alert("중복되는 내용이 있어요!!");
      } else {
        var currPosition = this.getPosition(prevTitle);

        if (!this.todolist[currPosition].updateStatus) {
          this.todolist[currPosition].title = updateTitle;
        }

        this.todolist[currPosition].updateStatus = !this.todolist[currPosition]
          .updateStatus;
        this.todolistSaved();
      }
    },
    deleteTodo: function(title) {
      var elpos = this.getPosition(title);
      this.todolist.splice(elpos, 1);

      this.todolistSaved();
    },
    clearTodoList: function() {
      localStorage.clear();
      this.todolist = [];
    },
    todoComplete(title, completed) {
      var elpos = this.getPosition(title);
      this.todolist[elpos].completed = !this.todolist[elpos].completed;

      this.todolistSaved();
    },
    getPosition(title) {
      return this.todolist
        .map(function(e) {
          return e.title;
        })
        .indexOf(title);
    },
    todolistSaved() {
      localStorage.setItem("todo-list", JSON.stringify(this.todolist));
    }
  },
  created: function() {
    this.todolist = JSON.parse(localStorage.getItem("todo-list"));
    if (this.todolist == null) {
      this.todolist = [];
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: floralwhite;
}
#app {
  text-align: center;
  margin: 0 auto;
  width: 90%;
  font-size: 100%;
}
</style>
