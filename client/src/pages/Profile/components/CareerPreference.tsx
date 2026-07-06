interface Props {
  editing: boolean;
  profile: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CareerPreference = ({
  editing,
  profile,
  handleChange,
}: Props) => {
  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h4 className="mb-4">Career Preferences</h4>

        <div className="row g-3">

          {/* Preferred Role */}
          <div className="col-md-6">
            <label className="form-label">Preferred Role</label>

            {editing ? (
              <select
                className="form-select"
                name="preferredRole"
                value={profile.preferredRole}
                onChange={handleChange}
              >
                <option>Software Engineer</option>
                <option>Full Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Java Developer</option>
                <option>React Developer</option>
                <option>DevOps Engineer</option>
                <option>AI Engineer</option>
              </select>
            ) : (
              <p>{profile.preferredRole}</p>
            )}
          </div>

          {/* Preferred Location */}
          <div className="col-md-6">
            <label className="form-label">Preferred Location</label>

            {editing ? (
              <input
                className="form-control"
                name="preferredLocation"
                value={profile.preferredLocation}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.preferredLocation}</p>
            )}
          </div>

          {/* Experience */}
          <div className="col-md-6">
            <label className="form-label">Experience Level</label>

            {editing ? (
              <select
                className="form-select"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
              >
                <option>Fresher</option>
                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            ) : (
              <p>{profile.experience}</p>
            )}
          </div>

          {/* Expected Salary */}
          <div className="col-md-6">
            <label className="form-label">Expected Salary</label>

            {editing ? (
              <input
                className="form-control"
                name="expectedSalary"
                value={profile.expectedSalary}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.expectedSalary}</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CareerPreference;