import { FaHandHolding, FaBan, FaHandHoldingHeart } from 'react-icons/fa';
import axios from 'axios';

const borrowBook = async (bookId, fetchData) => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const userId = savedUser?.id;

    if (!userId) {
      alert("User belum login!");
      return;
    }

    const response = await axios.post("http://localhost:4000/borrowings/borrow", {
      userId,
      bookId,
    });

    if (response.status === 201) {
      alert("Buku berhasil dipinjam!");
      fetchData();
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal meminjam buku!");
  }
};

const giveBackBook = async (bookId, fetchData) => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const userId = savedUser?.id;

    if (!userId) {
      alert("User belum login!");
      return;
    }

    const response = await axios.put(`http://localhost:4000/borrowings/${bookId}/return`);

    if (response.status === 200) {
      alert("Buku berhasil dikembalikan!");
      fetchData(); // refresh daftar buku
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Gagal mengembalikan buku!");
  }
};

// Utility: Render Action Button
const renderBookAction = (status, giveBack, bookId, fetchData) => {
  if (status === 'available') {
    return (
      <button onClick={() => borrowBook(bookId, fetchData)} className="p-1">
        <FaHandHolding className="text-2xl text-green-800 hover:scale-110 transition-transform" />
      </button>
    );
  } else if (status === 'unavailable' && giveBack) {
    return (
      <button onClick={() => giveBackBook(bookId, fetchData)} className="p-1">
        <FaHandHoldingHeart className="text-2xl text-red-600 hover:scale-110 transition-transform" />
      </button>
    );
  } else if (status === 'unavailable') {
    return (
      <button
        onClick={() => alert('Buku ini sedang dipinjam pengguna lain.')}
        className="p-1"
      >
        <FaBan className="text-2xl text-red-600 hover:scale-110 transition-transform" />
      </button>
    );
  } else {
    return <span className="text-gray-400">No Action</span>;
  }
};

// Utility: Table Cell Component
const TableCell = ({ children, className = "" }) => (
  <td
    className={`border border-slate-700 rounded-md text-center ${className}`}
  >
    {children}
  </td>
);

// Sub-Component: Book Row
const BookRow = ({ index, book, giveBack, fetchData }) => (
  <tr className="h-8">
    <TableCell>{index + 1}</TableCell>
    <TableCell>{book.title}</TableCell>
    <TableCell className="max-md:hidden">{book.author}</TableCell>
    <TableCell className="max-md:hidden">{book.year}</TableCell>
    <TableCell className="max-md:hidden">{book.status}</TableCell>
    <TableCell>
      <div className="flex justify-center gap-x-4">
        {renderBookAction(book.status, giveBack, book.id, fetchData)}
      </div>
    </TableCell>
  </tr>
);

// Main Component: BooksTable
const BooksTable = ({ userId, books = [], catalogLoan, mode, fetchData }) => {
  // Normalisasi data
  const normalizedBooks = books.map((item) =>
    mode ? { ...item.book } : { ...item }
  );

  // Render kondisi bila tidak ada data
  if (!normalizedBooks.length) {
    return (
      <div className="w-full flex flex-col items-center py-10 text-gray-500">
        <p className="text-2xl mb-2">📚 No borrowed books found.</p>
        <p className="text-sm">Please borrow a book to see it listed here.</p>
      </div>
    );
  }

  // Render tabel buku
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Status
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {normalizedBooks.map((book, index) => (
          catalogLoan[book.id] ? (
            <BookRow 
              key={book.id || index} 
              index={index} 
              book={book} 
              giveBack={true}
              fetchData={fetchData} 
            />
          ) : (
            <BookRow 
              key={book.id || index} 
              index={index} 
              book={book} 
              giveBack={false}
              fetchData={fetchData}
            />
          )
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;