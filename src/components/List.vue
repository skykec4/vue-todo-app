<template>
    <div class="todoList">
        <ul>
            <li class="list" v-bind:key="list.key" v-for="list in listdata">
              <i v-bind:class="list.completed ? 'fas fa-smile-beam fa-lg' : 'fas fa-meh fa-lg'" v-on:click="todoComplete(list.title, list.completed)"></i>
              <input ref="input_box" v-bind:class="list.completed ? 'list-title completed' : 'list-title'" v-bind:value="list.title" v-bind:disabled="list.updateStatus" v-on:keydown.enter="updateTodoComplete(list.title, list.updateStatus)" >
                <i v-if="list.updateStatus ? '' : disabled='none'" class="fas fa-check" v-on:click="updateTodoComplete(list.title, list.updateStatus)"></i>
                <i v-if="list.updateStatus ? disabled='none':''" class="fas fa-pen-fancy" v-on:click="updateTodo(list.title, list.updateStatus)"></i>
                <i v-if="list.updateStatus ? disabled='none':''" class="fas fa-trash-alt" v-on:click="deleteTodo(list.title)"></i>
            </li>
        </ul>    
    </div>
</template>

<script>
export default {
  props: ["listdata"],
  data() {
    return {
      list_data: this.listdata
    };
  },
  methods: {
    deleteTodo: function(title) {
      this.$emit("deleteTodo", title);
    },
    updateTodo: function(title, updatStatus) {
      this.$emit("updateTodo", title, updatStatus);
    },
    updateTodoComplete(prevTitle, updatStatus) {
      var position = this.getPosition(prevTitle);
      this.$emit(
        "updateTodoComplete",
        prevTitle,
        this.$refs["input_box"][position].value,
        updatStatus
      );
    },
    todoComplete(title, completed) {
      this.$emit("todoComplete", title, completed);
    },
    getPosition(title) {
      return this.list_data
        .map(function(e) {
          return e.title;
        })
        .indexOf(title);
    }
  }
};
</script>

<style scoped>
.todoList {
  display: flex;
  width: 100%;
  display: inline-block;
  line-height: 1em;
  text-align: left;
}

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  line-height: 3rem;
  border-radius: 5px;
  padding-left: 1rem;
  margin-bottom: 10px;
  background-color: white;
  height: 4rem;
  box-shadow: 3px 3px 3px 1px #999;
}
i {
  padding: 5px;
}
.list-title {
  width: 90%;
  border: none;
  background-color: white;
  padding-left: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: unset;
}
.completed {
  text-decoration: line-through;
  color: #eaeaea;
}
.fa-check {
  color: green;
}
.fa-pen-fancy {
  color: #747474;
}
.fa-trash-alt {
  color: red;
}
.fa-meh {
  color: #ff0000;
}
.fa-smile-beam {
  color: #22741c;
}
</style>
