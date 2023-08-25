import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ContactManager from "./components/ContactManager";
import Covid from "./components/Covid";
import Sidebar from "./components/Sidebar"; 




function App() {
  return (
    <>
      <BrowserRouter>
     <Sidebar />
        <Routes>
          <Route exact path="/covid" element={<Covid />}></Route>
          <Route exact path="/" element={<ContactManager />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
