import Home from './components/Home';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Artist from './components/Artist';
import UserProfile from './components/UserProfile';
import Songbar from './components/Songbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Toaster} from 'react-hot-toast';

function PrivateRoute({children,...rest}){
    const user = useSelector(state=>state.user.value);
    return user ? children : <Navigate to='/jasmusic/signin'/>
}

function Page404(){
  return(
    <div className='mt-5 d-flex justify-content-center'>
      <h1>Page not found !!</h1>
    </div>
  )
}

function App() {


  return (
    <div id="App">
    
    <NavBar />

    <Routes>
      
      <Route exact path='/jasmusic' element={<PrivateRoute><Home /></PrivateRoute>}>
      </Route>

      <Route exact path='/jasmusic/artist/:id' element={<PrivateRoute><Artist /></PrivateRoute>}>
      </Route>

      <Route exact path='/jasmusic/user' element={<PrivateRoute><UserProfile /></PrivateRoute>}>
      </Route>

      <Route exact path='/jasmusic/signin' element={<SignIn />}>
      </Route>

      <Route exact path='/jasmusic/signup' element={<SignUp />}>
      </Route>
      
      <Route exact path='/jasmusic/*' element={<Page404 />}>
      </Route>

    </Routes>

    <Songbar />
    <Toaster 
    toastOptions={{
      position:'top-right',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration:4000
    }}/>
    </div>
  );
}

export default App;
