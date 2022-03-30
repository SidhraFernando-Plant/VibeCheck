const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";
const POST_TEXT_KEY = "text";
const POST_ID_KEY = "postId";
const POSTS_KEY = "posts";
const DEFAULT_AVATAR_PATH = "../img/avatar.svg";


  // Initialise local storage to populate application with some posts and users
function initLocalStorage() {
    // Stop if data is already initialised.
    if(localStorage.getItem(USERS_KEY) !== null)
      return;
    const users = [
      {
        dateJoined: "Sun Aug 15 2021",
        email: "alex@gmail.com",
        username: "Alex123",
        password: "abc123!",
        avatar: ""
      }
    ];

    const posts = [
      {
        date: "Fri Sep 03 2021",
        id: 1,
        post: "Hey guys!! This is my first post, I am so excited to have joined VibeCheck. With online learning since the start of my degree, I have been finding it quite hard to meet friends :( If you're in the same boat reply with your Instagram username and I'll follow you!",
        replies: [
          {
            replyText: "My instagram is @angus, look forward to meeting you Alex!",
            user: "Angus S",
            date: "Fri Sep 03 2021",
          }
        ],
        user: "Alex123"
      },
      {
        date: "Thu Sep 02 2021",
        id: 2,
        post: "I can't wait until we get out of lockdown and can go on campus!! Do you guys have any good recommendations for places to eat near uni?? I love bubble tea and pizza",
        replies: [],
        user: "Katie_H"
      },
      {
        date: "Tue Aug 31 2021",
        id: 3,
        post: "I'm currently taking Further Programming and am having some trouble with an assignment. Would anyone who has taken this course before be able to help me? Thanks.",
        replies: [
          {
            replyText: "Thanks Katie that would be really helpful!! I'm struggling the most with lambda functions.",
            user: "Angus S",
            date: "Wed Sep 01 2021",
          },
          {
            replyText: "Hey Angus, I took Further Programming last year! What topic are you having trouble with? I have a lot of great links to online resources that I am happy to share.",
            user: "Katie_H",
            date: "Wed Sep 01 2021",
          }
        ],
        user: "Angus S"
      }
    ];
    const postId = 4;
  
    // Set data into local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    localStorage.setItem(POST_ID_KEY, postId);
}

// Params: username (str), passworrd (str) | Return: boolean
// check if userrname and password combination match a user stored in local storage
function verifyUser(username, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    for(const user of users) {
        if(username===user.username && password===user.password) {
            return true;
        }
    }
    return false;
}

// Params: username (str), email (str), date (str) | Return: none
// store the current user in localStorage
function setUser(username, email, date) {
    localStorage.setItem(USER_KEY, username);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(DATE_KEY, date);
}
  

// get the current user's username from local storage
function getUser() {
    return localStorage.getItem(USER_KEY);
}

// get the current user's email from local storage
function getEmail() {
    return localStorage.getItem(EMAIL_KEY);
}

// get the current user's date joined from local storage
function getDateJoined() {
  return localStorage.getItem(DATE_KEY);
}

// Params: username (str) | Return: email (str)
// get the email of user with username supplied
function getEmailByUsername(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
      if(username===user.username) {
          return user.email;
      }
  }
  return null;
}

// Params: username (str) | Return: dateJoined (str)
// get the join dates of user with username supplied
function getDateByUsername(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
      if(username===user.username) {
          return user.dateJoined;
      }
  }
  return null;
}
  

// stop the current user's logged in session by removing them as the current user
function removeUser() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(DATE_KEY);
}

// Params: username (str) | Return: none
// remove the user with username supplied
function deleteUser(username) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    for(var i=0;i<users.length;i++) {
      if(username===users[i].username) {
          users.splice(i, i+1);
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
          return;
      }
    }
}

// Params: oldUsername (str), newUsername (str), email (str) | Return: none
// update user's detail to newUsername and email
function editUser(oldUsername, newUsername, email) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(oldUsername===user.username) {
        user.username = newUsername;
        user.email = email;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }
}

// Params: newUsername (str), newPassword (str), newEmail (str), date(str) | Return: none
// Add a new user to the record of users in local storage
function createUser(newUsername, newPassword, newEmail, date) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    const newUser = {username: newUsername, password: newPassword, email: newEmail, dateJoined: date, avatar: ""};
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Params: username (str), imgBlob (str - base64 blob url) | Return: none
// Update the blob url to the user with supplied username's avatar
function setAvatar(username, imgBlob) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        user.avatar = imgBlob;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return;
    }
  }
}

// Params: username (str) | Return: imgBlob (str - base64 blob url)
// Get a user's avatar
function getAvatar(username) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        var imgBlob = user.avatar;
        return imgBlob;
    }
  }
  return "";
}

// Params: username (str) | Return: boolean
// Check if a user with the supplied username already exists
function userExists(username) {
  var returnVal = false;
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  for(const user of users) {
    if(username===user.username) {
        returnVal = true;
    }
  }
  return returnVal;
}


export {
    setUser,
    getUser,
    removeUser,
    initLocalStorage,
    verifyUser,
    createUser,
    getEmail,
    getEmailByUsername,
    getDateJoined,
    getDateByUsername,
    deleteUser,
    editUser,
    userExists,
    setAvatar,
    getAvatar,
}