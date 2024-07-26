import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Sign_up() {
    const [magicQuote, setMagicQuote] = useState('');
    const [userQuotes, setUserQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const cachedQuotes = localStorage.getItem('quotes');
        if (cachedQuotes) {
            setUserQuotes(JSON.parse(cachedQuotes));
        }
    }, []);

    useEffect(() => {
        const cachedUsername = localStorage.getItem('username');
        const cachedPassword = localStorage.getItem('password');
        if (cachedUsername && cachedPassword) {
            setSignedIn(true);
            setUsername(cachedUsername);
            setPassword(cachedPassword);
        }
    }, []);

    const handleSignIn = () => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setSignedIn(true);
        handleQuoteGeneration(); // Generate magic quote after sign in
    };

    // const handleSignUp = () => {
    //     localStorage.setItem('username', username);
    //     localStorage.setItem('password', password);
    //     setSignedIn(true);
    //     handleQuoteGeneration(); // Generate magic quote after sign up
    // };

    const handleQuoteGeneration = async () => {
        try {
            const response = await axios.get('https://type.fit/api/quotes');
            const quotes = response.data;
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setMagicQuote(randomQuote.text);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSaveQuote = (quote) => {
        const newQuotes = [...userQuotes, quote];
        setUserQuotes(newQuotes);
        localStorage.setItem('quotes', JSON.stringify(newQuotes));
    };

    const handleDeleteQuote = (quote) => {
        const newQuotes = userQuotes.filter((q) => q !== quote);
        setUserQuotes(newQuotes);
        localStorage.setItem('quotes', JSON.stringify(newQuotes));
    };

    return (
        <div className="container">
            {signedIn && (
                <div className="quote-display magic-quote">
                    <h2>Magic Quote</h2>
                    <p>{magicQuote}</p>
                    <button onClick={handleQuoteGeneration}>Generate New Quote</button>
                </div>
            )}
            {signedIn && (
                <div className="quote-display user-quotes">
                    <h2>Your Quotes</h2>
                    <ul>
                        {userQuotes
                           .filter((quote) => quote.includes(searchTerm))
                           .map((quote, index) => (
                                <li key={index}>
                                    {quote}
                                    <button onClick={() => handleDeleteQuote(quote)}>Delete</button>
                                </li>
                            ))}
                    </ul>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder=" your Magic quotes"
                    />
                    <button onClick={() => handleSaveQuote(magicQuote)}>Save Quote</button>
                </div>
            )}
            {!signedIn && (
                <div className='homePage'>
                    <h2>Magic Quotes App</h2>
                    <h5>Design By: HASSAN</h5>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                    <Link to="/magic_quotes"><button onClick={handleSignIn}>Sign In</button></Link>
                    
                </div>
            )}
        </div>
    );
}

export default Sign_up;




