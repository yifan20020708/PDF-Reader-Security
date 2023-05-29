<script>
export default {
  props: {
    show: Boolean,
    titles: [String, String, String],
    contents: [String, String, String],
  },
  methods: {
	  back(num) {
      //num代表选中的是第几个闪卡
      let pdfUrl = document.getElementById("pdf_display").src;
      let username_input = pdfUrl.split('%2F')[2];
      let pdf_input = pdfUrl.split('%2F')[3].split('.')[0];
      let word_input = this.titles[num-1];
      let detail_input = this.contents[num-1];
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == 'Write DB successfully!') {
            console.log("111111");
            window.alert(this.responseText);
          } else {
            window.alert(this.responseText);
          }
        }
      };
      // todo：修改服务器地址
      xhttp.open("POST", "http://localhost/blingCard.php", true);
      var send_message = "username=" + username_input + "&pdf=" + pdf_input
          + "&word=" + word_input + "&detail=" + detail_input;
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(send_message);
      this.$emit('close')
  	}
	}
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <!-- <div class="modal-header">
          <slot name="header">default header</slot>
        </div> -->

        <!-- <div class="modal-body">
          <slot name="body">default body</slot>
        </div> -->

        <div class="modal-body">  
            <slot name="body">
            <button
              class="modal-default-button"
              @click="back(1)"
            >{{titles[0]}}: {{contents[0]}}</button>
          </slot>
        </div>
        <div class="modal-body">  
            <slot name="body">
            <button
              class="modal-default-button"
              @click="back(2)"
            >{{titles[1]}}: {{contents[1]}}</button>
          </slot>
        </div>
        <div class="modal-body">  
            <slot name="body">
            <button
              class="modal-default-button"
              @click="back(3)"
            >{{titles[2]}}: {{contents[2]}}</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 50%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: margin-top;
  width: 100%;
  background-color: lightgrey;
}

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>