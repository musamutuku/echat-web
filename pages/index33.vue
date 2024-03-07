<template>
  <div ref="messageContainer" class="message-container">
    <div v-for="message in messages" :key="message.id" class="message">{{ message.content }}</div>
  </div>
</template>

<script setup>
//   import { ref, onMounted, onUpdated } from 'vue';

const messages = ref([
  { id: 1, content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 2, content: 'hello1Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 3, content: 'hello2Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 4, content: 'hello3Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 5, content: 'hello4Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 6, content: 'hello5Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 7, content: 'hello6Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 8, content: 'hello7Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 9, content: 'hello8Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?' },
  { id: 10, content: 'helloLorem ipsum dolor sit amet consectetur adipisicing elit. Rerum esse nisi aperiam soluta ducimus iure quaerat dicta! Ullam nostrum molestiae harum explicabo, beatae eos ratione cum. Consequatur alias ipsa provident?9 fjjjjjjjjjjj fiiiiiiiiiiiii' }
]);

const messageContainer = ref(null);

onMounted(() => {
  scrollToBottom();
});

onUpdated(() => {
  scrollToBottom();
});

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// Listen to the scroll event and scroll to bottom if user scrolls up
const handleScroll = () => {
  const container = messageContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    // Scrolled to the bottom
    return;
  }
  scrollToBottom();
};

// Attach the scroll event listener to the message container
messageContainer.value?.addEventListener('scroll', handleScroll);
</script>

<style>
.message-container {
  overflow-y: auto;
  height: 300px;
  /* Set your desired height */
  border: 1px solid black;
  background-color: gray;
}
</style>