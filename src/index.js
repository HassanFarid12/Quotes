import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Sign_up from './Sign_up';

function App() {
return(
    <>
    
    <BrowserRouter>
 <Routes>
        <Route path="/" element={<Sign_up/>} />
        <Route path="/magic_quotes" element={<Sign_up />} />
      </Routes>

    </BrowserRouter>
    </>
)
}

ReactDOM.render(<App />, document.getElementById('root'));