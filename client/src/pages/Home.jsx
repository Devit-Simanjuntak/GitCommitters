// frontend/src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import BooksTable from '../components/home/BooksTable';
import axios from 'axios';
import Navbar from '../components/navbar';

const Home = ({ user, setUser }) => {
  const [books, setBooks] = useState([]);
  const [loanBook, setLoanBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loanPage, setLoanPage] = useState(true);
  const loanPointer = loanPage ? 'Daftar Pinjaman' : 'Daftar Buku';
  const [catalogLoan, setCatalogLoan] = useState({});

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/books/getAlls');
      return response.data;
    } catch (error) {
      console.warn('Error fetching books:', error);
      return []; 
    }
  };

  const fetchUserLoans = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/borrowings/${userId}`);
      return response.data;
    } catch (error) {
      console.warn('Error fetching user loans:', error);
      return []; 
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    const [books, loans] = await Promise.all([
      fetchBooks(),
      fetchUserLoans(user.id)
    ]);
    
    setBooks(books);
    setLoanBook(loans);
    setLoading(false);

    if (loans.length > 0) {
      setCatalogLoan(
        Object.fromEntries(loans.map(item => [item.bookId, "borrowed"]))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  console.log(catalogLoan);
  return (
    <div>
      <Navbar setUser={setUser} loadSettings={[loanPointer, loanPage, setLoanPage, user]}/>
      <div className="div" style={{marginTop:'70px'}}></div>

      <div className="p-4">
        <div style={{ height: '25px' }}></div>
        {
          loading ? <Spinner /> : loanPage ? 
          <BooksTable
            userId={user.id} 
            books={books} 
            catalogLoan={catalogLoan} 
            mode={false}
            fetchData={fetchData}
          /> 
          : 
          <BooksTable
            userId={user.id} 
            books={loanBook} 
            catalogLoan={catalogLoan}  
            mode={true}
            fetchData={fetchData}
          />
        }
      </div>
    </div>
  );
};

export default Home;
