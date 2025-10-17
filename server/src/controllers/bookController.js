const prisma = require('../prisma/client');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Book
// exports.updateBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status || !['available', 'unavailable'].includes(status)) {
//       return res.status(400).json({ message: "Status must be 'available' or 'unavailable'" });
//     }

//     const updatedBook = await prisma.book.update({
//       where: { id: parseInt(id) },
//       data: { status }
//     });

//     res.status(200).json({
//       message: 'Book status updated successfully',
//       book: updatedBook
//     });
//   } catch (error) {
//     console.error('Error updating book:', error);
//     res.status(500).json({ message: 'Failed to update book', error: error.message });
//   }
// };