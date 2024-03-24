<template>
  <div class="mx-4 mt-3 ">
    <textarea class="border-2 border-slate-400 outline-none message-input" v-model="message"
      @input="checkNewLine"></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const checkNewLine = (event) => {
  const textarea = event.target
  const scrollHeight = textarea.scrollHeight
  const clientHeight = textarea.clientHeight

  if (scrollHeight > clientHeight) {
    message.value += '\n'
  }
}
</script>

<style>
.message-input {
  width: 100%;
  min-height: 1em;
  /* Set minimum height to 1 row */
  resize: none;
  /* Disable textarea resizing */
  overflow-y: auto;
  /* Enable vertical scrollbar when needed */
}
</style>