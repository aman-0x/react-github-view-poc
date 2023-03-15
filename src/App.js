import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/home/HomePage';
import Header from './components/header/Header';
import PageNotFound from './components/PageNotFound';
import Details from './components/details/Details';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/details' element={<Details/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;