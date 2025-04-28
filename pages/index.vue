<script setup>
import io from "socket.io-client";
import { useAuthStore } from "@/stores/myStore";
// import { jwtDecode } from "jwt-decode";
const config = useRuntimeConfig();
const host_server = config.public.apiHOST;
const socket = io(`${host_server}`);

onMounted(() => {
  const newuser = "a user joined link";
  socket.emit('connected', newuser);
});

const isConnected = ref(false);
socket.on('connect', () => {
  isConnected.value = true;
});

socket.on('disconnect', () => {
  isConnected.value = false;
});


const user = ref(null);
const message = ref("");
const messages = ref([]);
const totalMsgs = ref(0);
const messages1 = ref([]);
const chatMessages = ref([]);
const recipientUsername = ref("");
const msgSender = ref();

const store = useAuthStore();
const token = ref("");
const otp = ref("");
const otp1 = ref("");
const otp2 = ref("");
const otp3 = ref("");
const otp4 = ref("");
const otp11 = ref("");
const otp22 = ref("");
const otp33 = ref("");
const otp44 = ref("");
const username = ref("");
const password = ref("");
const email = ref("");
const confirm = ref("");
const showLog = ref(true);
const showForgot = ref(false);
const showForgotSuccess = ref(false);
const showReg = ref(false);
const isdisabledLog = ref(true);
const isdisabledReg = ref(true);
const isdisabledForgot = ref(true);
const isdisabledChange = ref(true);
const isdisabledDelete = ref(true);
const isdisabledOtp = ref(true);
const isdisabledOtpInput1 = ref(false);
const isdisabledOtpInput2 = ref(true);
const isdisabledOtpInput3 = ref(true);
const isdisabledOtpInput4 = ref(true);
const isFocused = ref(false);
const isFocused1 = ref(false);
const hide = ref(true);
const hide1 = ref(false);
const hide2 = ref(false);
const showsuccess = ref(false);
const showerror = ref(false);
const successMsg = ref("");
const errormsg = ref("");
const userError = ref("");
const userError01 = ref("");
const userError02 = ref("");
const userError03 = ref("");
const userError04 = ref("");
const resendLink = ref("");
const showresend = ref(false)
const userError02Timer = ref("");
const loadingMsg = ref(false);
const loadingMsg1 = ref(false);
const loadingMsg2 = ref(false);
const hideWaitMsg = ref("SIGN IN");
const hideWaitMsg1 = ref("SIGN UP");
const hideWaitMsg2 = ref("VERIFY");
const hideWaitMsg3 = ref("RESET");
const loading = ref(false);
const loginMsg = ref("");
const showinbox = ref(false);
const hideFeedback = ref(true);
const showmessenger = ref(false);
const showStartChat = ref(false);
const filteredUsers = ref([]);
const filteredSenders = ref([]);
const senderRefs = ref([]);
const recipientRefs = ref([]);
const logoutshown = ref(false);
const isActive = ref(false);
const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
const displayMenu = ref(true);
const isCollapsed = ref(true);
const messageContainer = ref(null);
const pauseRefresh = ref(false);
const showVerify = ref(false);
const unclickable = ref(false);
const showpopupMessage = ref(false);
const popupText = ref("");
const showpopupMessage1 = ref(false);
const popupText1 = ref("");
const showpopupMessage2 = ref(false);
const popupText2 = ref("");
const forgotError = ref("");
const forgotSuccess = ref("");
const showprofile = ref(false);
const hideProfile = ref(true);
const showpasswordChange = ref(false);
const showaccountDelete = ref(false);

const togglepassword = () => {
  hideProfile.value = false;
  showpasswordChange.value = true;
  showaccountDelete.value = false;
}

const toggledelete = () => {
  hideProfile.value = false;
  showpasswordChange.value = false;
  showaccountDelete.value = true;
}

const passwordCancel = () => {
  hideProfile.value = true;
  showpasswordChange.value = false;
  showaccountDelete.value = false;
  pswd.value = "";
  pswd1.value = "";
  newPswd.value = "";
  confirmNew.value = "";
  accountDel.value = "";
}


const toggleForgot = () => {
  showForgot.value = true;
  showLog.value = false;
  showReg.value = false;
  showForgotSuccess.value = false;
}

const toggleForgot1 = () => {
  showForgot.value = false;
  showLog.value = true;
  showForgotSuccess.value = false;
  showReg.value = false;

}

const nextOtp1 = (event) => {
  // const key = event.key;
  const value = event.target.value;
  if (/^[a-zA-Z0-9]$/.test(value)) {
    isdisabledOtpInput2.value = false;
    setTimeout(() => {
      otp22.value.focus();
    }, 500);
  }
  else if ((value === '' || value === ' ')) {
    otp11.value.focus();
  }
  else {
    event.target.value = '';
  }
}

const nextOtp2 = (event) => {
  const value = event.target.value;
  if (/^[a-zA-Z0-9]$/.test(value)) {
    isdisabledOtpInput3.value = false;
    setTimeout(() => {
      otp33.value.focus();
    }, 500);
  }
  else if ((value === '' || value === ' ')) {
    otp22.value.focus();
  }
  else {
    event.target.value = '';
  }
}

const nextOtp3 = (event) => {
  const value = event.target.value;
  if (/^[a-zA-Z0-9]$/.test(value)) {
    isdisabledOtpInput4.value = false;
    setTimeout(() => {
      otp44.value.focus();
    }, 500);
  }
  else if ((value === '' || value === ' ')) {
    otp33.value.focus();
  }
  else {
    event.target.value = '';
  }
}


const delMessage = ref(false);
const showmsgDel = () => {
  delMessage.value = true;
  showDelete1.value = false;
}

const CancelDel2 = () => {
  delMessage.value = false;
}



//Delete a conversation in the inbox page
const showDelete = ref(false);
const msgindex = ref();
const DelMsg = () => {
  modalOpen.value = false;
  const senderToDelMsg = messages1.value[msgindex.value].senderUsername;
  // loop through the array backwards to avoid index shifting when splicing
  for (let i = chatMessages.value.length - 1; i >= 0; i--) {
    if ((chatMessages.value[i].senderUsername == senderToDelMsg && chatMessages.value[i].recipientUsername == user.value.username) ||
      (chatMessages.value[i].recipientUsername == senderToDelMsg && chatMessages.value[i].senderUsername == user.value.username)) {
      chatMessages.value.splice(i, 1);
      if (isConnected.value == true) {
        socket.emit('deleteMsg', (user.value.username), (senderToDelMsg))
      }
      else {
        popupMessage2();
      }
    }
  }
  messages1.value.splice(msgindex.value, 1);
  showDelete.value = false;
  isLongPress = false;
}
const CancelDel = () => {
  showDelete.value = false;
  isLongPress = false;
  modalOpen.value = false;
}
const showDel = (index) => {
  showDelete.value = true;
  msgindex.value = index;
}
//longpress edited
let isLongPress = false;
let pressTimer;
const selectedMessage1 = ref(null);

const startPress = (msg, event) => {
  if (event.touches && event.touches.length > 1) return; // ignore multi-touch

  selectedMessage1.value = msg;
  showDelete.value = false;
  isLongPress = false;

  pressTimer = setTimeout(() => {
    const index = messages1.value.indexOf(msg);
    if (index !== -1) {
      showDel(index);
      modalOpen.value = true;
    }
    isLongPress = true;
  }, 2000);
};

const cancelPress = () => {
  clearTimeout(pressTimer);
};


//Delete a message in the messenger page
const showDelete1 = ref(false);
const msgindex1 = ref();
const msgToDel = ref(null);
const msgToCopy = ref();
const DelMsg1 = () => {
  messages.value.splice(msgindex1.value, 1);
  delMessage.value = false;
  for (let i = 0; i < chatMessages.value.length; i++) {
    if (chatMessages.value[i].date === msgToDel.value) {
      chatMessages.value.splice(i, 1);
      if (isConnected.value == true) {
        socket.emit('deleteMsg1', (msgToDel.value));
      }
      else {
        popupMessage2();
      }
    }
  }
  for (let i = 0; i < messages1.value.length; i++) {
    if (messages1.value[i].date === msgToDel.value) {
      const prevMsgindex = messages.value.length - 1;
      const prevMsg = messages.value[prevMsgindex];
      if (prevMsg) {
        messages1.value[i].message = prevMsg.message;
        messages1.value[i].date = prevMsg.date;
      }
      else {
        messages1.value.splice(i, 1);
      }
    }
  }
}
const CancelDel1 = () => {
  showDelete1.value = false;
}
const showDel1 = (index) => {
  showDelete1.value = true;
  msgindex1.value = index;
}

const selectedMessage = ref(null);
let isLongPress1 = false;
let pressTimer1
const startPress1 = (msg) => {
  selectedMessage.value = msg;
  showDelete1.value = false;
  delMessage.value = false;
  isLongPress1 = false;
  pressTimer1 = setTimeout(() => {
    // Long press detected, delete the message
    const index = messages.value.indexOf(msg)
    if (index !== -1) {
      showDel1(index);
      msgToDel.value = msg.date;
      msgToCopy.value = msg.message;
      isLongPress1 = true;
    }
  }, 2000)
}
const cancelPress1 = () => {
  clearTimeout(pressTimer1)
}

//copy text message to clipboard
const copiedMsg = ref('');
const copyToClipboard = () => {
  navigator.clipboard.writeText(msgToCopy.value)
    .then(() => {
      copiedMsg.value = 'copied!';
      setTimeout(() => {
        copiedMsg.value = '';
        showDelete1.value = false;
      }, 1000);
    })
    .catch((error) => {
      csetTimeout(() => {
        copiedMsg.value = 'error!';
      }, 1000);
    })
}


// Calculate the number of rows based on the message length
const minRows = 1;
const maxRows = 5;
const computedRows = computed(() => {
  const lineHeight = 20; // Adjust this value based on your font size and line height
  const lines = Math.min(Math.max(message.value.split('\n').length, minRows), maxRows);
  return Math.max(lines, minRows) * lineHeight;
});


onMounted(() => {
  scrollToTop1();
});

onUpdated(() => {
  // scrollToBottom();
  if (messages.value.length > 3 && isLongPress1 == false) {
    scrollToBottom();
  }
});

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const scrollToBottom1 = () => {
  window.scrollTo(0, document.body.scrollHeight); // Scroll the entire screen to bottom
};

const scrollToTop = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = 0;
  }
};

const scrollToTop1 = () => {
  window.scrollTo(0, 0); // Scroll the entire screen to top
}


// Attach the scroll event listener to the message container
messageContainer.value?.addEventListener('scroll', handleScroll);

const activebtn = computed(() => {
  if (message.value == "") {
    return true;
  } else {
    return false;
  }
});


watch(showmessenger, (value) => {
  if (value) {
    scrollToBottom();
  }
});

const cancelLog = () => {
  logoutshown.value = false;
  loading.value = false;
  // isActive.value = false;
  // isActive1.value = false;
  // isActive2.value = false;
  // isActive3.value = false;
};

const showmenu = () => {
  isCollapsed.value = true;
  isCollapsed.value = !isCollapsed.value;
  showDelete.value = false;
  isLongPress = false;
};

const hidemenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

const toggleshown = () => {
  logoutshown.value = true;
  // isActive.value = false;
  // isActive1.value = false;
  // isActive2.value = true;
  // isActive3.value = false;
  isCollapsed.value = true;
  loading.value = true;
};

onMounted(async () => {
  if (process.client) {
    const usertoken1 = localStorage.getItem('user');
    const storedUser = localStorage.getItem('userinfo');
    const userObject = JSON.parse(storedUser);
    user.value = userObject;
    
    if (usertoken1) {
      hide2.value = true;
      togglehome();
      
      // Add this to fetch the profile image if user exists
      if (userObject.username) {
        await fetchProfileImage();
      }
    }
  }
});

const togglehome = () => {
  isActive.value = true;
  isActive1.value = false;
  isActive2.value = false;
  isActive3.value = false;
  hide.value = false;
  hide1.value = true;
  showStartChat.value = false;
  showinbox.value = false;
  showmessenger.value = false;
  showprofile.value = false;
  isCollapsed.value = true;
};

const toggleprofile = () => {
  isActive3.value = true;
  isActive.value = false;
  isActive1.value = false;
  isActive2.value = false;
  hide.value = false;
  hide1.value = false;
  showStartChat.value = false;
  showprofile.value = true;
  isCollapsed.value = true;
  showinbox.value = false;
};


const getClass = (name) => {
  if (name === user.value.username) {
    return ["bg-[#3C60DC]", "text-white", "self-end", "ml-10"];
  } else {
    return ["bg-gray-200", "self-start", "mr-10"];
  }
};

const getStyle = (name) => {
  if (name === user.value.username) {
    return "right-[90%]";
  } else {
    return "left-[90%]";
  }
};

const getSender = (index, totalmsgs) => {
  if (!isLongPress) {
    //after clicking the unread msg(s) delete the in inbox page or reduce the number in the inbox button
    messages1.value[index].totalUnreadMsgs = 0;
    totalMsgs.value = totalMsgs.value - totalmsgs;
    if (isConnected.value == true) {
      socket.emit("markAsRead", (user.value.username), (messages1.value[index].senderUsername));
    }
    else {
      popupMessage2();
    }
    
    showmessenger.value = true;
    showinbox.value = false;
    messages.value = chatMessages.value;
    msgSender.value.innerText = messages1.value[index].senderUsername;
    recipientUsername.value = messages1.value[index].senderUsername;
    const userMessage2 = chatMessages.value.filter(
      (msg) =>
        (msg.senderUsername == user.value.username &&
          msg.recipientUsername == recipientUsername.value) ||
        (msg.senderUsername == recipientUsername.value &&
          msg.recipientUsername == user.value.username)
    );
    messages.value = userMessage2;
    if (messages.value.length > 3) {
      scrollToBottom();
      scrollToBottom1();
    }
    return messages1.value;
  };
}

const getTotalInbox = (totalmsgs) => {
  totalMsgs.value = totalMsgs.value - totalmsgs;
}


const getRecipient = (item, index) => {
  //after click start chat or a user to send msg you head to show messager page hence viewing all the unread msgs for that sender 
  // so reduce the number of messages in the inbox button
  const newsenderarray = [...messages1.value];
  for (let i = 0; i < newsenderarray.length; i++) {
    if (newsenderarray[i].senderUsername == item.username) {
      console.log("arryy", newsenderarray[i]);
      const unread = newsenderarray[i].totalUnreadMsgs;
      // getTotalInbox(unread);
      getSender(index, unread);
    }
  }

  //after click start chat or a user to send msg you head to show messager page hence viewing all the unread msgs for that sender 
  // so delete the unread msgs for that sender in inbox page 
  for (let i = 0; i < messages1.value.length; i++) {

    if (messages1.value[i].senderUsername == item.username) {
      messages1.value[i].totalUnreadMsgs = 0;
      if (isConnected.value == true) {
        socket.emit("markAsRead", (user.value.username), (messages1.value[index].senderUsername));
      }
      else {
        popupMessage2();
      }
    }
  }

  showmessenger.value = true;
  showinbox.value = false;
  showStartChat.value = false;
  messages.value = chatMessages.value;
  recipientUsername.value = item.username;
  const userMessage2 = chatMessages.value.filter(
    (msg) =>
      (msg.senderUsername == user.value.username &&
        msg.recipientUsername == recipientUsername.value) ||
      (msg.senderUsername == recipientUsername.value &&
        msg.recipientUsername == user.value.username)
  );
  messages.value = userMessage2;
  if (messages.value.length > 3) {
    scrollToBottom();
    scrollToBottom1();
  }
  return messages1.value;
};

const cancelPopup = () => {
  showDelete1.value = false;
  delMessage.value = false;
}

const goback = () => {
  showDelete1.value = false;
  delMessage.value = false;
  scrollToTop1();
  showmessenger.value = false;
  showinbox.value = true;
  message.value = "";
  msgSender.value.innerText = "";
};

// Handle back button
const handlePopState = () => {
  // Only call goback if in the messenger view
  if (showmessenger.value && showinbox.value == false) {
    goback()
    // Push another dummy state to stay in history
    history.pushState(null, '');
  }
}

// Setup and cleanup
onMounted(() => {
  // When entering this view, push a dummy state so back button becomes active
  history.pushState(null, '')
  window.addEventListener('popstate', handlePopState)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState)
})
  
const toggleinbox = () => {
  showinbox.value = true;
  hide1.value = false;
  showStartChat.value = false;
  showprofile.value = false;
};
const togglestartChat = () => {
  showStartChat.value = true;
  showinbox.value = false;
  hide1.value = false;
  isActive.value = false;
  isActive1.value = true;
  isActive2.value = false;
  isActive3.value = false;
  isCollapsed.value = true;
  showDelete.value = false;
  showprofile.value = false;
  isLongPress = false;
};

const resetSuccess = () => {
  successMsg.value = "";
  showsuccess.value = false;
  showLog.value = true;
  showReg.value = false;
};

const resetError = () => {
  errormsg.value = "";
  showerror.value = false;
};

const toggleLogReg = () => {
  showLog.value = !showLog.value;
  showReg.value = !showReg.value;
  showForgot.value = false;
  showForgotSuccess.value = false;
  username.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
  loginMsg.value = "";
  otp1.value = "";
  otp2.value = "";
  otp3.value = "";
  otp4.value = "";
  hasError.value = false;
};

const toggleLogReg2 = () => {
  showLog.value = true;
  showReg.value = false;
  showForgot.value = false;
  username.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
  loginMsg.value = "";
  otp1.value = "";
  otp2.value = "";
  otp3.value = "";
  otp4.value = "";
  hasError.value = false;
};

const toggleLogReg1 = () => {
  showLog.value = true;
  showReg.value = false;
  username.value = "";
  email.value = "";
  password.value = "";
  otp1.value = "";
  otp2.value = "";
  otp3.value = "";
  otp4.value = "";
  confirm.value = "";
  loginMsg.value = "";
  showVerify.value = false;
  isdisabledOtpInput2.value = true;
  isdisabledOtpInput3.value = true;
  isdisabledOtpInput4.value = true;
  hasError.value = false;
};

const changeCase = computed(() => (email.value = email.value.toLowerCase()));

const regbtn = computed(() => {
  if (
    username.value != "" &&
    email.value != "" &&
    password.value != "" &&
    confirm.value != ""
  ) {
    isdisabledReg.value = false;
    const color = { backgroundColor: "#6246CE" };
    return color;
  }
  isdisabledReg.value = true;
});

const otpbtn = computed(() => {
  if (
    otp1.value != "" &&
    otp2.value != "" &&
    otp3.value != "" &&
    otp4.value != ""
  ) {
    isdisabledOtp.value = false;
    const color = { backgroundColor: "#6246CE" };
    return color;
  }
  isdisabledOtp.value = true;
});

const logbtn = computed(() => {
  if (username.value != "" && password.value != "") {
    isdisabledLog.value = false;
    const color = { backgroundColor: "#6246CE" };
    return color;
  }
  isdisabledLog.value = true;
});

const forgotbtn = computed(() => {
  if (username.value != "" && email.value != "") {
    isdisabledForgot.value = false;
    const color = { backgroundColor: "#6246CE" };
    return color;
  }
  isdisabledForgot.value = true;
});

const changepswdbtn = computed(() => {
  if (pswd.value != "" && newPswd.value != "" && confirmNew.value != "") {
    isdisabledChange.value = false;
    const color = { backgroundColor: "#246b29" };
    return color;
  }
  isdisabledChange.value = true;
});

const deleteaccountbtn = computed(() => {
  if (accountDel.value != "" && pswd1.value != "") {
    isdisabledDelete.value = false;
    const color = { backgroundColor: "#b6442f" };
    return color;
  }
  isdisabledDelete.value = true;
});


onMounted(() => {
  fetchData();
});

const users = ref([]);
const fetchData = () => {
  if (process.client) {
    fetch(`${host_server}/users`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('users', JSON.stringify(data));
        const allUsers = JSON.parse(localStorage.getItem('users'));
        users.value = allUsers;
        //referesh data if user is logged in
        const oneuserlog = localStorage.getItem('user');
        if (oneuserlog) {
          filteredUsers.value = users.value.filter(
            (msg) => msg.username != oneuserlog);
        }
      });
  }
}

const refreshUsers = () => {
  pauseRefresh.value = true;
  setTimeout(() => {
    pauseRefresh.value = false;
  }, 2000);
  fetchData();
};

//Registration
const registerUser = () => {
  username.value = username.value.toLowerCase().trim();
  password.value = password.value.trim();
  confirm.value = confirm.value.trim();
  email.value = email.value.toLowerCase().trim();
  loadingMsg.value = true;
  loading.value = true;
  hideWaitMsg1.value = "";
  if(isConnected.value == true){
    if (email.value.includes("@")) {
      if (password.value == confirm.value) {
        fetch(`${host_server}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            confirm: confirm.value,
          }),
        })
          .then((response) => {
            if (response) {
              if (response.status === 200) {
                return response.json();
              } else if (response.status === 400) {
                validate();
                // popupMessage22();
                return response.json();
              } else if (response.status === 500) {
                popupMessage22();
                // errormsg.value = "Internal Server Error";
                return response.json();
              }
            } else {
              popupMessage2();
              // errormsg.value = "Internal Server Error";
              throw new Error("Server Error");
            }
          })
          .then((data) => {
            if (data.regUserMsg) {
              return registerError1(data.regUserMsg);
            }
            if (data.regUserMsg01) {
              return registerVerify(data.regUserMsg01);
            }
            else if (data.OTPmessage) {
              return popupMessage(data.OTPmessage);
            }
            else if (data.OTPmessage1) {
              return popupMessage1(data.OTPmessage1);
            }
          })
          .catch((error) => registerError(error.error));
      } else {
        const msg = "Password does not match!";
        return registerError1(msg);
      }
    } else {
      const msg = "Enter a valid Email!";
      return registerError1(msg);
    }
  }
else{
    setTimeout(() => {
    popupMessage2();
    setTimeout(() => {
      loading.value = false;
      loadingMsg.value = false;
      hideWaitMsg1.value = "SIGN UP";
      loadingMsg1.value = false;
      username.value = "";
      email.value = "";
      password.value = "";
      confirm.value = "";  
   }, 2000);
  }, 10000);
}
};

function popupMessage(OTPmessage) {
  setTimeout(() => {
    hideWaitMsg3.value = "RESET";
    loading.value = false;
    loadingMsg2.value = false;
    popupText.value = OTPmessage;
    showpopupMessage.value = true;
    loading.value = false;
    loadingMsg.value = false;
    hideWaitMsg.value = "SIGN IN";
    hideWaitMsg1.value = "SIGN UP";
    username.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
    setTimeout(() => {
      popupText.value = "";
      showpopupMessage.value = false;
    }, 8000);
  }, 2000);
}

function popupMessage1(OTPmessage1) {
  setTimeout(() => {
    hideWaitMsg3.value = "RESET";
    loading.value = false;
    loadingMsg2.value = false;
    popupText1.value = OTPmessage1;
    showpopupMessage1.value = true;
    loading.value = false;
    loadingMsg.value = false;
    hideWaitMsg.value = "SIGN IN";
    hideWaitMsg1.value = "SIGN UP";
    username.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
    setTimeout(() => {
      popupText1.value = "";
      showpopupMessage1.value = false;
    }, 8000);
  }, 2000);
}

function popupMessage2() {
  if (showpopupMessage.value != true && showpopupMessage1.value != true) {
    loading.value = false;
    setTimeout(() => {
      popupText2.value = "Sever or internet connection failure!";
      showpopupMessage2.value = true;
      setTimeout(() => {
        popupText2.value = "";
        showpopupMessage2.value = false;
      }, 8000);
    }, 2000);
  }
}

function popupMessage22() {
  if (showpopupMessage.value != true && showpopupMessage1.value != true) {
    loading.value = false;
    setTimeout(() => {
      popupText2.value = "Sever or internet connection failure!";
      showpopupMessage2.value = true;
      loading.value = false;
      loadingMsg.value = false;
      hideWaitMsg1.value = "SIGN UP";
      loadingMsg1.value = false;
      username.value = "";
      email.value = "";
      password.value = "";
      confirm.value = "";
      setTimeout(() => {
        popupText2.value = "";
        showpopupMessage2.value = false;
      }, 8000);
    }, 2000);
  }
}

function popupMessage33() {
  if (showpopupMessage.value != true && showpopupMessage1.value != true) {
    loading.value = false;
    setTimeout(() => {
      popupText2.value = "Sever or internet connection failure!";
      showpopupMessage2.value = true;
      loading.value = false;
      loadingMsg.value = false;
      hideWaitMsg3.value = "RESET";
      loadingMsg1.value = false;
      loadingMsg2.value = false;
      username.value = "";
      email.value = "";
      setTimeout(() => {
        popupText2.value = "";
        showpopupMessage2.value = false;
      }, 8000);
    }, 2000);
  }
}
const popupText3 = ref("");
const popupText4 = ref("");
const showpopupMessage3 = ref(false);
const showpopupMessage4 = ref(false);
function popupMessage3(pswdSuccess) {
  if (showpopupMessage.value != true && showpopupMessage1.value != true && showpopupMessage2.value != true) {
    setTimeout(() => {
      hideWaitMsg3Pswd.value = "CHANGE";
      hideWaitMsg3Pswd1.value = "DELETE";
      loading.value = false;
      popupText3.value = pswdSuccess;
      showpopupMessage3.value = true;
      hideProfile.value = true;
      showpasswordChange.value = false;
      showaccountDelete.value = false;
      pswd.value = "";
      pswd1.value = "";
      newPswd.value = "";
      confirmNew.value = "";
      accountDel.value = "";
      if (pswdSuccess == "Account has been deleted successfully") {
        logout();
      }
      setTimeout(() => {
        popupText3.value = "";
        showpopupMessage3.value = false;
      }, 8000);
    }, 2000);
  }
}

function popupMessage4(pswdError) {
  if (showpopupMessage.value != true && showpopupMessage1.value != true && showpopupMessage2.value != true) {
    setTimeout(() => {
      hideWaitMsg3Pswd.value = "CHANGE";
      hideWaitMsg3Pswd1.value = "DELETE";
      loading.value = false;
      popupText4.value = pswdError;
      showpopupMessage4.value = true;
      setTimeout(() => {
        popupText4.value = "";
        showpopupMessage4.value = false;
      }, 8000);
    }, 2000);
  }
}

function registerSuccess(regMsg) {
  setTimeout(() => {
    showVerify.value = false;
    showLog.value = true;
    showReg.value = false;
    loading.value = false;
    loadingMsg.value = false;
    hideWaitMsg1.value = "SIGN UP";
    loadingMsg1.value = false;
    hideWaitMsg2.value = "VERIFY"
    showsuccess.value = true;
    successMsg.value = regMsg;
    username.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
    userError01.value = "";
    otp1.value = "";
    otp2.value = "";
    otp3.value = "";
    otp4.value = "";
    setTimeout(() => {
      successMsg.value = "";
      showsuccess.value = false;
    }, 3000);
  }, 3000);
}

function registerError(error) {
  setTimeout(() => {
    loading.value = false;
    loadingMsg.value = false;
    hideWaitMsg1.value = "SIGN UP";
    loadingMsg1.value = false;
    hideWaitMsg2.value = "VERIFY";
    loadingMsg2.value = false;
    hideWaitMsg3.value = "RESET";
    username.value = "";
    email.value = "";
    password.value = "";
    confirm.value = "";
    otp1.value = "";
    otp2.value = "";
    otp3.value = "";
    otp4.value = "";
    showerror.value = true;
    errormsg.value = "Server Error or connection failure!";
    setTimeout(() => {
      errormsg.value = "";
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
    userError.value = "";
  }, 3000);
}

function verifyError(regUserMsg02) {
  if (resendLink.value != "") {
    setTimeout(() => {
      verifyOtp(regUserMsg02);
    }, 10000);
  }
  else {
    setTimeout(() => {
      verifyOtp(regUserMsg02);
    }, 1000);
  }
}

function verifyOtp(regUserMsg02) {
  let num = 10;
  otp1.value = "";
  otp2.value = "";
  otp3.value = "";
  otp4.value = "";
  loading.value = false;
  loadingMsg1.value = false;
  hideWaitMsg2.value = "VERIFY";
  userError02.value = regUserMsg02;
  resendLink.value = "RESEND"
  userError02Timer.value = 'in ' + num + 's';
  unclickable.value = true;
  if (num == 10) {
    setInterval(() => {
      if (num > 0) {
        num = num - 1;
        userError02Timer.value = 'in ' + num + 's';
      }
    }, 1000);
  }
  setTimeout(() => {
    unclickable.value = false;
    userError02.value = "";
    userError02Timer.value = "";
    resendLink.value = "";
  }, 11000);
}


function registerVerify1(regUserMsg01) {
  showVerify.value = true;
  setTimeout(() => {
    otp11.value.focus();
  }, 500);
  showLog.value = false;
  showReg.value = false;
  loading.value = false;
  loadingMsg.value = false;
  hideWaitMsg.value = "SIGN IN";
  hideWaitMsg1.value = "SIGN UP";
  userError01.value = regUserMsg01;
  userError02.value = "";
  userError02Timer.value = "";
  userError03.value = "";
  userError04.value = "";
  resendLink.value = "";
}
function registerVerify(regUserMsg01) {
  if (regUserMsg01.includes("New OTP has been resend to your Email")) {
    loading.value = true;
    showresend.value = true;
    userError01.value = "";
    userError03.value = "";
    userError04.value = "";
    setTimeout(() => {
      loading.value = false;
      showresend.value = false;
      registerVerify1(regUserMsg01)
    }, 11000);
  }
  else {
    registerVerify1(regUserMsg01)
    userError03.value = "Click Here";
    userError04.value = "to get a new OTP";
  }
}

//Verification
const verifyUser = () => {
  otp.value = otp1.value.concat(otp2.value, otp3.value, otp4.value).trim();
  loadingMsg1.value = true;
  loading.value = true;
  hideWaitMsg2.value = "";
  if (username.value == "") {
    verifyUser001(user.value.username);
  }
  else {
    verifyUser001(username.value);
  }
};

const verifyUser001 = (userName) => {
  fetch(`${host_server}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      otp: otp.value,
    }),
  })
    .then((response) => {
      if (response) {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        }
      } else {
        errormsg.value = "Internal Server Error";
        throw new Error("Server Error");
      }
    })
    .then((data) => {
      if (data.regMsg) {
        return registerSuccess(data.regMsg);
      } else if (data.regUserMsg02) {
        return verifyError(data.regUserMsg02);
      }
    })
    .catch((error) => registerError(error.error));
}


const registerOtpResend1 = (userName) => {
  fetch(`${host_server}/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName
    }),
  })
    .then((response) => {
      if (response) {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return response.json();
        }
      } else {
        errormsg.value = "Internal Server Error";
        throw new Error("Server Error");
      }
    })
    .then((data) => {
      if (data.regUserMsg01) {
        return registerVerify(data.regUserMsg01);
      }
      if (data.OTPmessage) {
        return popupMessage(data.OTPmessage);
      }
      else if (data.OTPmessage1) {
        return popupMessage1(data.OTPmessage1);
      }
    })
    .catch((error) => registerError(error.error));
};

const registerOtpResend = () => {
  if (username.value == "") {
    registerOtpResend1(user.value.username);
  }
  else {
    registerOtpResend1(username.value);
  }
};

const resetPswdError = (resetError) => {
  hideWaitMsg3.value = "RESET";
  loadingMsg2.value = false;
  loading.value = false;
  username.value = "";
  email.value = "";
  forgotError.value = resetError;
  setTimeout(() => {
    forgotError.value = "";
  }, 5000);
};

const resetPswdSuccess = (resetSuccess) => {
  hideWaitMsg3.value = "RESET";
  loadingMsg2.value = false;
  loading.value = false;
  showLog.value = false;
  showReg.value = false;
  showForgot.value = false;
  showForgotSuccess.value = true;
  username.value = "";
  email.value = "";
  forgotSuccess.value = resetSuccess;
};

//Login
const login = () => {
  loadingMsg.value = true;
  loading.value = true;
  hideWaitMsg.value = "";
  hideFeedback.value = true;
  username.value = username.value.toLowerCase().trim();
  password.value = password.value.trim();
  if (isConnected.value == true) {
    socket.emit("login", { username: username.value, password: password.value });
    setTimeout(() => {
      loadingMsg.value = false;
      loading.value = false;
      hideWaitMsg.value = "SIGN IN";
      username.value = "";
      password.value = "";
    }, 2000)
  }
  else {
    setTimeout(() => {
      popupMessage2();
      setTimeout(() => {
        loadingMsg.value = false;
        loading.value = false;
        hideWaitMsg.value = "SIGN IN";
        username.value = "";
        password.value = "";
      }, 2000);
    }, 10000);
  }
};


//Reset password
const resetPassword = () => {
  username.value = username.value.toLowerCase().trim();
  email.value = email.value.toLowerCase().trim();
  loadingMsg2.value = true;
  loading.value = true;
  hideWaitMsg3.value = "";
  if (isConnected.value == true) {
    fetch(`${host_server}/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
      }),
    })
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            popupMessage33();
            return response.json();
          } else if (response.status === 500) {
            popupMessage33();
            return response.json();
          }
        } else {
          errormsg.value = "Internal Server Error";
          throw new Error("Server Error");
        }
      })
      .then((data) => {
        if (data.resetSuccess) {
          return resetPswdSuccess(data.resetSuccess);
        }
        else if (data.resetError) {
          return resetPswdError(data.resetError);
        }
        else if (data.OTPmessage) {
          return popupMessage(data.OTPmessage);
        }
        else if (data.OTPmessage1) {
          return popupMessage1(data.OTPmessage1);
        }
      })
      .catch((error) => console.log(error));
  }
  else {
    popupMessage2();
    setTimeout(() => {
      loadingMsg2.value = false;
      loading.value = false;
      hideWaitMsg3.value = "RESET";
      username.value = "";
      email.value = "";
    }, 2000);
  }
};


//Change password
const pswd = ref("");
const newPswd = ref("");
const confirmNew = ref("");
const hideWaitMsg3Pswd = ref("CHANGE")
const changePassword = () => {
  pswd.value = pswd.value.trim();
  newPswd.value = newPswd.value.trim();
  confirmNew.value = confirmNew.value.trim();
  hideWaitMsg3Pswd.value = "Changing...";
  if (newPswd.value === confirmNew.value) {
    loading.value = true;
    fetch(`${host_server}/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.value.username,
        pswd: pswd.value,
        newPassword: newPswd.value,
      }),
    })
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            return response.json();
          } else if (response.status === 500) {
            return response.json();
          }
        } else {
          errormsg.value = "Internal Server Error";
          throw new Error("Server Error");
        }
      })
      .then((data) => {
        if (data.pswdMessage) {
          return popupMessage3(data.pswdMessage);
        }
        else if (data.pswdMessage1) {
          return popupMessage4(data.pswdMessage1);
        }
      })
      .catch((error) => console.log(error));
  }
  else {
    const pswdmatch = "New password does not match. Confirm again"
    return popupMessage4(pswdmatch);
  }
};


//delete account
const pswd1 = ref("");
const accountDel = ref("");
const hideWaitMsg3Pswd1 = ref("DELETE");
const deleteAccount = () => {
  pswd1.value = pswd1.value.trim();
  accountDel.value = accountDel.value.trim();
  hideWaitMsg3Pswd1.value = "Deleting...";
  loading.value = true;
  if (user.value !== null) {
    const userToDel = user.value.username;
    if (accountDel.value === `I want to delete ${userToDel} account`) {
      fetch(`${host_server}/deleteAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.value.username,
          pswd1: pswd1.value,
          accountDel: accountDel.value,
        }),
      })
        .then((response) => {
          if (response) {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 400) {
              return response.json();
            } else if (response.status === 500) {
              return response.json();
            }
          } else {
            errormsg.value = "Internal Server Error";
            throw new Error("Server Error");
          }
        })
        .then((data) => {
          if (data.pswdMessage) {
            return popupMessage3(data.pswdMessage);
          }
          else if (data.pswdMessage1) {
            return popupMessage4(data.pswdMessage1);
          }
        })
        .catch((error) => console.log(error));
    }
    else {
      const typingError = "You typed wrongly. Type the extact words!"
      return popupMessage4(typingError);
    }
  }
  else {
    const logError = "Login session has expired. Refresh to login again!"
    return popupMessage4(logError);
  }
};


onMounted(() => {
  // Listen for login success or failure events
  socket.on("loginSuccess", (userData, userToken) => {
    fetchProfileImage();
    loadingMsg.value = false;
    loading.value = false;
    hideWaitMsg.value = "SIGN IN";
    user.value = userData;
    filteredUsers.value = users.value.filter(
      (msg) => msg.username !== user.value.username
    );
    token.value = userToken;
    localStorage.setItem("user", user.value.username);
    localStorage.setItem("token", token.value);
    localStorage.setItem("email", user.value.email);
    localStorage.setItem('userinfo', JSON.stringify(user.value))
    hide.value = false;
    hide1.value = true;
    isActive.value = true;
    hide2.value = true;
    // if (user.value.profile_image) {
    //   // imageUrl.value = `${host_server}/uploads/${user.value.profile_image}`
    //   imageUrl.value = `data:image/jpeg;base64,${data.imageData}`;
    // }
    // else {
    //   imageUrl.value = profileImage;
    // }
    setTimeout(() => {
      hideFeedback.value = false;
    }, 3000);
  });

  socket.on("loginFailure", (error) => {
    loadingMsg.value = false;
    loading.value = false;
    hideWaitMsg.value = "SIGN IN";
    loginMsg.value = error.message;
    username.value = "";
    password.value = "";
    hideFeedback.value = true;
    setTimeout(() => {
      loginMsg.value = "";
      hideFeedback.value = false;
    }, 3000);
  });

  socket.on("loginUnverified", (user1, error) => {
    const regUserMsg01 = error.regUserMsg01;
    registerVerify(regUserMsg01);
    user.value = user1;
  });

  socket.on("storedMessages", (messagez1) => {
    const messagez = JSON.parse(JSON.stringify(messagez1));
    chatMessages.value = [...messagez1];
    const userMessage = messagez.filter(
      (msg) => msg.recipientUsername === user.value.username
    );
    const userMessage1 = messagez.filter(
      (msg) => msg.senderUsername === user.value.username
    );
    filteredSenders.value = [...userMessage];

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
        if (objValue.includes(objValue2)) {
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

    const newMsgArray = messages1.value.map((obj) => {
      const count = filteredSenders.value.filter(
        (item) =>
          item.senderUsername === obj.senderUsername && item.mark === "unread"
      ).length;
      return {
        ...obj,
        totalUnreadMsgs: count,
      };
    });
    messages1.value = newMsgArray;
    const totalValue = messages1.value.reduce(
      (acc, curr) => acc + curr.totalUnreadMsgs,
      0
    );
    totalMsgs.value = totalValue;
  });
});

const sendMessage = () => {
  message.value = message.value.trim();

  if (isConnected.value == true) {
    socket.emit("sendMessage", {
      id: checktime(),
      senderUsername: user.value.username,
      recipientUsername: recipientUsername.value,
      message: message.value,
      time: currenttime(),
      mark: "unread",
      date: Date.now()
    });
  }
  else {
    popupMessage2();
  }
  messages.value.push({
    id: checktime(),
    senderUsername: user.value.username,
    recipientUsername: recipientUsername.value,
    message: message.value,
    time: currenttime(),
  });
  chatMessages.value.push({
    id: checktime(),
    senderUsername: user.value.username,
    recipientUsername: recipientUsername.value,
    message: message.value,
    time: currenttime(),
  });
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
    messages1.value.unshift({
      id: checktime(),
      senderUsername: recipientUsername.value,
      message: message.value,
      time: currenttime(),
      totalUnreadMsgs: 0
    });
  }
  if (messages.value.length < 3) {
    scrollToTop();
    scrollToTop1();
  }
  message.value = "";
};

socket.on("receiveMessage", ({ senderUsername, message, totalUnread, date }) => {
  if (
    senderUsername != user.value.username &&
    senderUsername == recipientUsername.value
  ) {
    messages.value.push({
      id: checktime(),
      senderUsername: senderUsername,
      message: message,
      time: currenttime(),
      date: date
    });
  }

  //check if the receiver is already in the show messager page 
  // just to view the msgs and don't add the unread to the inbox page(set it to zero)
  // else add them to inbox page and inbox button
  var newmessage = [];
  if (msgSender.value.innerText == senderUsername) {
    if (isConnected.value == true) {
      socket.emit("markAsRead", (user.value.username), (senderUsername));
    }
    else {
      popupMessage2();
    }
    newmessage = {
      id: checktime(),
      senderUsername: senderUsername,
      message: message,
      time: currenttime(),
      totalUnreadMsgs: 0
    };
  }
  else {
    newmessage = {
      id: checktime(),
      senderUsername: senderUsername,
      message: message,
      time: currenttime(),
      totalUnreadMsgs: totalUnread
    };
  }


  chatMessages.value.push({
    id: checktime(),
    senderUsername: senderUsername,
    recipientUsername: user.value.username,
    message: message,
    time: currenttime(),
  });

  //check if there is a name same as the incoming msg sendername or inshort after pushing the new message remove the old one
  const newvalue = newmessage.senderUsername;
  for (let i = 0; i < messages1.value.length; i++) {
    if (messages1.value[i].senderUsername === newvalue) {
      messages1.value.splice(i, 1);
      break;
    }
  }
  messages1.value.unshift(newmessage);
  const totalValue = messages1.value.reduce(
    (acc, curr) => acc + curr.totalUnreadMsgs,
    0
  );
  totalMsgs.value = totalValue;
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

const checktime = () => {
  const currentDate = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfWeek = currentDate.getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[dayOfWeek];
  const dayOfMonth = currentDate.getDate();
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currenttime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  const formattedDate = `${dayName}, ${dayOfMonth} ${monthName} ${year}, ${hours}:${minutes < 10 ? "0" + minutes : minutes
    }`;
  return formattedDate;
};

const currenttime = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currenttime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  return currenttime;
};
const logout = () => {
  localStorage.removeItem("user");
  hide.value = true;
  hide2.value = false;
  loginMsg.value = "";
  username.value = "";
  password.value = "";
  logoutshown.value = false;
  isActive.value = false;
  isActive1.value = false;
  isActive2.value = false;
  isActive3.value = false;
  loading.value = false;
  showinbox.value = false;
  showmessenger.value = false;
  showStartChat.value = false;
  showprofile.value = false;
};

//upload or edit profile photo
import profileImage from '~/assets/images/user_profile.svg'

const imageUrl = ref(profileImage);
const imageFile = ref(null);
const imageInput = ref(null);

// const uploadImage = async () => {
//   const username = user.value.username;
//   const formData = new FormData();
//   formData.append('image', imageFile.value);
//   formData.append('username', username);

//   try {
//     const response = await fetch(`${host_server}/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Server Error:', errorData.error);
//       return;
//     }

//     const data = await response.json();
//     // Now we are receiving base64 image data
//     imageUrl.value = `data:image/jpeg;base64,${data.imageData}`;

//   } catch (error) {
//     console.error("Error in uploading image:", error);
//   }
// }

const uploadImage = async () => {
  const username = user.value.username;
  const formData = new FormData();
  formData.append('image', imageFile.value);
  formData.append('username', username);

  try {
    isImageLoading.value = true; // Start loading when uploading
    const response = await fetch(`${host_server}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // After uploading, fetch the new profile image
    if (data.filename) {
      await fetchProfileImage(); // Refresh the profile image after upload
    }

    isImageLoading.value = false; // Stop loading after upload and fetch
  } catch (error) {
    console.error('Error in uploading image:', error);
    isImageLoading.value = false; // Stop loading even if error happens
  }
};


const chooseImage = (event) => {
  imageInput.value.click();
}

const onFileChange = (event) => {
  imageFile.value = event.target.files[0];
  uploadImage();
}

// const fetchProfileImage = async () => {
//   const username = user.value.username;
//   try {
//     const response = await fetch(`${host_server}/get-profile-image/${username}`);
//     const data = await response.json();
//     if (data.imageData) {
//       imageUrl.value = `data:image/jpeg;base64,${data.imageData}`;
//     } else {
//       imageUrl.value = profileImage; // default local image
//     }
//   } catch (error) {
//     console.error('Error fetching profile image:', error);
//   }
// };

const isImageLoading = ref(true); // Add a loading flag

const fetchProfileImage = async () => {
  const username = user.value.username;
  try {
    const response = await fetch(`${host_server}/get-profile-image/${username}`);
    const data = await response.json();
    if (data.imageData) {
      imageUrl.value = `data:image/jpeg;base64,${data.imageData}`;
    } else {
      imageUrl.value = profileImage; // fallback to default
    }
    isImageLoading.value = false; // Set loading flag to false once image is loaded
  } catch (error) {
    console.error('Error fetching profile image:', error);
    isImageLoading.value = false; // Set loading flag to false even if there's an error
  }
};


const usernameInput = ref(null);
const hasError = ref(false);
function validate() {
  nextTick(() => {
      const inputEl = usernameInput.value
      inputEl.focus()

      // 👇 Set cursor to the end of the input
      const length = inputEl.value.length
      inputEl.setSelectionRange(length, length)
      hasError.value = true;
    });
}
function onInput() {
  hasError.value = false; // Remove red border on user input
}
const modalOpen = ref(false);
const showtest = ref(true);
</script>

<template>
  <!-- message popup at the top div either error or success -->
  <div v-show="showpopupMessage"
    class="flex items-center absolute left-1 right-1 mx-auto w-fit top-2 justify-center z-20 bg-[#b5cab8] px-2.5 py-2 text-[13px] rounded-sm font-medium font-[quicksand] text-green-800">
    <img src="@/assets/images/success_img.png" class="h-4 w-4">&nbsp;
    <span>{{ popupText }}</span>
  </div>
  <div v-show="showpopupMessage1"
    class="flex items-center absolute w-fit left-1 right-1 mx-auto  top-2 text-center z-20 bg-[#b5cab8] px-2.5 py-1.5 text-[13px] rounded-sm font-medium font-[quicksand] text-[#ca4f4a]">
    <img src="@/assets/images/error_img.png" class="h-4 w-4">&nbsp;
    <span>{{ popupText1 }}</span>
  </div>
  <div v-show="showpopupMessage2"
    class="flex items-center absolute w-fit left-1 right-1 mx-auto  top-2 text-center z-20 bg-[#b5cab8] px-2.5 py-1.5 text-[13px] rounded-sm font-medium font-[quicksand] text-[#ca4f4a]">
    <img src="@/assets/images/error_img.png" class="h-4 w-4">&nbsp;
    <span>{{ popupText2 }}</span>
  </div>
  <div v-show="showpopupMessage3"
    class="flex items-center absolute w-fit left-1 right-1 mx-auto  top-2 text-center z-20 bg-[#b5cab8] px-2.5 py-1.5 text-[13px] rounded-sm font-medium font-[quicksand] text-green-800">
    <img src="@/assets/images/success_img.png" class="h-4 w-4">&nbsp;
    <span>{{ popupText3 }}</span>
  </div>
  <div v-show="showpopupMessage4"
    class="flex items-center absolute w-fit left-1 right-1 mx-auto  top-2 text-center z-20 bg-[#b5cab8] px-2.5 py-1.5 text-[13px] rounded-sm font-medium font-[quicksand] text-[#ca4f4a]">
    <img src="@/assets/images/error_img.png" class="h-4 w-4">&nbsp;
    <span>{{ popupText4 }}</span>
  </div>

  <!-- outer div to be shown when loading or sending data to server -->
  <div :class="{ 'pointer-events-none': loading }">

    <!-- div for registration, verification, forgot password & login forms -->
    <div v-show="hide">

      <!-- error/sucess messages -->
      <div class="absolute bg-[#00000080] h-full w-[100%] z-10 flex justify-center items-center text-sm"
        v-show="showsuccess" @click="resetSuccess">
        <p class="bg-[#ACEEAC] py-3 px-3 mx-3 text-center">{{ successMsg }}</p>
      </div>
      <div class="absolute bg-[#00000080] h-full w-[100%] z-10 flex justify-center items-center text-sm"
        v-show="showerror" @click="resetError">
        <p class="bg-[#742929] text-white py-3 px-5">{{ errormsg }}</p>
      </div>

      <!-- registration form -->
      <div v-show="showReg" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
          <h2 class="text-[25px] text-[#A4A716]">CREATE eCHAT ACCOUNT</h2>
        </div>
        <span class="font-semibold text-[#970606] font-[quicksand] text-center text-[13px]">{{ userError }}</span>
        <div class="mx-auto py-2 flex flex-col gap-8 regbox1">
          <div class="flex flex-col">
            <label for="username">Username</label>
            <input type="text" ref="usernameInput" @input="onInput" :class="[hasError ? 'input-error' : '', 'custom-input']" class="placeholder:text-[14px]" v-model="username" maxlength="20" id="username"
              placeholder="max. 20 characters e.g musajoseph" />
          </div>
          <div class="flex flex-col">
            <label for="email">Email</label>
            <input type="text" class="placeholder:text-[14px] custom-input" v-model="email" maxlength="50" id="email"
              placeholder="e.g musa@gmail.com" @blur="changeCase" />
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="custom-input" maxlength="30" id="password" />
          </div>
          <div class="flex flex-col">
            <label for="confirm">Confirm Password</label>
            <input type="password" v-model="confirm" class="custom-input" maxlength="30" id="confirm" />
          </div>
          <button @click="registerUser"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-[5px] text-[18px] text-white h-[45px]"
            :style="regbtn" :disabled="isdisabledReg">
            {{ hideWaitMsg1
            }}<span v-show="loadingMsg" class="loadingMsg"><img src="@/assets/images/waiting_img.png" />Please
              wait...</span>
          </button>
          <div class="flex mx-auto gap-2 text-[15px] font-bold">
            <span class="text-[#236E98]">Already have an account?</span>
            <button @click="toggleLogReg" class="text-[#0912DB] underline decoration-1 hover:cursor-pointer">
              Sign in
            </button>
          </div>
        </div>
      </div>

      <!-- verification form -->
      <div v-show="showVerify" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
          <h2 class="text-[25px] text-[#A4A716]">CREATE eCHAT ACCOUNT</h2>
        </div>
        <div class="text-center text-[13px] font-medium font-[quicksand]"><span class="text-[rgb(151,6,6)]">{{
    userError02
  }}&nbsp;&nbsp;</span>
          <span @click="registerOtpResend" class="cursor-pointer text-[#0912DB] underline"> {{ resendLink }}
          </span>&nbsp;<span class="text-[#0912DB]"> {{
    userError02Timer }}</span>
        </div>
        <div :class="{ 'pointer-events-none': unclickable }" class="mx-auto px-5 w-fit font-light text-[14px] mb-5">
          <span class="text-[#084407]">{{
    userError01
  }}</span>&nbsp;<span class="text-[#1d1f4b] underline cursor-pointer" @click="registerOtpResend">{{
    userError03 }}</span>&nbsp;<span class="text-[#084407]">{{ userError04
            }}</span>
        </div>
        <div class="justify-center text-[14px] font-[quicksand] flex items-center" v-show="showresend">
          <img src="@/assets/images/loader.gif" class="h-5">&nbsp;<span>resending OTP...</span>
        </div>
        <div class="mx-auto py-2 flex flex-col gap-8 regbox mt-6">
          <div class="flex gap-8 mx-5">
            <input type="text" ref="otp11" @input="nextOtp1" :disabled="isdisabledOtpInput1" v-model="otp1"
              maxlength="1" style="width: 45px;height: 55px;font-size: 28px;font-weight: 400;text-align: center" />
            <input type="text" ref="otp22" @input="nextOtp2" :disabled="isdisabledOtpInput2" v-model="otp2"
              maxlength="1" style="width: 45px;height: 55px;font-size: 28px;font-weight: 400;text-align: center" />
            <input type="text" ref="otp33" @input="nextOtp3" :disabled="isdisabledOtpInput3" v-model="otp3"
              maxlength="1" style="width: 45px;height: 55px;font-size: 28px;font-weight: 400;text-align: center" />
            <input type="text" ref="otp44" :disabled="isdisabledOtpInput4" v-model="otp4" maxlength="1"
              style="width: 45px;height: 55px;font-size: 28px;font-weight: 400;text-align: center" />
          </div>
          <button @click="verifyUser"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-[5px] text-[18px] text-white h-[45px]"
            :style="otpbtn" :disabled="isdisabledOtp">
            {{ hideWaitMsg2
            }}<span v-show="loadingMsg1" class="loadingMsg"><img
                src="@/assets/images/waiting_img.png" />Verifying...</span>
          </button>
          <div class="flex mx-auto gap-2 text-[14px] font-bold">
            <span class="text-[#236E98] cursor-pointer" @click="toggleLogReg1">Back to Login</span>
          </div>
        </div>
      </div>

      <!-- forgot password form -->
      <div v-show="showForgot" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
          <h2 class="text-[25px] text-[#A4A716]">RESET ACCOUNT PASSWORD</h2>
        </div>
        <div class="text-center text-[13px] font-medium font-[quicksand]"><span class="text-[rgb(151,6,6)]">{{
    forgotError
  }}</span>
        </div>
        <div class="mx-auto py-2 flex flex-col gap-8 regbox mt-6">
          <div class="flex flex-col">
            <label for="username">Enter your username</label>
            <input type="text" v-model="username" maxlength="20" id="username" />
          </div>
          <div class="flex flex-col">
            <label for="email">Enter your email</label>
            <input type="text" v-model="email" maxlength="50" id="email" @blur="changeCase" />
          </div>
          <button @click="resetPassword"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-[5px] text-[18px] text-white h-[45px]"
            :style="forgotbtn" :disabled="isdisabledForgot">
            {{ hideWaitMsg3
            }}<span v-show="loadingMsg2" class="loadingMsg"><img src="@/assets/images/waiting_img.png" />Please
              wait...</span>
          </button>
          <div class="flex mx-auto gap-2 text-[14px] font-bold">
            <span class="text-[#236E98] cursor-pointer" @click="toggleLogReg2">Back to Login</span>
          </div>
        </div>
      </div>

      <!-- reset password success div -->
      <div v-show="showForgotSuccess" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
          <h2 class="text-[25px] text-[#A4A716]">RESET ACCOUNT PASSWORD</h2>
        </div>
        <div class="text-center text-[15px] mx-5 mt-10 font-semibold font-[quicksand]"><span class="text-[#084407]">{{
    forgotSuccess
  }}</span>
        </div>
        <div class="mx-auto py-2 flex flex-col regbox mt-6">
          <div class="flex mx-auto gap-2 text-[15px] font-bold font-[quicksand]">
            <span class="text-[#0912DB] cursor-pointer underline" @click="toggleForgot1">LOGIN NOW</span>
          </div>
        </div>
      </div>


      <!--- login form -->
      <div v-show="showLog" class="flex flex-col justify-center">
        <div class="bg-[#236E98] text-center pt-3 pb-6 mb-8 font-[quicksand] font-bold w-[99%] mx-auto">
          <h2 class="text-[32px] text-[#A4A716]">eCHAT</h2>
        </div>
        <h3 class="text-[#084407] font-bold text-[20px] text-center mb-5">
          USER LOGIN
        </h3>
        <span class="font-light text-[#970606] text-center text-[13.5px]" v-show="hideFeedback">{{
    loginMsg }}</span>
        <div class="mx-auto py-5 flex flex-col gap-10">
          <div class="custom-input">
            <input type="text" v-model="username" maxlength="50" @input="isFocused = true" @blur="isFocused = false"
              placeholder="Username" />
            <div class="placeholder-image" v-show="!username && !isFocused"></div>
          </div>
          <div class="custom-input">
            <input type="password" v-model="password" maxlength="50" @input="isFocused1 = true"
              @blur="isFocused1 = false" placeholder="Password" />
            <div class="placeholder-image1" v-show="!password && !isFocused1"></div>
          </div>
          <button @click="login" :style="logbtn" :disabled="isdisabledLog"
            class="my-5 bg-[#E0DEEA] font-bold font-[quicksand] rounded-3xl text-[18px] text-white h-[45px]">
            {{ hideWaitMsg
            }}<span v-show="loadingMsg" class="loadingMsg"><img src="@/assets/images/waiting_img.png" />Please
              wait...</span>
          </button>
          <div class="flex justify-between text-[#0912DB] font-bold text-sm">
            <span class="hover:cursor-pointer" @click="toggleForgot">Forgot Password</span>
            <span @click="toggleLogReg" class="hover:cursor-pointer">Create an Account</span>
          </div>
        </div>
      </div>
    </div>


    <!-- main div with navigation menu div, home page div, members div, profile div & logout div -->
    <div v-show="hide2">
      <!-- navigation menu div -->
      <div v-show="displayMenu" :class="{
    '-translate-x-[100%]': isCollapsed,
    'translate-x-[0%]': !isCollapsed,
  }" class="transition ease-in-out duration-[1s] absolute pl-4 list-none z-20 bg-[#888DED] text-[#031187] w-[55%] h-screen flex flex-col gap-6 font-semibold font-[quicksand] text-[18px]">
        <div class="w-7 mt-4 mb-4 cursor-pointer" @click="hidemenu">
          <img src="@/assets/images/close.svg" />
        </div>
        <div class="flex flex-col gap-6 mx-3">
          <li @click="toggleprofile" class="w-fit hover:cursor-pointer" :class="{ active: isActive3 }">
            Profile
          </li>
          <li @click="togglehome" class="w-fit hover:cursor-pointer" :class="{ active: isActive }">
            Home
          </li>
          <li @click="togglestartChat" class="w-fit hover:cursor-pointer" :class="{ active: isActive1 }">
            Members
          </li>
          <li @click="toggleshown" class="w-fit hover:cursor-pointer" :class="{ active: isActive2 }">
            Logout
          </li>
        </div>
      </div>

      <!-- profile div -->
      <div v-show="showprofile" class="sm:hidden font-[quicksand]">
        <div class="flex flex-col gap-10 text-center" v-show="hideProfile">
          <div class="flex mx-3 mt-3">
            <span class="w-[10%] cursor-pointer" @click="showmenu"><img src="@/assets/images/menu.svg" /></span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-[20%] rounded-[50%] h-[75px] flex flex-col">
              <img v-if="isImageLoading" src="/imgloader.gif" alt="Loading..." />
              <img v-else :src="imageUrl" class="rounded-[100%] w-[100%] h-[100%]" /><br>
            </div>
            <div class="px-1 rounded-sm w-fit">
              <button @click="chooseImage" class="profileinput text-[14px]" style="color: #0821a1;">Edit photo</button>
              <input type="file" accept="image/*" @change="onFileChange" class="hidden" ref="imageInput">
            </div>
            <div class="mt-5 flex flex-col gap-10 items-start mx-auto">
              <div class="inputdivs">
                <label for="username1">Username:</label>
                <input type="text" :value="user.username" class="profileinput" v-if="user" disabled>
              </div>
              <div class="inputdivs">
                <label for="email1">Email:</label>
                <input type="text" :value="user.email" class="profileinput" style="width:240px;" v-if="user" disabled>
              </div>
              <div class="inputdivs">
                <label for="password1">Password:</label>
                <input type="text" value="********" class="profileinput" style="width:150px;" disabled><button
                  @click="togglepassword" class="profileinput1 px-1 rounded-sm"
                  style="background-color: #6999b1;">Change</button>
              </div>
              <div class="inputdivs">
                <label for="account">Account:</label>
                <input type="text" value="active" class="profileinput" style="width:150px;" disabled><button
                  @click="toggledelete" class="profileinput1 px-1 rounded-sm"
                  style="background-color: brown;">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div v-show="showpasswordChange" class="flex flex-col justify-center">
          <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
            <h2 class="text-[25px] text-[#A4A716]">CHANGE ACCOUNT PASSWORD</h2>
          </div>
          <div class="mx-auto py-2 flex flex-col gap-8 regbox mt-6">
            <div class="flex flex-col">
              <label for="paswd1">Enter Old Password</label>
              <input type="password" v-model="pswd" maxlength="20">
            </div>
            <div class="flex flex-col">
              <label for="paswd2">Enter New Password</label>
              <input type="password" v-model="newPswd" maxlength="20">
            </div>
            <div class="flex flex-col">
              <label for="paswd3">Confirm New Password</label>
              <input type="password" v-model="confirmNew" maxlength="20">
            </div>
            <div class="flex justify-between">
              <button @click="changePassword"
                class="my-5 px-2 bg-[#E0DEEA] font-bold font-[quicksand] w-[40%] rounded-[5px] text-[16px] text-white h-[40px]"
                :style="changepswdbtn" :disabled="isdisabledChange">
                {{ hideWaitMsg3Pswd }}
              </button>
              &nbsp;&nbsp;
              <button @click="passwordCancel"
                class="my-5 px-2 bg-[#44a9b1] font-bold font-[quicksand] w-[40%] rounded-[5px] text-[16px] text-white h-[40px]">
                CANCEL
              </button>
            </div>
          </div>
        </div>
        <div v-show="showaccountDelete" class="flex flex-col justify-center">
          <div class="bg-[#236E98] text-center py-3 mb-4 font-[quicksand] w-[99%] mx-auto font-bold">
            <h2 class="text-[25px] text-[#A4A716]">DELETE YOUR ACCOUNT</h2>
          </div>
          <div class="mx-auto py-2 flex flex-col gap-8 regbox mt-6">
            <div class="flex flex-col">
              <label for="account1" v-if="user">Type:&nbsp;<span class="text-[brown]">I want to delete {{
    user.username }}
                  account</span></label>
              <label for="account1" v-else>Type: <span class="text-[brown]">I want to delete account</span></label>
              <input type="text" v-model="accountDel" maxlength="100">
            </div>
            <div class="flex flex-col">
              <label for="account2">Enter your password</label>
              <input type="password" v-model="pswd1" maxlength="100">
            </div>
            <div class="flex justify-between">
              <button @click="deleteAccount"
                class="my-5 px-2 bg-[#E0DEEA] font-bold font-[quicksand] w-[40%] rounded-[5px] text-[16px] text-white h-[40px]"
                :style="deleteaccountbtn" :disabled="isdisabledDelete">
                {{ hideWaitMsg3Pswd1 }}
              </button>
              &nbsp;&nbsp;
              <button @click="passwordCancel"
                class="my-5 px-2 bg-[#44a9b1] font-bold font-[quicksand] w-[40%] rounded-[5px] text-[16px] text-white h-[40px]">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- logout div -->
      <div v-show="logoutshown"
        class="z-20 font-medium text-[15px] font-[quicksand] border-2 border-gray-200 top-52 absolute w-[80%] h-40 bg-blue-200 inset-x-0 max-w-sm mx-auto pointer-events-auto flex flex-col justify-between">
        <span class="mx-auto mt-[5%]">Logout?</span>
        <span class="text-[14px] mx-auto my-4">Are you sure you want to logout?</span>
        <div class="flex gap-20 justify-between mx-5 mb-5 font-semibold">
          <span @click="logout" class="px-5 py-1 text-[#0A5B09] hover:cursor-pointer hover:bg-[#d3cdcd]">YES</span>
          <span @click="cancelLog" class="hover:bg-[#d3cdcd] hover:cursor-pointer text-[#970606] py-1 px-5">NO</span>
        </div>
      </div>

      <!-- home page div containing start chat/members and inbox divs-->
      <div v-show="hide1" class="sm:hidden">
        <div class="flex flex-col gap-10 text-center">
          <div class="flex justify-between mx-3 mt-3">
            <span class="w-[10%] cursor-pointer" @click="showmenu"><img src="@/assets/images/menu.svg" /></span>
            <span class="w-[18%] rounded-[50%] h-[70px] hover:cursor-pointer"><img :src="imageUrl"
                class="rounded-[100%] h-[100%] w-[100%]" /></span>
          </div>
          <span class="font-[quicksand] text-[30px] text-[#A4A716] my-5 leading-10 font-bold">Welcome to Fast Chat
            Web
            App</span>
          <div class="flex w-fit mx-auto gap-8">
            <div class="flex flex-col hover:cursor-pointer" @click="togglestartChat">
              <span class=""><img src="@/assets/images/chat.png" class="w-[78%]" /></span>
              <button class="-mt-1">start chat</button>
            </div>
            <div class="flex flex-col hover:cursor-pointer relative" @click="toggleinbox">
              <div v-if="totalMsgs != 0"
                class="bg-[#CE0909] absolute right-0 text-white text-[10px] font-semibold flex items-center justify-center h-5 w-auto rounded-full px-2">
                <span>{{ totalMsgs }}</span>
              </div>
              <span class="mt-[-9px]"><img src="@/assets/images/inbox.png" class="w-[65px] h-[65px]" /></span>
              <button class="mt-[-7.5px]">inbox</button>
            </div>
          </div>
        </div>
      </div>

      <!-- members div (start chat) -->
      <div v-show="showStartChat" class="h-screen flex flex-col justify-between">
        <div class="px-2 pt-5 flex flex-col gap-2 bg-slate-50">
          <div class="flex justify-between">
            <span class="w-[10%] cursor-pointer" @click="showmenu"><img src="@/assets/images/menu.svg"
                class="w-[36px] h-[32px]" /></span>
            <div class="flex self-end gap-2">
              <span class="w-6"><img src="@/assets/images/search.png" /></span>
              <span class="w-5"><img src="@/assets/images/menu_btn.png" /></span>
            </div>
          </div>
          <span class="font-[quicksand] font-medium text-[14px] self-center">SELECT A MEMBER TO START CHAT</span>
        </div>
        <div class="w-fit flex z-20">
          <button @click="refreshUsers" class="absolute right-4 p-1"><img src=" @/assets/images/refresh.png" class="w-7"
              :class="{ 'loadingrefresh': pauseRefresh }" /></button>
        </div>
        <ul class="ml-2 mr-1 overflow-y-auto mb-2 flex-1">
          <li class="flex gap-3 hover:cursor-pointer mt-0.5 h-[60px] bg-[#f8f5f5]" v-for="(item, index) in filteredUsers"
            :key="index" @click="getRecipient(item, index)" ref="recipientRefs">
            <div class="w-[48px] self-center h-[48px] rounded-[100%] p-1">
              <img src="@/assets/images/user_profile.svg" class="w-[100%] h-[100%]" />
            </div>
            <div class="self-center">
              <span>{{ item.username }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- inbox messages div -->
      <div v-if="modalOpen" class="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div v-show="showinbox" class="h-screen flex flex-col justify-between">
        <div class="h-full flex flex-col overflow-y-hidden">
          <div class="flex flex-col">
            <div @click="togglestartChat" class="z-10 absolute bottom-5 right-5 w-16 hover:cursor-pointer">
              <img src="@/assets/images/start.svg" />
            </div>
            <div class="px-2 pt-5 flex flex-col gap-2 bg-slate-50">
              <div class="flex justify-between">
                <span class="w-[10%] hover:cursor-pointer" @click="showmenu"><img src="@/assets/images/menu.svg"
                    class="w-[36px] h-[32px]" /></span>
                <div class="flex self-end gap-2">
                  <span class="w-6"><img src="@/assets/images/search.png" /></span>
                  <span class="w-5"><img src="@/assets/images/menu_btn.png" /></span>
                </div>
              </div>
              <span class="font-bold font-[quicksand] text-[20px]">Messages</span>
            </div>
          </div>
          <ul class="ml-2 mr-1 bg-white overflow-y-auto h-[100%]">
            <li v-for="(msg, index) in messages1" :key="index" class="relative">
              <div v-if="selectedMessage1 === msg" v-show="showDelete"
                class="bg-white text-sm border-[1px] gap-6 py-2 flex flex-col  border-[#dfd1d155] px-2 absolute top-10 left-1/2 -translate-x-1/2 z-50">
                <span>Delete conversation?</span>
                <div class="flex justify-between mx-2">
                  <span @click="DelMsg" class="pr-2 hover:cursor-pointer">OK</span>
                  <span @click="CancelDel" class="hover:cursor-pointer">Cancel</span>
                </div>
              </div>
              <div
                class="relative flex mt-0.5 justify-between h-[60px] hover:cursor-pointer overflow-hidden bg-slate-50"
                @touchstart="startPress(msg, $event)" @touchend="cancelPress" @touchcancel="cancelPress"
                @click="getSender(index, msg.totalUnreadMsgs)" ref="senderRefs">
                <div class="w-[48px] self-center h-[48px] rounded-[100%] p-1">
                  <img src="@/assets/images/user_profile.svg" class="w-[100%] h-[100%]" />
                </div>
                <div class="flex flex-col bg-gray-100 w-[85%] pr-5">
                  <div class="flex justify-between">
                    <span class="font-medium text-[20px]">{{ msg.senderUsername }}</span>
                    <span class="text-[14px]">{{ msg.time }}</span>
                  </div>
                  <div class="flex justify-between items-end">
                    <span class="break-words whitespace-normal text-wrap text-[15px] mt-1">{{ msg.message }}</span>
                    <div v-if="msg.totalUnreadMsgs != 0"
                      class="bg-[#CE0909] text-white text-[10px] font-semibold flex items-center justify-center h-4 w-auto rounded-full px-1.5">
                      <span>{{ msg.totalUnreadMsgs }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="text-center invisible">
          <p>inbox messages</p>
        </div>
      </div>

      <!-- messages conversation div -->
      <div v-show="showmessenger" class="flex flex-col justify-between h-screen" ref="messengeContainler">
        <div class="h-full">
          <div class="flex justify-between bg-gray-50 py-5 sticky top-0">
            <button @click="goback" class="ml-5">
              <img src="@/assets/images/back.png" class="w-[30px] h-[25px]" />
            </button>
            <span ref="msgSender" class="font-medium text-xl mr-[45%]">{{
    recipientUsername
  }}</span>
          </div>
          <ul class="mx-1 bg-white px-2 flex flex-col gap-3 mt-1 min-h-[500px] max-h-[620px] rounded-sm overflow-y-auto"
            ref="messageContainer">
            <li v-for="(msg, index) in messages" :key="index" class="flex flex-col px-2">
              <span class="self-center text-[10px]">{{ msg.id }}</span>
              <span class="relative w-fit rounded-xl text-[16px] self-start flex break-all"
                :class="getClass(msg.senderUsername)">
                <span @touchstart="startPress1(msg)" @touchend="cancelPress1" @touchcancel="cancelPress1"
                  class="px-3 py-2">
                  {{ msg.message }}</span>
                <div class="absolute bg-white text-black z-10" :class="getStyle(msg.senderUsername)">
                  <div v-show="showDelete1" v-if="selectedMessage === msg"
                    class="flex flex-col z-20 gap-2 min-w-[95px] pl-3 text-sm py-1 border-[1px] border-[#dfbfbf55]">
                    <span @click="showmsgDel" class="w-fit hover:cursor-pointer">Delete</span>
                    <span @click="copyToClipboard" class="w-fit pr-2 hover:cursor-pointer">Copy&nbsp;<span
                        class="text-[10px] text-green-700">{{ copiedMsg }}</span></span>
                    <span @click="CancelDel1" class="w-fit hover:cursor-pointer">Cancel</span>
                  </div>
                  <div v-show="delMessage" v-if="selectedMessage === msg"
                    class="flex flex-col z-20 gap-6 min-w-[130px] pl-3 text-sm py-1 border-[1px] border-[#dfbfbf55]">
                    <span>Delete message?</span>
                    <div class="flex justify-between mr-2">
                      <span @click="DelMsg1" class="pr-2 hover:cursor-pointer">OK</span>
                      <span @click="CancelDel2" class="hover:cursor-pointer">Cancel</span>
                    </div>
                  </div>
                </div>
              </span>
            </li>
            <p class="text-center invisible">messenger app</p>
          </ul>
        </div>
        <div class="mb-2 sticky bottom-0">
          <input class="hidden" v-model="recipientUsername" />
          <div class="flex-grow bg-slate-200 border-4 flex justify-between px-3">
            <textarea rows="1" v-model="message" :rows="computedRows" @input="cancelPopup"
              class="w-full py-2 flex-1 text-sm outline-none resize-none pl-3 mr-2 rounded-sm"
              placeholder="Type message..." scrolling-touch></textarea>
            <button :disabled="activebtn" :class="{ 'bg-blue-400': !activebtn, 'bg-blue-200': activebtn }"
              class="h-8 flex font-semibold font-[quicksand] rounded-[6px] px-1 my-[4px]" @click="sendMessage">
              <span :class="{
    'text-[#084407]': !activebtn,
    'text-gray-400': activebtn,
                }" class="text-[13px] self-center">SEND</span>
              <span class="self-center"><img src="@/assets/images/send.png" class="w-4" /></span>
            </button>
          </div>
        </div>
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
  border: 1px solid #3d3e68;
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
  color: #3d3e68;
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
  background: url("@/assets/images/user.png") no-repeat center;
  background-size: cover;
}

.placeholder-image1 {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background: url("@/assets/images/passkey.png") no-repeat center;
  background-size: cover;
}

.regbox label {
  font-size: 15px;
  font-weight: bold;
  color: #3d3e68;
}
.regbox1 label {
  font-size: 15px;
  font-weight: bold;
  color: #3d3e68;
}

.regbox input {
  border: 1px solid #3d3e68;
  width: 320px;
  height: 45px;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
} 
.custom-input {
  border: 1px solid #3d3e68;
  width: 320px;
  height: 45px;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
} 
.input-error {
  border-color: red !important;
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
  animation: rotate1 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loadingrefresh {
  animation: rotate1 1s linear infinite;
}

@keyframes rotate1 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.active {
  color: #b0188f;
}

.profileinput {
  background-color: rgb(226 232 240);
  color: rgb(32, 35, 39);
  border-radius: 0.125rem;
  max-width: 280px;
  padding: 5px;
}

.profileinput1 {
  color: white;
  max-width: 280px;
  padding: 5px;
}

.inputdivs {
  display: flex;
  font-size: 15px;
  font-weight: 500;
  gap: 10px;
}

.inputdivs label {
  font-weight: bold;
  color: rgb(9, 9, 65);
}
</style>
