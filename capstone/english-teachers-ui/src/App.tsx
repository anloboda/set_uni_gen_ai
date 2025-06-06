import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TeachersList from "./pages/TeachersList";
import TeacherProfile from "./pages/TeacherProfile";
import SearchChat from "./pages/SearchChat";
import { Layout } from "./components/Layout";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/teachers" />} />
          <Route path="/teachers" element={<TeachersList />} />
          <Route path="/teachers/:id" element={<TeacherProfile />} />
          <Route path="/search" element={<SearchChat />} />
        </Routes>
      </Layout>
    </Router>
  );
}
