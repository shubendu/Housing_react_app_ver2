import { BrowserRouter as Router,Routes,Route   } from 'react-router-dom'
import Explore from './pages/Explore';
import Forgetpassword from './pages/Forgetpassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './component/Navbar';
import PrivateRoute from './pages/PrivateRoute';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import Slider from './pages/Slider';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
        <ToastContainer />
      <Routes>
        <Route path='/' element={<Explore/>}/>
        <Route path='/offers' element={<Offers/>}/>
        
        <Route path='/sign-in' element={<
          Signin/>}/>
        <Route path='/sign-up' element={<
          Signup/>}/>
        <Route path='/forgetpassword' element={<
          Forgetpassword/>}/>

        <Route path='/profile' element={<PrivateRoute/>}>
        <Route  path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/category/:categoryName' element={<Category/>}/>
      <Route path='/create-listing' element={<CreateListing/>} />
      <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
      <Route path='/contact/:landlordId' element={<Contact/>} />
      <Route path='/slider' element={<Slider/>} />
      </Routes>
      
      <Navbar/>
   </Router>
  );
}

export default App;
