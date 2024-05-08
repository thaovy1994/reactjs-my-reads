import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookShelf from "./component/BookShelf";
import SearchBooks from "./component/SearchBooks";

function App() {
 
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route 
              exact path="/" 
              element={<BookShelf/>} 
            />
            <Route 
              exact path="/search" 
              element={<SearchBooks/>} 
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;