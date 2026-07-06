import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaTrash,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

interface UploadCardProps {
  onFileSelect: (file: File | null) => void;
}

const UploadCard = ({ onFileSelect }: UploadCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // File validation
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    // Max 10 MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Maximum file size is 10 MB.");
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const getIcon = () => {
    if (!file) return <FaCloudUploadAlt size={55} />;

    if (file.type === "application/pdf") {
      return <FaFilePdf size={55} className="text-danger" />;
    }

    return <FaFileWord size={55} className="text-primary" />;
  };

  return (
    <div className="upload-card">

      <h3 className="mb-3">Resume</h3>

      {!file ? (
        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);

            if (e.dataTransfer.files.length > 0) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
        >
          {getIcon()}

          <h5 className="mt-3">Drag & Drop Resume</h5>

          <p className="text-muted">
            Upload your Resume in PDF, DOC or DOCX format.
          </p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => inputRef.current?.click()}
          >
            Browse File
          </button>

          <input
            hidden
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              handleFile(e.target.files ? e.target.files[0] : null)
            }
          />

          <small className="d-block mt-3 text-secondary">
            Maximum File Size: 10 MB
          </small>
        </div>
      ) : (
        <div className="uploaded-file">

          {getIcon()}

          <h5 className="mt-3">{file.name}</h5>

          <p className="text-muted">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <div className="text-success mb-3">
            <FaCheckCircle className="me-2" />
            Uploaded Successfully
          </div>

          <div className="d-flex justify-content-center gap-3">

            <button
              className="btn btn-outline-primary"
              disabled
            >
              <FaEye className="me-2" />
              Preview
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                setFile(null);
                onFileSelect(null);

                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              <FaTrash className="me-2" />
              Remove
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;