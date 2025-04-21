import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogsHg from "./pages/BlogsHg";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Yapilacaklar from "./pages/Yapilacaklar";
import YapilacaklarMui from "./pages/YapilacaklarMui";
import YapilacakGoster from "./pages/YapilacakGoster";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="yapilacaklar" element={<Yapilacaklar />} />
          <Route path="yapilacaklarmui" element={<YapilacaklarMui />} />
          <Route path="ygoster/:todo_id" element={<YapilacakGoster />} />
          <Route path="blogs/huseyin" element={<BlogsHg />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

