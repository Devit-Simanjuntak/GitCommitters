// frontend/src/components/Spinner.jsx

// Mengimpor library React
import React from 'react';

// Komponen Spinner tidak menerima prop apapun
const Spinner = () => {
  // Mengembalikan elemen div yang akan digunakan sebagai spinner dengan efek animasi ketika state loading == True
  return (
    <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
  );
};

// Mengekspor komponen Spinner agar dapat digunakan di tempat lain dalam aplikasi React
export default Spinner;
