interface Props {
  editing: boolean;
  profile: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const SocialLinks = ({
  editing,
  profile,
  handleChange,
}: Props) => {
  return (
    <div className="card shadow border-0 mb-4">

      <div className="card-body">

        <h4 className="mb-4">Social Links</h4>

        <div className="row g-3">

          {/* LinkedIn */}
          <div className="col-md-4">
            <label className="form-label">LinkedIn</label>

            {editing ? (
              <input
                className="form-control"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedin}
                onChange={handleChange}
              />
            ) : profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.linkedin}
              </a>
            ) : (
              <p className="text-muted">Not Added</p>
            )}
          </div>

          {/* GitHub */}
          <div className="col-md-4">
            <label className="form-label">GitHub</label>

            {editing ? (
              <input
                className="form-control"
                name="github"
                placeholder="https://github.com/username"
                value={profile.github}
                onChange={handleChange}
              />
            ) : profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.github}
              </a>
            ) : (
              <p className="text-muted">Not Added</p>
            )}
          </div>

          {/* Portfolio */}
          <div className="col-md-4">
            <label className="form-label">Portfolio</label>

            {editing ? (
              <input
                className="form-control"
                name="portfolio"
                placeholder="https://yourportfolio.com"
                value={profile.portfolio}
                onChange={handleChange}
              />
            ) : profile.portfolio ? (
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.portfolio}
              </a>
            ) : (
              <p className="text-muted">Not Added</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default SocialLinks;