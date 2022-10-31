import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import TokenContext from './store/context'


function App() {
  const [token, setToken] = useState('')

  return (
    <TokenContext.Provider value={[token, setToken]}>
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
        <Route path='/auth' element={<AuthPage />}/>
        {token && 
          <Route path='/profile' element={<UserProfile />}/>
        }
        <Route path='*' element={<Navigate to="/" replace/>} />
      </Routes>
    </Layout>
    </TokenContext.Provider>
  );
}

export default App;
