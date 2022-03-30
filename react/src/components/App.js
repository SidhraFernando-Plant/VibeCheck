import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import SignUp from './SignUp'
import LogIn from './LogIn'
import MyProfile from './MyProfile'
import Posts from './Posts'
import PostInspect from './PostInspect'
import { useState } from 'react';
import { getEmail, getUser, removeUser, getDateJoined } from "../data/userRepository";
import Followers from './Followers';


// props: none | App component with routing
function App() {
  //Store username in state, and pass to child components as props
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());
  const [dateJoined, setDateJoined] = useState(getDateJoined());

  // Params: username (str)| Return: none 
  // upon successful authentication of user credentials, log user in by storing username in this component's state
  const loginUser = (username) => {
    setUsername(username);
  }

  // Params: none  | Return: none
  // log out the current user by removing them from localStorage and this component's state
  const logoutUser = () => {
    setUsername(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  
  return (
    <div className="footer-padding">
      <Router>
        {/* Navbar */}
        <Header username={username} logoutUser={logoutUser}/>
        <main role="main" className="mb-4">
          <Switch>
            {/* Sign up */}
            <Route path="/signup" render={props => (
              <SignUp {...props} username={username}/>
            )}/>
            
            {/* Log in */}
            <Route path="/login" render={props => (
              <LogIn {...props} loginUser={loginUser} />
              )} />
            
            {/* Profile page */}
            <Route path="/profile/:usernameReq" render={props => (
              <MyProfile {...props} username={username} email={email} dateJoined={dateJoined} logoutUser={logoutUser} loginUser={loginUser}/>
            )} />
            
            {/* Forum page */}
            <Route path="/posts/:isUserPosts">
              <Posts username={username}/>
            </Route>
            
            {/* DELETE */}
            <Route path="/followers">
              <Followers username={username}/>
            </Route>
            
            {/* View a post and its replies */}
            <Route  path="/view-post/:id">
              <PostInspect username={username}/>
            </Route>

            {/* Homepage */}
            <Route path="/">
              <Home username={username}/>
            </Route>
          </Switch>
        </main>
        <Footer />
        
      </Router>
    </div>
  );
}

export default App;
