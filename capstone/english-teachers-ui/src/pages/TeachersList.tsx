import teachers from "../data/teachers.json";
import "../css/TeachersList.css";
import TeacherCard from "../components/TeacherCard";
import { Link } from "react-router-dom";

export default function TeachersList() {
  return (
    <div className="page-wrapper">
      <div className="container">
        {teachers.map((t) => (
          <Link to={`/teachers/${t.id}`} key={t.id} className="card-link">
            <TeacherCard teacher={t} />
          </Link>
        ))}
      </div>
    </div>
  );
}