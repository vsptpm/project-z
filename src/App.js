import React, { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  const [posts, setPosts] = useState([]);
  const [username,] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
     if (authUser){
      //user has logged in 
      // console.log(authUser);
      setUser(authUser);

     }
     else{
      //user has logged off
      setUser(null);
     }
   })
   return () => {
     //perform cleanup actions
     unsubscribe();
   }

  }, [user, username]);
  
  //useEffect runs a code based on a condition ie, whenever a variable or thing change the code fires up inside it

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id : doc.id,
        post :doc.data()      //this piece of code will run whenever a new post is added
      })))
    })
    
  }, []);
  // console.log(posts,'postsss')
  
  return (
    <div className="app">
      <Router>
        <Header/>
        <Switch> 
          <Route path="/search/:searchTerm">
            <h4>search page</h4>
          </Route>

          <Route path="/">
            <div className = "app__posts">
              {
              posts.map(({id, post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>

              ))   //loops through every data in variable and return values
              }
            </div>
          </Route>

         
        </Switch>

      </Router>

      
      
 
    </div>
  );
}

export default App;
