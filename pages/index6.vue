<template>
  <div>
    <!-- Your component template here -->
  </div>
  <span v-html="txt"></span>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const txt = ref('<span style="color: red">This should be red.</span>')

// Define reactive refs for data
// const arrayOfObjects = ref([
//   { id: 1, name: 'Object 1' },
//   { id: 2, name: 'Object 2' },
//   { id: 3, name: 'Object 3' },
//   { id: 4, name: 'Object 4' }
// ]);
const arrayOfObjects = ref(['mango','orange','lemon','pinaple']);
// const valueToSearch = ref('Object 2');
// const newObj = ref({ id: 2, name: 'New Object 2' });

// Method to replace the object by property value and return the new array
const replaceObjectByPropertyValue = () => {
  arrayOfObjects.value.splice(0,1);
  return arrayOfObjects;
 
};

// Call the method to replace the object by property value on component mount
onMounted(() => {
  const updatedArray = replaceObjectByPropertyValue();
  console.log('y66h', updatedArray); // Output the updated array
});
</script>
