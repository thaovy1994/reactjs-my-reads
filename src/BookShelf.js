import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

const BookShelf = () => {
    const [books, setBooks] = useState([
      // {
      //   id: 1,
      //   title: "To Kill a Mockingbird",
      //   author: "Harper Lee",
      //   shelf: "currentlyReading",
      //   imageUrl: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
      // },
      // {
      //   id: 2,
      //   title: "Ender's Game",
      //   author: "Orson Scott Card",
      //   shelf: "currentlyReading",
      //   imageUrl: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      // },
      // {
      //   id: 3,
      //   title: "1776",
      //   author: "David McCullough",
      //   shelf: "wantToRead",
      //   imageUrl: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
      // },
      // {
      //   id: 4,
      //   title: "Harry Potter and the Sorcerer's Stone",
      //   author: "J.K. Rowling",
      //   shelf: "wantToRead",
      //   imageUrl: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
      // },
      // {
      //   id: 5,
      //   title: "The Hobbit",
      //   author: "J.R.R. Tolkien",
      //   shelf: "read",
      //   imageUrl: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
      // },
      // {
      //   id: 6,
      //   title: "Oh, the Places You'll Go!",
      //   author: "Seuss",
      //   shelf: "read",
      //   imageUrl: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
      // },
      // {
      //   id: 7,
      //   title: "The Adventures of Tom Sawyer",
      //   author: "Mark Twain",
      //   shelf: "read",
      //   imageUrl: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
      // },
    ]);

    useEffect(() => {
      BooksAPI.getAll().then((books) => {
        setBooks(books);
      });
    }, []);

    const changeShelf = (book, newShelf) => {
      BooksAPI.update(book, newShelf).then(() => {
        book.shelf = newShelf;
        setBooks((prevBooks) =>
          prevBooks.filter((b) => b.id !== book.id).concat([book])
        );
      });
    };
  
    const compartments = [
      { type: "currentlyReading", title: "Currently Reading" },
      { type: "wantToRead", title: "Want to Read" },
      { type: "read", title: "Read" },
    ];
    
return (
    <div className="app">
        <div className="list-books">
           <div className="list-books-content">
           {books.length > 0 && (
          <div>
            {compartments.map((compartment, index) => {
              const compartmentBooks = books.filter(
                (book) => book.shelf === compartment.type
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{compartment.title}</h2>
                  <div>
                    <div className="bookshelf-books" key={compartment}>
                      <ol className="books-grid">
                        {compartmentBooks.map((book) => (
                          <Book key={book.id} book={book} changeShelf={changeShelf} />
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
              {/* <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books.map(book => (
                  book.shelf === "currentlyReading" && (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                              `url(${book.imageUrl})`
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select value={shelf} onChange ={arrangeBook}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.author}</div>
                      </div>
                    </li>
              )))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books.map(book => (
                  book.shelf === "wantToRead" && (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:`url(${book.imageUrl})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange ={arrangeBook}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.author}</div>
                      </div>
                    </li>
                  )))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books.map(book => (
                    book.shelf === "read" && (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage: `url(${book.imageUrl})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select value={shelf} onChange ={arrangeBook}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.author}</div>
                      </div>
                    </li>
                  )))}
                  </ol>
                </div>
              </div> */}
           </div>
           <div className="open-search">
            {/* <Link to={{
                pathname: '/search',
                state: {
                    booksFromHome: books
                }
            }}
            /> */}
            <Link className="open-search" to="/search">
              Add
            </Link>
          </div>
        </div>
    </div>
    );
}

export default BookShelf;