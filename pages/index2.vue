<template>
  <div>
    hello
  </div>
</template>

<script setup>

const myArray = [
  {sender: 'john', receiver: 'mary'},
  {sender: 'joel', receiver: 'mary'},
  {sender: 'james', receiver: 'mary'},
  {sender: 'mercy', receiver: 'mary'},
  {sender: 'kim', receiver: 'mary'}
];

const otherArray = [
  {sender: 'john', value: 3, message: 'hi'},
  {sender: 'joel', value: 2},
  {sender: 'james', value: 5},
  {sender: 'mercy', value: 1, message: 'hi'},
  {sender: 'kim', value: 8, message: 'hi'},
  {sender: 'john', value: 3},
  {sender: 'joel', value: 2}
];

const newArray = myArray.map(obj => {
  const count = otherArray.filter(item => item.sender === obj.sender && item.message === 'hi').length;
  return {
    ...obj,
    newValue: count
  };
});

console.log(newArray);




</script>