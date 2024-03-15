<template>
    <div>
        <div v-for="(message, index) in messages" :key="index" class="message" @mousedown="startPress(message)"
            @mouseup="cancelPress" @mouseleave="cancelPress">
            {{ message }}
        </div>
        <div v-show="showDelete">
            <span>Delete conversation?</span><br><br>
            <span @click="DelMsg">OK</span>
            <span @click="CancelDel">Cancel</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const showDelete = ref(false);
const msgindex = ref();

const DelMsg = () => {
    // console.log('this',index1);
    messages.value.splice(msgindex.value, 1);
}

const CancelDel = () => {
    showDelete.value = false;
}

const showDel = (index) => {
    console.log('now', index);
    showDelete.value = true;
    msgindex.value = index;
}

const messages = ref(['Message 1', 'Message 2', 'Message 3'])
let pressTimer

const startPress = (message) => {
    pressTimer = setTimeout(() => {
        // Long press detected, delete the message
        const index = messages.value.indexOf(message)
        if (index !== -1) {
            //messages.value.splice(index, 1)
            showDel(index);
        }
    }, 3000) // Adjust the time threshold as needed
}

const cancelPress = () => {
    clearTimeout(pressTimer)
}
</script>

<style>
.message {
    border: 1px solid black;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
}
</style>