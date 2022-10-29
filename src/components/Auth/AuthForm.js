import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import TokenContext from '../../store/context'


const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [token, setToken] = useContext(TokenContext)

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setIsLoading(true)
    
    // Get filled email and password
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    // Add validation

    // Set url to login or signup
    let url = ''
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    }

    // Post login or signup details to url
    const apiKey = process.env.REACT_APP_API_KEY
    fetch(
      url + apiKey, 
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {'Content-type': 'application/json'}
      }
    ).then(res => {

      // Log result
      if (res.ok) {
        console.log('succes')
      } else {
        console.log('failure')
      }

      // Set token if login selected
      if (isLogin) {
        res.json().then(
          (data) => {
            setToken(data.idToken)
            console.log(data.idToken)
          })
      }

      // Set is loading state to false
      setIsLoading(false)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
