import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header.jsx';
import Users from '../users/Users.jsx';
import Footer from '../Footer/Footer.jsx';
import UserPage from '../userPage/UserPage.jsx';
import UserPageHeader from '../userPage/header/UserPageHeader.jsx';
import Register from '../Register/Register.jsx';
import ProtectedRoute from '../ProtectedRoute.jsx';
import NoRoute from '../NoRoute/NoRoute.jsx';

function App() {

  const {loggedIn} = useSelector(state => state.auth)

  return (
      <Routes>
        <Route path="/" element={ <Register /> }/>
        <Route path="/users" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={Header} 
              offNavigation = {"Enabled"} auth = {""} 
            />
            <ProtectedRoute loggedIn={loggedIn} component={Users} />
            <ProtectedRoute loggedIn={loggedIn} component={Footer} />
          </>
        }/>
        <Route path="/userPage/:id" element={
          <>
            <ProtectedRoute loggedIn={loggedIn} component={UserPageHeader} />
            <ProtectedRoute loggedIn={loggedIn} component={UserPage} />
            <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
          </>
        }/>
        <Route path="*" element={<NoRoute/>}/>
      </Routes>
  );
}

export default App;
