
function StarIcon() {
    return (
        <span role="img" aria-label="star" className="rating-star">
            ★
        </span>
    );
}

export default function TeacherCard({ teacher }) {
    return (
        <div className="teacher-card">
            <img src={teacher.photoUrl} alt={teacher.name} className="photo" />
            <div className="info">
                <div className="name-row">
                    <div className="name">{teacher.name}</div>
                    <div className="status">
                        <span className="status-icon" title="Verified"></span>
                        {teacher.status}
                    </div>
                </div>
                <div className="language-row">
                    <span className="language-label">SPEAKS:</span>
                    <span className="language-badge">
                        {teacher.nativeLanguage} (Native)
                    </span>
                    {teacher.speaks
                        .filter((lang) => lang !== teacher.nativeLanguage)
                        .map((lang) => (
                            <span key={lang} className="language-badge">
                                {lang}
                            </span>
                        ))}
                    <span className="language-badge">
                        +{teacher.speaks.length - 1}
                    </span>
                </div>
                <div className="rating-lessons">
                    <div>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} />
                        ))}{" "}
                        &nbsp;{teacher.rating.toFixed(1)}
                    </div>
                    <div>{teacher.lessons} Lessons</div>
                </div>
                <div className="description">{teacher.description}</div>
                <div className="price-book">
                    <div className="price">
                        EUR {teacher.pricePerHour.toFixed(2)} / Hour
                    </div>
                    <button className="book-btn">Book lesson</button>
                </div>
            </div>
        </div>
    );
}
