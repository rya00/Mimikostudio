import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route exact path='/' element={< HomeScreen />} />
            <Route path='/login' element={< LoginScreen />} />
            <Route path='/register' element={< RegisterScreen />} />
            <Route path='/profile' element={< ProfileScreen />} />
            {/* Passing id as parameter */}
            <Route path='/product/:id' element={< ProductScreen />} /> 
            {/* id? -> Making the id an option as sometimes we can just go to cart directly */}
            <Route path='/cart/:id?' element={< CartScreen />} /> 
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
