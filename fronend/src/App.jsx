import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import { useMyContext } from './context/MyContext'
import Loader from './components/Loader';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

function App() {

  const {loading} = useMyContext();

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loading]);


  return (
   <div>
   <Toaster/>
   {
      loading && <Loader/>
   }
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<ProtectedRoute>
          <Dashboard />
      </ProtectedRoute>}/>
    </Routes>
   </div>
  )
}

const ProtectedRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.name) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }

}

export default App
