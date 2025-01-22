let currentUser;  

function setCurrentUser(user) {  
  currentUser = user;  
}  

function getCurrentUser() {  
  return currentUser;  
}  

module.exports = { setCurrentUser, getCurrentUser };  