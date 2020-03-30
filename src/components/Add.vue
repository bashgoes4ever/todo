<template>
  <div class="container">
    <h1>Создание нового списка</h1>
    <form>
      <input type="text" v-model="title" placeholder="Название списка">
      <div class="title">Пункты:</div>
      <div class="input-block" v-for="(item, i) in items" :key="i">
        <input type="text" placeholder="Новый пункт" v-model="items[i]">
        <font-awesome-icon class="remove-btn" icon="times" @click="removeItem(i)"/>
      </div>
      <div class="form__buttons">
        <button class="add-btn" @click.prevent="addItem">
          <font-awesome-icon icon="plus"/>
          Добавить пункт
        </button>
        <button class="create-btn" v-if="items.length > 0" @click.prevent="createList">Создать список</button>
      </div>
    </form>
    <router-link to="/" class="back">Вернуться на главную</router-link>
  </div>
</template>

<script>
  export default {
    name: "Add",
    data: () => ({
      items: [],
      title: ''
    }),
    methods: {
      addItem() {
        this.items.push('')
      },
      removeItem(i) {
        this.items.splice(i, 1)
      },
      form_valid() {
        var alert_text = ''
        //проверяем, введен ли заголовок
        if (this.title == '') {
          alert_text += '- Введите заголовок<br>'
        }

        //проверяем, заполнен ли хотя бы один пункт списка
        var counter = 0
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i] == '') counter++
        }
        if (counter == this.items.length) {
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
      createList() {
        /*
        если форма валидна, создаем объект списка,
        состоящего из заголовка, списка дел и id, и заносим его в localStorage.
        каждое дело - объект с описанием и статусом.
        статус 0 - дело не выполнено
        статус 1 - выполнено
         */
        if (this.form_valid()) {
          var ls_data = []
          var id = 1
          if (localStorage.todo_data && localStorage.todo_data != '[]') {
            ls_data = JSON.parse(localStorage.todo_data)
            id = ls_data[0].id + 1
          }

          var items = []
          for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] != '') {
              items.push({
                text: this.items[i],
                status: 0
              })
            }
          }

          var data = {
            id: id,
            title: this.title,
            items: items
          }

          ls_data.unshift(data)
          localStorage.todo_data = JSON.stringify(ls_data)
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style>
</style>
