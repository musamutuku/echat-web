<script setup>
import io from 'socket.io-client';
import { useAuthStore } from "@/stores/myStore";
import { jwtDecode } from "jwt-decode";

const socket = io('http://localhost:3001');
const user = ref(null);
const message = ref('');
const messages = ref([]);
const recipientUsername = ref('');

const store = useAuthStore();
const token = ref('');
const username = ref('');
const password = ref('');
const email = ref('');
const confirm = ref('');
const showLog = ref(true);
const showReg = ref(false);
const isdisabledLog = ref(true);
const isdisabledReg = ref(true);
const isFocused = ref(false);
const isFocused1 = ref(false);
const hide = ref(true);
const hide1 = ref(false)
const showsuccess = ref(false);
const showerror = ref(false);
const successMsg = ref('');
const errormsg = ref('');
const userError = ref('');
const loadingMsg = ref(false);
const hideWaitMsg = ref("SIGN IN");
const hideWaitMsg1 = ref("SIGN UP");
const loading = ref(false);
const loginMsg = ref('');
const loginSuccess = ref('');
const showinbox = ref(false);
const hideFeedback = ref(true);

const toggleinbox = () => {
  showinbox.value = true;
  hide1.value = false;

}

const resetSuccess = () => {
  successMsg.value = '';
  showsuccess.value = false;
  showLog.value = true;
  showReg.value = false;
}

const resetError = () => {
  errormsg.value = '';
  showerror.value = false;
}

const toggleLogReg = () => {
  showLog.value = !showLog.value;
  showReg.value = !showReg.value;
  username.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
  loginMsg.value = "";
}

const changeCase = computed(() => email.value = email.value.toLowerCase());

const regbtn = computed(() => {
  if (username.value != "" && email.value != "" && password.value != "" && confirm.value != "") {
    isdisabledReg.value = false;
    const color = { backgroundColor: '#6246CE' }
    return color;
  }
  isdisabledReg.value = true;
});

const logbtn = computed(() => {
  if (username.value != "" && password.value != "") {
    isdisabledLog.value = false;
    const color = { backgroundColor: '#6246CE' }
    return color
  }
  isdisabledLog.value = true;
});


//Registration
const registerUser = () => {
  loadingMsg.value = true;
  loading.value = true;
  hideWaitMsg1.value = "";
  if (email.value.includes('@')) {
    if (password.value == confirm.value) {
      fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.value, email: email.value, password: password.value, confirm: confirm.value }),
      })
        .then(response => {
          if (response) {
            if (response.status === 200) {
              return response.json();
            }
            else if (response.status === 400) {
              return response.json()
            }
          } else {
            errormsg.value = 'Internal Server Error';
            throw new Error('Server Error');
          }
        })
        .then(data => {
          if (data.regMsg) {
            return registerSuccess(data.regMsg);
          }
          else if (data.regUserMsg) {
            return registerError1(data.regUserMsg);
          }
        })
        .catch(error => registerError(error.error));
    }
    else {
      const msg = "Password does not match!";
      return registerError1(msg);
    }
  } else {
    const msg = "Enter a valid Email!";
    return registerError1(msg);
  }
};
function registerSuccess(regMsg) {
  loading.value = false;
  loadingMsg.value = false;
  hideWaitMsg1.value = "SIGN UP";
  showsuccess.value = true;
  successMsg.value = regMsg;
  username.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
  setTimeout(() => {
    successMsg.value = '';
    showsuccess.value = false;
    showLog.value = true;
    showReg.value = false;
  }, 3000);
}

function registerError(error) {
  setTimeout(() => {
    loading.value = false;
    loadingMsg.value = false;
    hideWaitMsg1.value = "SIGN UP";
    username.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
    showerror.value = true;
    errormsg.value = 'Server Error or connection failure!';
    setTimeout(() => {
      errormsg.value = '';
      showerror.value = false;
    }, 5000);
  }, 3000);
}

function registerError1(regUserMsg) {
  loading.value = false;
  loadingMsg.value = false;
  hideWaitMsg1.value = "SIGN UP";
  userError.value = regUserMsg;
  setTimeout(() => {
    userError.value = '';
  }, 3000);
}


//Login
const login = () => {
  loadingMsg.value = true;
  loading.value = true;
  hideWaitMsg.value = "";
  hideFeedback.value = true;
  setTimeout(() => {
    if (loginMsg.value == '') {
      loginMsg.value = 'Check on your connection and try again!';
      loadingMsg.value = false;
      loading.value = false;
      hideWaitMsg.value = "SIGN IN";
      username.value = '';
      password.value = '';
      setTimeout(() => {
        loginMsg.value = '';
      }, 4000);
    }
  }, 20000);
  socket.emit('login', { username: username.value, password: password.value });
};




onMounted(() => {
  // Listen for login success or failure events
  socket.on('loginSuccess', (userData, userToken) => {
    loadingMsg.value = false;
    loading.value = false;
    hideWaitMsg.value = "SIGN IN";
    user.value = userData;
    token.value = userToken;
    localStorage.setItem('user', user);
    localStorage.setItem('token', token.value);
    hide.value = false;
    hide1.value = true;
    loginSuccess.value = 'Logged in successfully';
    setTimeout(() => {
      loginSuccess.value = '';
      hideFeedback.value = false;
    }, 3000);
  });


  socket.on('loginFailure', (error) => {
    loadingMsg.value = false;
    loading.value = false;
    hideWaitMsg.value = "SIGN IN";
    loginMsg.value = error.message;
    username.value = '';
    password.value = '';
    hideFeedback.value = true;
    setTimeout(() => {
      loginMsg.value = '';
      hideFeedback.value = false;
    }, 3000);
  });

  socket.on('storedMessages', (messagez) => {
    const currentDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = currentDate.getDay();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[dayOfWeek];
    const dayOfMonth = currentDate.getDate();
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedDate = `${dayName}, ${dayOfMonth} ${monthName} ${year}, ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const userMessage = messagez.filter((msg) => msg.recipientUsername === user.value.username);
    for (let i = 0; i < userMessage.length; i++) {
      userMessage[i].id = formattedDate;
      // if(userMessage[i].senderUsername == user.value.username){
      //   userMessage[i].senderUsername = 'You';
      // }
    }
    for (let i = 0; i < userMessage.length; i++) {
        // Get the property value to compare
        let propValue = userMessage[i].senderUsername;

        // Iterate over the subsequent objects
        for (let j = i + 1; j < userMessage.length; j++) {
            // If the property value matches, remove the object with lower index
            if (userMessage[j].senderUsername === propValue) {
                userMessage.splice(i, 1); // Remove object at lower index
                i--; // Adjust index to account for removed object
                break; // Exit inner loop
            }
        }
    }
    messages.value = userMessage;
  });
});


const sendMessage = () => {
  socket.emit('sendMessage', {
    senderUsername: user.value.username,
    recipientUsername: recipientUsername.value,
    message: message.value
  });
  messages.value.push({ id: checktime(), senderUsername: 'You', message: message.value });
  message.value = '';
};



socket.on('receiveMessage', ({ senderUsername, message }) => {
  if (senderUsername != user.value.username) {
    messages.value.push({ id: checktime(), senderUsername: senderUsername, message: message });
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

const checktime = () => {
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayOfWeek = currentDate.getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayNames[dayOfWeek];
  const dayOfMonth = currentDate.getDate();
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedDate = `${dayName}, ${dayOfMonth} ${monthName} ${year}, ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  return formattedDate;
}
const logout = () => {
  localStorage.removeItem('user');
  hide.value = true;
  hide1.value = false;
  showinbox.value = false;
  loginMsg.value = '';
}
</script>

<template>
  <div :class="{ 'pointer-events-none': loading }">
    <div v-show="hide">
      <div class="absolute bg-[#00000080] h-full w-[100%] z-10 flex justify-center items-center text-sm"
        v-show="showsuccess" @click="resetSuccess">
        <p class="bg-[#ACEEAC] py-3 px-3 mx-3 text-center">{{ successMsg }}</p>
      </div>
      <div class="absolute bg-[#00000080] h-full w-[100%] z-10 flex justify-center items-center text-sm"
        v-show="showerror" @click="resetError">
        <p class="bg-[#742929] text-white py-3 px-5">{{ errormsg }}</p>
      </div>
      <div v-show="showReg" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
          <h2 class=" text-[25px] text-[#A4A716]">CREATE eCHAT ACCOUNT</h2>
        </div>
        <span class="font-semibold text-[#970606] font-[quicksand] text-center text-[13px]">{{ userError }}</span>
        <div class="mx-auto py-2 flex flex-col gap-8 regbox">
          <div class="flex flex-col">
            <label for="username">Username</label>
            <input type="text" v-model="username" maxlength="50" id="username">
          </div>
          <div class="flex flex-col">
            <label for="email">Email</label>
            <input type="text" v-model="email" maxlength="50" id="email" @blur="changeCase">
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input type="password" v-model="password" maxlength="50" id="password">
          </div>
          <div class="flex flex-col">
            <label for="confirm">Confirm Password</label>
            <input type="password" v-model="confirm" maxlength="50" id="confirm">
          </div>
          <button @click="registerUser"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-[5px] text-[18px] text-white h-[45px]"
            :style="regbtn" :disabled="isdisabledReg">{{ hideWaitMsg1 }}<span v-show="loadingMsg" class="loadingMsg"><img
                src="@/assets/images/waiting_img.png">Please wait...</span></button>
          <div class="flex mx-auto gap-2 text-[14px] font-bold">
            <span class="text-[#236E98]">Already have an account?</span>
            <button @click="toggleLogReg"
              class="text-[#0912DB] underline decoration-1 hover:cursor-pointer">Signin</button>
          </div>
        </div>
      </div>
      <div v-show="showLog" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center pt-3 pb-6 mb-8 font-[quicksand] font-bold w-[99%] mx-auto">
          <h2 class=" text-[32px] text-[#A4A716]">eCHAT</h2>
        </div>
        <h3 class="text-[#084407] font-bold text-[20px] text-center mb-5">USER LOGIN</h3>
        <span class="font-semibold text-[#970606] font-[quicksand] text-center text-[13px]" v-show="hideFeedback">{{
          loginMsg }}</span>
        <div class="mx-auto py-5 flex flex-col gap-10">
          <div class="custom-input">
            <input type="text" v-model="username" maxlength="50" @input="isFocused = true" @blur="isFocused = false"
              placeholder="Username">
            <div class="placeholder-image" v-show="!username && !isFocused"></div>
          </div>
          <div class="custom-input">
            <input type="password" v-model="password" maxlength="50" @input="isFocused1 = true" @blur="isFocused1 = false"
              placeholder="Password">
            <div class="placeholder-image1" v-show="!password && !isFocused1"></div>
          </div>
          <button @click="login" :style="logbtn" :disabled="isdisabledLog"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-3xl text-[18px] text-white h-[45px]">{{
              hideWaitMsg }}<span v-show="loadingMsg" class="loadingMsg"><img src="@/assets/images/waiting_img.png">Please
              wait...</span></button>
          <div class="flex justify-between text-[#0912DB] font-bold text-sm">
            <span class="hover:cursor-pointer">Forgot Password?</span>
            <span @click="toggleLogReg" class="hover:cursor-pointer">Create an Account?</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="hide1">
      <div>
        <p>{{ loginSuccess }}</p>
        <button>Start Chat</button>
        <button @click="toggleinbox">inbox</button>
      </div>
    </div>
    <div v-show="showinbox">
      <button @click="logout">Logout</button>
      <div>
        <label for="recipient">Recipient ID:</label>
        <input v-model="recipientUsername" id="recipient" />
      </div>
      <div>
        <label for="message">Message:</label>
        <input v-model="message" />
        <button @click="sendMessage" id="message">Send Message</button>
      </div>
      <div>
        <h2>Chat:</h2>
        <ul>
          <li v-for="msg in messages" :key="msg.id">{{ msg.id }} {{ msg.senderUsername }}: {{ msg.message }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  position: relative;
  display: inline-block;
  width: 320px;
  height: 45px;
  border: 1px solid #3D3E68;
  border-radius: 5px;
}

.custom-input input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 10px;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
}

.custom-input input::placeholder {
  color: #3D3E68;
  font-size: 15px;
  font-family: quicksand;
}

.placeholder-image {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background: url('@/assets/images/user.png') no-repeat center;
  background-size: cover;
}

.placeholder-image1 {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background: url('@/assets/images/passkey.png') no-repeat center;
  background-size: cover;
}

.regbox label {
  font-size: 15px;
  font-weight: bold;
  color: #3D3E68;
}

.regbox input {
  border: 1px solid #3D3E68;
  width: 320px;
  height: 45px;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
}

.loadingMsg {
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
}

.loadingMsg img {
  width: 9%;
  height: 11%;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
  