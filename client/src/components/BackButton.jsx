// frontend/src/components/BackButton.jsx

// Mengimpor komponen Link dari 'react-router-dom' untuk navigasi
import { Link } from 'react-router-dom';

// Mengimpor ikon dari 'react-icons'
import { BsArrowLeft } from 'react-icons/bs';

// Komponen BackButton menerima prop 'destination' dengan nilai default '/'
const BackButton = ({ destination = '/' }) => {
    // Mengembalikan elemen tombol kembali dengan tautan ke tujuan yang diberikan
    return (
        <div className='flex'>
            {/* Tombol kembali dengan tautan ke tujuan yang diberikan */}
            <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
                {/* Ikon panah kiri */}
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    );
};

// Mengekspor komponen BackButton agar dapat digunakan di tempat lain
export default BackButton;
