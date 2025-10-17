const prisma = require('../prisma/client');

exports.getAllBorrowings = async (req, res) => {
  try {
    const { userId } = req.params;

    const borrowings = await prisma.borrowing.findMany({
      where: { userId: parseInt(userId) },
      include: {
        book: true,
      },
    });

    if (!borrowings || borrowings.length === 0) {
      return res.status(404).json({ message: 'No borrowing records found for this user' });
    }

    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBorrowing = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await prisma.book.findFirst({ where: { id: bookId } });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.status !== 'available') {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    // buat record peminjaman baru
    const newBorrowing = await prisma.borrowing.create({
      data: {
        userId,
        bookId,
      },
    //   include: {
    //     user: true,
    //     book: true,
    //   },
    });

    // ubah status buku jadi 'unavailable'
    await prisma.book.update({
      where: { id: bookId },
      data: { status: 'unavailable' },
    });

    res.status(201).json(newBorrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params; // id dari tabel Borrowing

    // Cari data borrowing berdasarkan ID
    const borrowing = await prisma.borrowing.findFirst({
      where: { bookId: parseInt(id) },
      include: { book: true }
    });

    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowing record not found' });
    }

    // Update status buku menjadi 'available'
    await prisma.book.update({
      where: { id: borrowing.bookId },
      data: { status: 'available' }
    });

    // Hapus data borrowing (karena sudah dikembalikan)
    await prisma.borrowing.delete({
      where: { id: borrowing.id }
    });

    res.status(200).json({ message: 'Book successfully returned' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to return book', error: error.message });
  }
};

// exports.returnBook = async (req, res) => {
//   try {
//     const { id } = req.params; // id dari tabel Borrowing

//     const borrowing = await prisma.borrowing.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!borrowing) return res.status(404).json({ message: 'Borrowing record not found' });
//     if (borrowing.returnedAt) return res.status(400).json({ message: 'Book already returned' });

//     // update waktu pengembalian dan status buku
//     const updatedBorrowing = await prisma.borrowing.update({
//       where: { id: parseInt(id) },
//       data: {
//         returnedAt: new Date(),
//         book: {
//           update: { status: 'available' },
//         },
//       },
//       include: {
//         user: true,
//         book: true,
//       },
//     });

//     res.status(200).json(updatedBorrowing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
