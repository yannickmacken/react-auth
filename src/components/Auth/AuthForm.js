import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setIsLoading(true)
    
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    // Add validation

    if (isLogin) {
      setIsLoading(false)
    } else {
      console.log(enteredEmail, enteredPassword)
      const apiKey = process.env.REACT_APP_API_KEY
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey, 
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
        setIsLoading(false)
        if (res.ok) {
          console.log('succes')
        } else {
          console.log(res)
          }
        }
      )
    }
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
