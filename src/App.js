import React from 'react';
import GlobalStyled from './style/GlobalStyled';
import Router from './router';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyled/>
      <Nav/>
      <Router/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;