<template>
    <div>
        <div style="display: none;">
          <h4>REGISTER</h4>
            <label for="username">Username</label>
            <input type="text" v-model="username"><br><br>
            <label for="password">Password</label>
            <input type="text" v-model="password"><br><br>
            <button @click="registerUser">Register</button>
        </div><br><br>
        <div>
          <h4>LOGIN</h4>
            <label for="username">Username</label>
            <input type="text" v-model="username"><br><br>
            <label for="password">Password</label>
            <input type="text" v-model="password"><br><br>
            <button @click="login">Login</button>
        </div>
        <button @click="validRoute">click to authenticate</button>
    </div>
    <button @click="load">click here</button>
    <button @click="load1">confirm new</button>
    <button @click="load2">logout</button>
    <br><br>
    <nuxt-link to="/index6">Go next</nuxt-link>
</template>

<script setup>
import { jwtDecode } from "jwt-decode";
import io from 'socket.io-client';
import { useAuthStore } from "@/stores/myStore";
const store = useAuthStore();
const socket = io('http://localhost:3001');
const token = ref('');
const username = ref('');
const password = ref('');

const registerUser = () => {
  // Emit 'register' event to the server
  socket.emit('register', { id: username.value, client_name: password.value });

  // Send registration data to the server
  fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: username.value, client_name: password.value }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Registration _successfully:', data);
    })
    .catch(error => {
      console.error('Registration _failure:', error);
    });
};
const login = async () => {
  // socket.emit('login', loginUserId.value);
  socket.emit('login', {id: username.value, client_name: password.value });
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: username.value, client_name: password.value  })
    });
    if (!response.ok) {
      throw new Error('Invalid username or password');
    }
    
    const data = await response.json();
    token.value = data.token;
    // Store the token in localStorage or Vuex state for subsequent requests
    console.log('logged in successful', token.value);
    // const decoded = jwtDecode(token.value);
    // console.log('heree', decoded);
    localStorage.setItem('token', token.value);
    store.setToken(token.value);

  } catch (error) {
    console.error(error);
    // Handle login error
  }
};
const logout = () => {
  token.value = '';
  // Clear token from localStorage or Vuex state
  localStorage.removeItem('token');
};

// const decodeToken = () => {
//   if (token.value) {
//     return jwt_decode(token.value);
//   }
//   return null;
// };

// export { token, login, logout, decodeToken };


// const token = 'your_auth_token'; // Replace with actual token

const validRoute = () => {
  fetch('http://localhost:3001/protected', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token.value}`
  }
})
.then(response => {
  if (!response.ok) {
    console.log(token.value);
    throw new Error('Failed to fetch');
    
  }
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});
}


const token1 = ref('joel')
const load = () => {
  store.setToken(token1.value);
}

const load2 = () => {
  store.clearToken();
}

const load1 = () => {
  console.log('now check', store.token);
  console.log(store.authenticated);
}

// definePageMeta({
//   middleware: 'auth'
// })


</script>