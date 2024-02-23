<script setup>
import io from 'socket.io-client';
import { useAuthStore } from "@/stores/myStore";
import { jwtDecode } from "jwt-decode";

const socket = io('http://localhost:3001');
const user = ref(null);
const message = ref('');
const messages = ref([]);
const messages1 = ref([]);
const chatMessages = ref([]);
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
const showinbox = ref(false);
const hideFeedback = ref(true);
const showmessenger = ref(false);
const showStartChat = ref(false);
const users = ref([]);
const senderRefs = ref([]);
const recipientRefs = ref([]);


const getSender = (index) => {
  showmessenger.value = true;
  showinbox.value = false;
  messages.value = chatMessages;
  recipientUsername.value = messages1.value[index].senderUsername;
  const userMessage2 = chatMessages.value.filter((msg) => ((msg.senderUsername == user.value.username) && (msg.recipientUsername == recipientUsername.value)) || ((msg.senderUsername == recipientUsername.value) && (msg.recipientUsername == user.value.username)));
  messages.value = userMessage2;
}


const getRecipient = (item) => {
  showmessenger.value = true;
  showinbox.value = false;
  showStartChat.value = false;
  messages.value = chatMessages;
  recipientUsername.value = item.username;
  const userMessage2 = chatMessages.value.filter((msg) => ((msg.senderUsername == user.value.username) && (msg.recipientUsername == recipientUsername.value)) || ((msg.senderUsername == recipientUsername.value) && (msg.recipientUsername == user.value.username)));
  messages.value = userMessage2;
}

const goback = () => {
  showmessenger.value = !showmessenger.value;
  showinbox.value = !showinbox.value;
}

const toggleinbox = () => {
  showinbox.value = true;
  hide1.value = false;

}
const togglestartChat = () => {
  showStartChat.value = true;
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

onMounted(() => {
  fetch('http://localhost:3001/users').then(response => response.json())
    .then(data => localStorage.setItem('users', JSON.stringify(data)));
});

if (process.client) {
  const users1 = JSON.parse(localStorage.getItem('users'));
  users.value = users1;
}

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
    setTimeout(() => {
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

  socket.on('storedMessages', (messagez1) => {
    const messagez = JSON.parse(JSON.stringify(messagez1));
    chatMessages.value = [...messagez1];
    const userMessage = messagez.filter((msg) => msg.recipientUsername === user.value.username);
    const userMessage1 = messagez.filter((msg) => msg.senderUsername === user.value.username);

    //Get the msgs send by the currently logged in user. First get one(loop with i), then get the next( j=i+i), then
    //compare to get the one which was send later and remove the ones send earlier(older i.e the ones with lower indexes)
    for (let i = 0; i < userMessage1.length; i++) {
      // Get the property value to compare
      let propValue = userMessage1[i].recipientUsername;

      // Iterate over the subsequent objects
      for (let j = i + 1; j < userMessage1.length; j++) {
        // If the property value matches, remove the object with lower index
        if (userMessage1[j].recipientUsername === propValue) {
          userMessage1.splice(i, 1); // Remove object at lower index
          i--; // Adjust index to account for removed object
          break; // Exit inner loop
        }
      }
    }

    //Get the msgs to the currently logged in user by other clients. First get one(loop with i), then get the next( j=i+i), then
    //compare to get the one which was send later and remove the ones send earlier(older i.e the ones with lower indexes)
    for (let i = 0; i < userMessage.length; i++) {
      let propValue = userMessage[i].senderUsername;
      for (let j = i + 1; j < userMessage.length; j++) {
        if (userMessage[j].senderUsername === propValue) {
          userMessage.splice(i, 1); 
          i--; 
          break; 
        }
      }
    }

    //Get the new arrays formed after splicing the lower indexes, 
    //then get the msgs send by one sender(i) to logged user and replies the looged user send back (j)- [loop to all in i and j]
    //compare the two and return the msg send latest by replacing the msg of the sender if it has lower index (using index from original array b4 spliced) 
    //so that it can be reflected in the inbox page
    for (let i = 0; i < userMessage.length; i++) {
      const searchedUser = userMessage[i].senderUsername;
      for (let j = 0; j < userMessage1.length; j++) {
        const comparedUser = userMessage1[j].recipientUsername;
        if (comparedUser == searchedUser) {
          const index1 = messagez.indexOf(userMessage[i]);
          const index2 = messagez.indexOf(userMessage1[j]);
          if (index2 > index1) {
            userMessage[i].message = userMessage1[j].message;
          }
        }
      }
    }
    messages1.value = userMessage;

  //filter and remove to avoid repeat in the inbox msgs
    for (let i = 0; i < userMessage.length; i++) {
      const objValue = userMessage[i].senderUsername;
      for (let j = 0; j < userMessage1.length; j++) {
        const objValue2 = userMessage1[j].recipientUsername;
        if ((objValue.includes(objValue2))) {
          userMessage1.splice(j, 1);
          break;
        }
      }
    }
    messages1.value.reverse();
    for (let i = 0; i < userMessage1.length; i++) {
      const obj = userMessage1[i];
      userMessage1[i].senderUsername = userMessage1[i].recipientUsername;
      messages1.value.unshift(obj);
    }
  });
});


const sendMessage = () => {
  socket.emit('sendMessage', {
    id: checktime(),
    senderUsername: user.value.username,
    recipientUsername: recipientUsername.value,
    message: message.value,
    time: currenttime()
  });
  messages.value.push({ id: checktime(), senderUsername: 'You', message: message.value, time: currenttime() });
  let matchFound = false;
  for (let i = 0; i < messages1.value.length; i++) {
    if (messages1.value[i].senderUsername == recipientUsername.value) {
      messages1.value[i].message = message.value;
      messages1.value[i].time = currenttime();
      const removeObj = messages1.value.splice(i, 1)[0];
      messages1.value.unshift(removeObj);
      matchFound = true;
      break;
    }
  }
  if (!matchFound) {
    messages1.value.unshift({ id: checktime(), senderUsername: recipientUsername.value, message: message.value, time: currenttime() });
  }
  message.value = '';
};


socket.on('receiveMessage', ({ senderUsername, message }) => {
  if (senderUsername != user.value.username) {
    messages.value.push({ id: checktime(), senderUsername: senderUsername, message: message, time: currenttime() });
  }
  const newmessage = { id: checktime(), senderUsername: senderUsername, message: message, time: currenttime() };
  // messages1.value = messages1.push(newmessage);
  const newvalue = newmessage.senderUsername;
  for (let i = 0; i < messages1.value.length; i++) {
    if (messages1.value[i].senderUsername === newvalue) {
      // messages1.value[i] = newmessage;
      messages1.value.splice(i, 1);
      break;
    }
  }
  messages1.value.unshift(newmessage);
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
  const currenttime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  const formattedDate = `${dayName}, ${dayOfMonth} ${monthName} ${year}, ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  return formattedDate;
}

const currenttime = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currenttime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  return currenttime;
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
    <div v-show="hide1" class="sm:hidden">
      <div class="flex flex-col gap-10 text-center">
        <div class="flex justify-between mx-3 mt-3">
          <span class="w-[10%]"><img src="@/assets/images/menu.svg"></span>
          <span class="w-[20%] rounded-[50%] h-[70px]"><img src="@/assets/images/profile.jpg"
              class="rounded-[100%] h-[100%] w-[100%]"></span>
        </div>
        <span class="font-[quicksand] text-[30px] text-[#A4A716] my-5 leading-10 font-bold">Welcome to Fast Chat Web
          App</span>
        <div class="flex w-fit mx-auto gap-8">
          <div class="flex flex-col" @click="togglestartChat">
            <span class=""><img src="@/assets/images/chat.png" class="w-[78%]"></span>
            <button class="-mt-1">start chat</button>
          </div>
          <div class="flex flex-col hover:cursor-pointer" @click="toggleinbox">
            <span class="mt-[-9px]"><img src="@/assets/images/inbox.png" class="w-[65px] h-[65px]"></span>
            <button class="mt-[-7.5px]">inbox</button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showStartChat">
       <ul>
        <li v-for="item in users" :key="item.username" @click="getRecipient(item)" ref="recipientRefs">{{ item.username }}</li> 
      </ul>
     </div>
    <div v-show="showinbox">
      <ul>
        <li class="flex justify-between"  v-for="(msg, index) in messages1" :key="index" @click="getSender(index)" ref="senderRefs">
          <div class="w-12 h-12 rounded-[100%] bg-slate-300 p-1"><img src="@/assets/images/user_profile.png"
              class="w-[38px] h-[35px]"></div>
          <div class="flex flex-col bg-slate-300 w-[85%] pr-5 border-2">
            <div class="flex justify-between">
              <span class="font-bold text-lg">{{ msg.senderUsername }}</span>
              <span>{{ msg.time }}</span>
            </div>
            <span>{{ msg.message }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="showmessenger">
       <ul class="px-5 flex flex-col gap-3 mt-10">
        <div class="flex gap-9"><button @click="goback">back</button>&nbsp;<span class="font-bold text-lg">Mary</span>
        </div>
        <li v-for="msg in messages" :key="msg.id" class="flex flex-col" :class="{'mr-5': msg.senderUsername !== user.value.username, 'ml-5': msg.senderUsername === user.value.username}">
          <span class="self-center" :class="{'mr-10': msg.senderUsername === user.value.username}">{{ msg.time }}</span>
          <span class="w-fit rounded-lg px-3 py-1 self-start flex break-all" :class="{'bg-gray-200': msg.senderUsername !== user.value.username, 'bg-green-600': msg.senderUsername === user.value.username, 'self-start': msg.senderUsername !== user.value.username ,'self-end': msg.senderUsername === user.value.username}">{{ msg.message }}</span>
        </li>
        <div>
          <label for="recipient">Recipient ID:</label>
          <input v-model="recipientUsername" id="recipient" />
        </div>
        <div>
          <h3>chat</h3>
          <ul>
            <li v-for="msg in messages" :key="msg.id">{{ msg.time }} {{ msg.senderUsername }}: {{ msg.message }}</li>
          </ul>
          <label for="message">Message:</label>
          <input v-model="message" class="border-2 border-slate-500" />
          <button @click="sendMessage" id="message">Send Message</button>
        </div>
      </ul>
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
  