import { useState, useEffect, useRef } from "react";

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({setQuery }) {
const [input, setInput] = useState("");
 const inputEl = useRef(null);

 useEffect(function()
{
  inputEl.current.focus();
}, [])


  useEffect(() => {
    const delay = setTimeout(() => {
      if (input.length >= 3) setQuery(input);
    }, 1000);

    return () => clearTimeout(delay);
  }, [input, setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export { NavBar, Logo, Search, NumResults };
