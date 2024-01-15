import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartScreen from './screens/CartScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import UserOrdersScreen from './screens/UserOrdersScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LandingScreen />}></Route>
            <Route path='/products' element={<ProductsScreen />}></Route>
            <Route path='/product/:id' element={<ProductScreen />}></Route>
            <Route path='/cart' element={<CartScreen />}></Route>
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/registration' element={<RegistrationScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
            <Route path='/checkout' element={<CheckoutScreen />}></Route>
            <Route path='/user-orders' element={<UserOrdersScreen />}></Route>
            <Route path='/email-verify/:token' element={<EmailVerificationScreen />}></Route>
            <Route path='/password-reset/:token' element={<PasswordResetScreen/>}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}
export default App;
