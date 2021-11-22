import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MicroFrontend from "./MicroFrontend";

import "./App.css";

const {
  REACT_APP_DOGS_HOST: dogsHost,
  REACT_APP_CATS_HOST: catsHost,
  REACT_APP_BOOKS_HOST: booksHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">&#128571; Cats and Dogs &#128021;</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

function Dogs() {
  return <MicroFrontend host={dogsHost} name="Dogs" />;
}

function Cats() {
  return <MicroFrontend host={catsHost} name="Cats" />;
}

function Books() {
  return <MicroFrontend host={booksHost} name="Books" />;
}

function GreetingCat() {
  return (
    <div>
      <Header />
      <div className="home">
        <MicroFrontend host={catsHost} name="Cats" />
      </div>
    </div>
  );
}

function GreetMe() {
  const [input, setInput] = useState("");
  return (
    <>
      <input
        placeholder="Insert a greeting"
        defaultValue={input}
        onBlur={(e) => setInput(e.target.value)}
      />
      <Link to={`/cat/${input}`}>Greet Me</Link>
    </>
  );
}

function Home() {
  return (
    <div>
      <Header />
      <div className="home">
        <GreetMe />
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            <Cats />
          </div>
          <div className="dog">
            <Dogs />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cat/:greeting" element={<GreetingCat />} />
          <Route exact path="/books" element={<Books />} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
