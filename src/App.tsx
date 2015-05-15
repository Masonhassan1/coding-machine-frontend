import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/404Page";
import CodeEditor from "./components/CodeEditor";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
