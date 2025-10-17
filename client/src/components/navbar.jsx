import React, {useState} from "react";
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from 'react-icons/md';

const Navbar = ({setUser, loadSettings}) => {

    // to change burger classes
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");

    const readingQuotes = [
        "The more that you read, the more things you will know. - Dr. Seuss",
        "A room without books is like a body without a soul. - Cicero",
        "There is no friend as loyal as a book. - Ernest Hemingway",
        "Books are a uniquely portable magic. - Stephen King",
        "So many books, so little time. - Frank Zappa",
        "Today a reader, tomorrow a leader. - Margaret Fuller",
        "Books are the quietest and most constant of friends. - Charles Eliot",
        "Once you learn to read, you will be forever free. - Frederick Douglass",
        "The reading of all good books is like a conversation with the finest minds of past centuries. - René Descartes", 
        "A reader lives a thousand lives before he dies. The man who never reads lives only one. - George R.R. Martin",
        "Literacy is a bridge from misery to hope. - Kofi Annan",
        "Reading is to the mind what exercise is to the body. - Joseph Addison",
        "Knowledge is power. - Francis Bacon"
    ];

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * readingQuotes.length);
        return readingQuotes[randomIndex];
    };

    // toggle burger menu change
    const updateMenu = () => {
        if(!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
            setQuote(getRandomQuote());
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    const handleLogout = () => {
    // Hapus token dari penyimpanan lokal
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect ke halaman login
    setUser(null);
    navigate('/login');
    };

    return(
        <div style={{width: '100%'}}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>

                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md ml-4" >Logout </button>
            </nav>

            <div className={menu_class}>
                <div className="flex flex-col items-start justify-start mt-6 ml-4 space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                        Hello, <span className="text-blue-600">{loadSettings[3].name}</span>
                    </p>

                    <div className="flex items-center text-gray-700 text-sm break-all">
                        <MdEmail className="mr-2 text-blue-500 text-base" />
                        <span>{loadSettings[3].email}</span>
                    </div>
                </div>

                <div className="mt-8 mb-6 mx-4"> {/* Ditambah margin atas dan bawah */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                        <p className="text-sm italic text-gray-700 text-center leading-relaxed">
                            "{quote}"
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4">
                    <button
                        onClick={() => loadSettings[2](!loadSettings[1])}
                        className="text-blue-700 hover:text-blue-900 font-semibold text-lg bg-transparent border-none cursor-pointer p-0"
                    >
                        {loadSettings[0]}
                    </button>
                </div>

                <div className="absolute bottom-4 right-4">
                    <Link
                        to="/edit-profile"
                        className="text-blue-700 hover:text-blue-900 font-semibold text-lg"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar