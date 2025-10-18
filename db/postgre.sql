set search_path to public;
show search_path;

INSERT INTO "Book"(title, author, year, status) VALUES 
    ('To Kill a Mockingbird', 'Harper Lee', 1960, 'available'),
    ('1984', 'George Orwell', 1949, 'unavailable'),
    ('Pride and Prejudice', 'Jane Austen', 1813, 'available'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'available'),
    ('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 1967, 'unavailable'),
    ('The Catcher in the Rye', 'J.D. Salinger', 1951, 'available'),
    ('Brave New World', 'Aldous Huxley', 1932, 'unavailable'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'available'),
    ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 1997, 'unavailable'),
    ('The Hobbit', 'J.R.R. Tolkien', 1937, 'available'),
    ('The Hunger Games', 'Suzanne Collins', 2008, 'available'),
    ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'unavailable'),
    ('Gone Girl', 'Gillian Flynn', 2012, 'available'),
    ('The Da Vinci Code', 'Dan Brown', 2003, 'unavailable'),
    ('The Alchemist', 'Paulo Coelho', 1988, 'available'),
    ('Life of Pi', 'Yann Martel', 2001, 'available'),
    ('The Kite Runner', 'Khaled Hosseini', 2003, 'unavailable'),
    ('The Help', 'Kathryn Stockett', 2009, 'available'),
    ('Twilight', 'Stephenie Meyer', 2005, 'unavailable'),
    ('The Book Thief', 'Markus Zusak', 2005, 'available'),
    ('The Shining', 'Stephen King', 1977, 'available'),
    ('Dune', 'Frank Herbert', 1965, 'unavailable'),
    ('Foundation', 'Isaac Asimov', 1951, 'available'),
    ('Neuromancer', 'William Gibson', 1984, 'unavailable'),
    ('Snow Crash', 'Neal Stephenson', 1992, 'available'),
    ('Ender''s Game', 'Orson Scott Card', 1985, 'available'),
    ('Fahrenheit 451', 'Ray Bradbury', 1953, 'unavailable'),
    ('Animal Farm', 'George Orwell', 1945, 'available'),
    ('The Handmaid''s Tale', 'Margaret Atwood', 1985, 'unavailable'),
    ('Slaughterhouse-Five', 'Kurt Vonnegut', 1969, 'available');

Insert into "Borrowing"("userId", "bookId") values (1, 3), (1, 4), (1, 5);

select * from "Book";
select * from "User";
select * from "Borrowing";