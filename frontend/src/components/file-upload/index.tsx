import { useEffect, useState } from "react";

export const FileUpload = ({ doc, setDoc, index }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("file", file);
    if (!file) {
      //   return setError("No file selected");
    } else {
      if (!validFileTypes.includes(file.type)) {
        setFile(null);
        return setError("Unsupported file type");
      } else if (file.size < 1024 || file.size > 5 * 1024 * 1024) {
        setFile(null);
        return setError("File size must be between 1KB and 5MB");
      }
      setDoc(index, file?.name);
    }
  }, [file]);

  const handleFileChange = (e) => {
    e.preventDefault();
    setError("");
    if (e.target.files) {
      setFile(e.target.files[0]);
      //   if (!file) {
      //     return setError("No file selected");
      //   }

      //   if (!validFileTypes.includes(file.type)) {
      //     setFile(null);
      //     return setError("Unsupported file type");
      //   }

      //   if (file.size < 1024 || file.size > 5 * 1024 * 1024) {
      //     setFile(null);
      //     return setError("File size must be between 1KB and 5MB");
      //   }
    }
  };

  var validFileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "video/webm",
    "video/mp4",
    "video/quicktime",
  ];

  return (
    <div className="col-span-2 text-left w-2/3 mx-auto">
      <label className="font-medium">Upload File: {doc.docType}</label>
      <div className="flex flex-col">
        <div className="flex">
          <input
            type="file"
            placeholder="Select a file"
            className="border"
            name={doc.docType}
            onChange={handleFileChange}
            accept="image/,video/,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
        <span className="text-blue-500">
          Supported types are ['jpeg', 'png', 'svg', 'pdf', 'doc', 'docx',
          'webm', 'mp4', 'mov']
        </span>
      </div>
    </div>
  );
};
