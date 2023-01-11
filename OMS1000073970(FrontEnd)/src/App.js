
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/customers/Login';
import RegisterCustomer from './components/customers/RegisterCustomer';
import CustomerList from './components/customers/CustomerList';
import CustomerDetails from './components/customers/CustomerDetails';
import UpdateCustomer from './components/customers/UpdateCustomer';
import ItemsList from './components/items/ItemsList';
import AddItem from './components/items/AddItem';
import UpdateItem from './components/items/UpdateItem';
import OrderList from './components/orders/OrderList';
import OrderItemsList from './components/orderitems/OrderItemsList';
import TempItemsList from './components/tempItems/TempItemsList';
import NewTempItem from './components/tempItems/NewTempItem';
import Home from './components/Home';
import UpdatePassword from './components/customers/UpdatePassword';


import CartList from './components/carts/CartList';
import AddCart from './components/carts/AddCart';
import ItemListByCategory from './components/items/ItemListByCategory';
import OrderItemDetails from './components/orderitems/OrderItemDetails';
import Admin from './components/Admin';
import AdminDetails from './components/customers/AdminDetails';
import AdminItemList from './components/AdminItemList';
import AdminOrderList from './components/AdminOrderList';
import AdminHome from './components/AdminHome';
import CustomerOrderList from './components/orders/CustomerOrderList';



function App() {
    return (
        
      <div className="App">
          
            <BrowserRouter>
                
              <Routes>
                  <Route path="/" element={< Login />} />
                  <Route path="/login" element={< Login />} />
                  <Route path="/home/:custId" element={< Home />} />
                  <Route path="/admin/:custId" element={< Admin />} />
                  <Route path="/register" element={<RegisterCustomer />} />
                  <Route path="/customerList/:custId" element={<CustomerList />} />
                  <Route path="/customerDetails/:custId/:Id" element={<CustomerDetails />} />
                  <Route path="/adminDetails/:custId" element={<AdminDetails />} />
                  <Route path="/adminItemList/:custId" element={<AdminItemList />} />
                    <Route path="/adminOrderList/:custId" element={<AdminOrderList />} />
                    <Route path="/customerOrderList/:custId" element={<CustomerOrderList />} />
                  <Route path="/updateCustomer/:custId/:Id" element={<UpdateCustomer />} />
                  <Route path="/adminHome/:custId" element={<AdminHome />} />
                  <Route path="/itemListByCategory/:custId/:category" element={<ItemListByCategory />} />
                  <Route path="/updatePassword" element={<UpdatePassword />} />
                  <Route path="/itemsList/:custId" element={<ItemsList />} />
                  <Route path="/adminHome/:custId" element={<ItemsList />} />
                  <Route path="/addItem/:custId" element={<AddItem />} />
                  <Route path="/updateItem/:itemId" element={<UpdateItem />} />
                  <Route path="/orderItemDetails/:custId/:orderItemId/:itemId/:orderId" element={<OrderItemDetails />} /> 
                  <Route path="/orderList/:custId" element={<OrderList />} />        
                  <Route path="/orderItemList/:custId/:orderId" element={<OrderItemsList />} />
                  <Route path="/tempItemList/:custId" element={<TempItemsList />} />
                  <Route path="/newTempItem/:custId/:itemId" element={<NewTempItem />} />
                  <Route path="/cartList/:custId" element={<CartList />} />
                  <Route path="/addToCart/:custId/:itemId" element={<AddCart />} />
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
