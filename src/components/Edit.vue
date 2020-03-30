<template>
  <div class="container">
    <h1>Редактировать список</h1>
    <form>
      <div @click="deleteList(list.id)" class="delete-btn">
        <font-awesome-icon icon="trash-alt"/>
      </div>
      <input type="text" @change="is_edited = true" v-model="list.title" placeholder="Название списка">
      <div class="title">Пункты:</div>
      <div class="input-block" @change="is_edited = true" v-for="(item, i) in list.items" :key="i">
        <input class='checkbox' type="checkbox" @change="is_edited = true" v-model="item.status" true-value="1"
               false-value="0">
        <input type="text" placeholder="Пункт" @change="is_edited = true" v-model="list.items[i].text">
        <font-awesome-icon class="remove-btn" icon="times" @click="removeItem(i)"/>
      </div>
      <div class="form__buttons">
        <button class="add-btn" @click.prevent="addItem">
          <font-awesome-icon icon="plus"/>
          Добавить пункт
        </button>
        <button class="create-btn" v-if="list.items.length > 0" @click.prevent="saveList">Сохранить изменения</button>
      </div>
    </form>
    <div @click="saveList" class="back">Вернуться на главную</div>
  </div>
</template>

<script>
  export default {
    name: "Edit",
    data: () => ({
      list: {},
      is_edited: false
    }),
    created: function () {
      this.list = JSON.parse(localStorage.todo_data).find(obj => {
        return obj.id == this.$route.params.id
      })
    },
    methods: {
      addItem() {
        this.list.items.push({
          text: '',
          status: 0
        })
      },
      removeItem(i) {
        this.list.items.splice(i, 1)
        this.is_edited = true
      },
      form_valid() {
        var alert_text = ''
        //проверяем, введен ли заголовок
        if (this.list.title == '') {
          alert_text += '- Введите заголовок<br>'
        }

        //проверяем, заполнен ли хотя бы один пункт списка
        var counter = 0
        for (let i = 0; i < this.list.items.length; i++) {
          if (this.list.items[i].text == '') counter++
        }
        if (counter == this.list.items.length) {
          alert_text += '- Заполните хотя бы один пункт'
        }

        //показываем окно предупреждения, если что-то незаполнено
        if (alert_text != '') {
          this.$parent.showAlert(alert_text)
          return false
        } else {
          return true
        }
      },
      deleteList(id) {
        //открываем диалоговое окно
        var that = this
        this.$parent.showDialog('Удалить список?')
        //если пользователь соглашается, то удаляем список
        document.querySelector('.popup-accept').onclick = function () {
          var ls_data = JSON.parse(localStorage.todo_data)
          var index = ls_data.findIndex(x => x.id == id)
          ls_data.splice(index, 1)
          localStorage.todo_data = JSON.stringify(ls_data)
          that.$router.push('/')
          that.$parent.showAlert('Список удален')
        }
      },
      saveList() {
        if (this.is_edited) {
          var that = this
          //открываем диалоговое окно
          this.$parent.showDialog('Сохранить изменения?')
          //если пользователь соглашается с внесением изменений, то сохраняем и редиректим на главную
          document.querySelector('.popup-accept').onclick = function () {
            if (that.form_valid()) {
              for (let i = that.list.items.length - 1; i >= 0; i--) {
                if (that.list.items[i].text == '') that.list.items.splice(i, 1)
              }

              var ls_data = JSON.parse(localStorage.todo_data)
              var index = ls_data.findIndex(x => x.id == that.list.id)
              ls_data[index] = that.list
              localStorage.todo_data = JSON.stringify(ls_data)
              that.$router.push('/')
              that.$parent.showAlert('Список изменен')
            }
          }
          //если не соглашается, редиректим без сохранения
          document.querySelector('.popup-cancel').onclick = function () {
            that.$router.push('/')
          }
          // если не было изменений на странице, то редиректим на главную без диалогового окна
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>
  .delete-btn {
    position: absolute;
    bottom: 2px;
    right: -45px;
    font-size: 30px;
    cursor: pointer;
  }
  form {
    position: relative;
  }
</style>
