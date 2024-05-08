import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '..//BooksAPI';
import Shelf from './Shelf';

const BookShelf = () => {
  const [books, setBooks] = useState([])
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  useEffect(() => {
    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data))
      }
      );
  }, [])

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const changeShelf = (book, whereTo) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  }

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const whatToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    
return (
    <div className="app">
        <div className="list-books">
           <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={currentlyReading} changeShelf={changeShelf}/>
            <Shelf title="Want To Read" books={whatToRead} changeShelf={changeShelf}/>
            <Shelf title="Read" books={read} changeShelf={changeShelf}/>
          </div>
           </div>
           <div className="open-search">
            <Link to="/search">
            </Link>
          </div>
        </div>
    </div>
    );
}

export default BookShelf;