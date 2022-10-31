import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/context';


function App() {
  const { token } = useContext(AuthContext)

  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}/>
        <Route path='/auth' element={<AuthPage />}/>
        {token && <Route path='/profile' element={<UserProfile />}/>}
        <Route path='*' element={<Navigate to="/" replace/>} />
      </Routes>
    </Layout>
  );
}

export default App;
