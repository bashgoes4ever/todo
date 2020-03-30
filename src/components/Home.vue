<template>
  <div class="container">
    <h1>Todo lists</h1>
    <div class="block1">

      <div class="block1__alert" v-if="items.length == 0">
        <div class="title">Еще не создано ни одного списка</div>
      </div>
      <div class="block1__item" v-else v-for="(item, i) in items" :key="i">
        <h3>{{item.title}}</h3>
        <ul>
          <li v-for="(li, j) in item.items" :key="j" v-if="j < 3">
            <font-awesome-icon v-if="li.status == 1" icon="check"/>
            <font-awesome-icon v-else icon="times"/>
            {{li.text}}
          </li>
          <li v-if="item.items.length > 3">...еще {{item.items.length - 3}}</li>
        </ul>
        <router-link :to="`/edit/${item.id}`" class="edit-btn">
          <font-awesome-icon icon="edit"/>
        </router-link>
        <div @click="deleteList(item.id)" class="delete-btn">
          <font-awesome-icon icon="trash-alt"/>
        </div>
      </div>

      <router-link class="block1__add" to="/add">
        <font-awesome-icon icon="plus"/>
        <div class="title">Добавить список</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data: () => ({
      items: []
    }),
    created: function () {
      if (localStorage.todo_data) {
        this.items = JSON.parse(localStorage.todo_data)
      }
    },
    methods: {
      deleteList(id) {
        //открываем диалоговое окно
        var that = this
        this.$parent.showDialog('Удалить список?')
        //если пользователь соглашается с внесением изменений, то удаляем список
        document.querySelector('.popup-accept').onclick = function () {
          var ls_data = JSON.parse(localStorage.todo_data)
          var index = ls_data.findIndex(x => x.id == id)
          ls_data.splice(index, 1)
          that.items.splice(index, 1)
          localStorage.todo_data = JSON.stringify(ls_data)
          that.$parent.showAlert('Список удален')
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 34px;
  }

  .block1 {
    margin-top: 50px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: calc(100% + 85px);
  }

  .block1__item {
    display: block;
    width: 300px;
    height: 200px;
    padding: 0 20px;
    border: 1px solid rgba(0, 0, 0, .3);
    margin-right: 85px;
    margin-bottom: 85px;
    text-align: left;
    cursor: pointer;
    transition: all .3s;
    position: relative;
  }

  h3 {
    font-size: 22px;
    transition: all .3s;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    opacity: .8;
    margin-bottom: 5px;
  }

  .block1__add {
    display: block;
    width: 300px;
    height: 200px;
    border: 1px solid rgba(0, 0, 0, .3);
    padding-top: 65px;
    cursor: pointer;
    transition: all .3s;
  }

  .block1__alert {
    width: 300px;
    margin-right: 85px;
    position: relative;
    height: 200px;
  }

  .block1__alert .title {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    font-size: 26px;
  }

  .block1__add svg {
    font-size: 30px;
    margin-bottom: 10px;
    transition: all .3s;
  }

  .block1__add .title {
    font-size: 18px;
    transition: all .3s;
  }

  .block1__add:hover {
    background-color: #15d7d7;
  }

  .block1__item:hover {
    border-color: #15d7d7;
  }

  .block1__add:hover svg, .block1__add:hover .title {
    color: #ffffff;
  }

  .block1__item:hover h3 {
    color: #15d7d7;
  }

  .edit-btn, .delete-btn {
    font-size: 32px;
    transition: all .3s;
    position: absolute;
    bottom: 12px;
    opacity: 0;
    color: #777777;
  }

  .edit-btn {
    right: 60px;
  }

  .delete-btn {
    right: 20px;
  }

  .block1__item:hover .edit-btn, .block1__item:hover .delete-btn {
    opacity: 1;
  }

  .edit-btn:hover, .delete-btn:hover {
    color: #15d7d7;
  }
</style>
