import { useParams } from "react-router-dom";
import teachers from "../data/teachers.json";
import "../css/TeacherProfile.css";

export default function TeacherProfile() {
  const { id } = useParams();
  const teacher = teachers.find((t) => t.id === Number(id));

  if (!teacher) {
    return <div className="profile-wrapper">Teacher not found.</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <img src={teacher.photoUrl} alt={teacher.name} className="profile-photo" />
        <div className="profile-info">
          <h2>{teacher.name}</h2>
          <div className="profile-status">{teacher.status}</div>
          <div className="profile-languages">
            <strong>Speaks:</strong>{" "}
            {teacher.speaks.map((lang, i) => (
              <span key={i} className="lang-badge">
                {lang}{lang === teacher.nativeLanguage ? " (Native)" : ""}
              </span>
            ))}
          </div>
          <div className="profile-rating">
            ⭐ {teacher.rating.toFixed(1)} | {teacher.lessons} lessons
          </div>
          <p className="profile-description">{teacher.description}</p>
          <div className="profile-bottom">
            <div className="profile-price">EUR {teacher.pricePerHour.toFixed(2)} / Hour</div>
            <button className="book-btn">Book lesson</button>
          </div>
        </div>
      </div>
    </div>
  );
}
