<template>
  <div id="app">
    <router-view/>

    <footer>
      <div class="container">
        <h3>Контакты</h3>
        <div class="footer__contacts">
          wa: 89243299599, tg: shredgoes4ever, skype: skbd666
        </div>
      </div>
    </footer>

    <div class="popup-alert">
      <div class="title"></div>
    </div>

    <div class="popup-dialog">
      <div class="title"></div>
      <div class="popup__buttons">
        <button class="popup-accept">Да</button>
        <button class="popup-cancel">Отмена</button>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from "jquery"

  export default {
    name: 'App',
    methods: {
      showAlert(title) {
        $('.popup-alert .title').html(title)
        $('.popup-alert').fadeIn(300)
        setTimeout(function () {
          $('.popup-alert').fadeOut(300)
        }, 1500)
      },
      showDialog(title) {
        $('.popup-dialog .title').html(title)
        $('.popup-dialog').fadeIn(300)
        $('.popup-cancel, .popup-accept').click(function () {
          $('.popup-dialog').fadeOut(300)
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button:focus {
    outline: none;
  }

  .container {
    width: 1070px;
    margin: 0 auto;

  }

  .popup-alert {
    display: none;
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 400px;
    padding: 30px 20px;
    color: #000;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.5);
    font-size: 22px;
    text-align: center;
    z-index: 10;
  }
  form {
    margin-top: 50px;
    text-align: left;
    margin-right: auto;
    margin-left: auto;
    width: 420px;
  }

  form .title {
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  input {
    border: none;
    width: 100%;
    display: block;
    border-bottom: 1px solid #000;
    font-size: 20px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    transition: all .3s;
  }

  input:focus {
    outline: none;
    border-bottom-color: #15d7d7;
  }

  .input-block {
    position: relative;
  }

  .remove-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    cursor: pointer;
  }

  .form__buttons {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .add-btn {
    background-color: #15d7d7;
    display: block;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ffffff;
    width: 200px;
    height: 40px;
  }

  .create-btn {
    width: 210px;
    height: 40px;
    font-size: 18px;
    background-color: transparent;
    border: 2px solid #15d7d7;
    cursor: pointer;
  }
  .back {
    text-align: left;
    opacity: .7;
    margin-top: 20px;
    display: block;
    padding-left: 340px;
    cursor: pointer;
  }
  .input-block .checkbox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -35px;
    width: 20px;
    height: 20px;
  }
  .popup-dialog {
    display: none;
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 400px;
    padding: 30px 20px;
    color: #ffffff;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,.5);
    font-size: 22px;
    text-align: center;
    z-index: 10;
  }
  .popup-dialog .title {
    color: #000000;
  }
  .popup__buttons {
    margin-top: 20px;
  }
  .popup__buttons button {
    background-color: transparent;
    border: 2px solid #15d7d7;
    height: 30px;
    padding: 0 10px;
    font-size: 18px;
    cursor: pointer;
  }
  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #333333;
    padding: 10px 0;
    color: #ffffff;
  }
  footer h3 {
    margin: 0 0 10px 0;
  }
  .footer__contacts {
    font-size: 18px;
  }
</style>
