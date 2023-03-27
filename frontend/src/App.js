import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import BiddingScreen from './screens/BiddingScreen'
import BiddingProductScreen from './screens/BiddingProductScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import BiddingListScreen from './screens/BiddingListScreen'
import BiddingEditScreen from './screens/BiddingEditScreen'
import OrderListScreen from './screens/OrderListScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route exact path='/' element={< HomeScreen />} />
            <Route exact path='/biddings' element={< BiddingScreen />} />
            <Route path='/login' element={< LoginScreen />} />
            <Route path='/register' element={< RegisterScreen />} />
            <Route path='/profile' element={< ProfileScreen />} />
            <Route path='/shipping' element={< ShippingScreen />} />
            <Route path='/payment' element={< PaymentScreen />} />
            <Route path='/placeorder' element={< PlaceOrderScreen />} />
            <Route path='/order/:id' element={< OrderScreen />} />
            {/* Passing id as parameter */}
            <Route path='/product/:id' element={< ProductScreen />} /> 
            <Route path='/bidding/:id' element={< BiddingProductScreen />} /> 
            {/* id? -> Making the id an option as sometimes we can just go to cart directly */}
            <Route path='/cart/:id?' element={< CartScreen />} /> 


            <Route path='/admin/userlist' element={< UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={< UserEditScreen />} />

            <Route path='/admin/productlist' element={< ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={< ProductEditScreen />} />

            <Route path='/admin/biddinglist' element={< BiddingListScreen />} />
            <Route path='/admin/bidding/:id/edit' element={< BiddingEditScreen />} />

            <Route path='/admin/orderlist' element={< OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
