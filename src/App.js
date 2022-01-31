import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Game from "./components/Game";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
    <main className="wrapper">
    <Routes>
      <Route  path="/" element={<Home />}> </Route>
      <Route path="/game" element={<Game />}></Route>
    </Routes>
    </main>
    <Footer />
    </>
   

);
}

export default App;
