import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Welcome from './components/Dashboard/Workspace/Welcome.jsx';
import Practice from './components/Dashboard/Workspace/Practice/Practice.jsx';
// import Create from './components/Dashboard/Workspace/Create/Create.jsx';
import Quiz from './components/Dashboard/Workspace/Quiz/Quiz.jsx';
import Set from './components/Dashboard/Workspace/Practice/Set/Set.jsx';
// import CreatedSet from "./components/Dashboard/Workspace/Create/CreatedSet/CreatedSet.jsx"
import Make from "./components/Dashboard/Workspace/Create/Make.jsx"

export const AuthContext = createContext();
export const ToastContext = createContext();

function App() {
  const userIdFromLocalStorage = window.localStorage.getItem('currentUserLoggedIn');
  console.log("here is my id ", userIdFromLocalStorage)
  const [user, setUser] = useState({
    email: '',
    name: '',
    id: userIdFromLocalStorage || '1',
  });

  // const [flashcards, setFlashcards] = useState([]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      // transition: 'bounce',
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      // transition: 'bounce',
    });
  };

  return (
    <>
      <ToastContainer />
      <ToastContext.Provider value={{ notifySuccess, notifyError }}>
        <AuthContext.Provider value={{ setUser, user }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-up' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route
                path='/dashboard'
                element={user.id ? <Dashboard /> : <Navigate to='/login' />}
              >
                <Route index element={<Welcome />} />
                <Route path='practice' element={<Practice />}/>
                <Route path='make' element={<Make />}/>
                {/* <Route path='create' element={<Create />}>
                  <Route path='flashcards/:topic/:subtopic' element={<CreatedSet />} />
                </Route> */}
                <Route path='quiz' element={<Quiz />} />
              </Route>
            </Routes>
        </AuthContext.Provider>
      </ToastContext.Provider>
    </>
  );
}

export default App;