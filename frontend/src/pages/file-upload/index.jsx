const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSuccess("");
    setError("");
  };

  const validFileTypes = [
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!file) {
      return setError("No file selected");
    }

    if (!validFileTypes.includes(file.type)) {
      return setError("Unsupported file type");
    }

    if (file.size < 1024 || file.size > 5 * 1024 * 1024) {
      return setError("File size must be between 1KB and 5MB");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/file/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.message);
      }

      setFile(null);
      setSuccess("File uploaded successfully");
      console.log("File uploaded successfully");
    } catch (err) {
      console.log(err);
      setError(err.toString());
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-5 bg-white rounded-md max-w-xl">
        <form onSubmit={onSubmit} className="grid justify-items-start">
          <p className="w-fit mx-auto text-3xl font-medium mb-10">
            File Upload
          </p>
          <div className="space-y-3 px-10 text-left">
            <label className="font-medium">Upload File:</label>
            <input
              type="file"
              placeholder="Select a file"
              className="border w-full"
              // value={file?.name || ""}
              name="file"
              onChange={handleFileChange}
              accept="image/*,video/*,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <span className="text-blue-500">
              Supported types are ['jpeg', 'png', 'svg', 'pdf', 'doc', 'docx',
              'webm', 'mp4', 'mov']
            </span>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
          <div className="flex gap-5 mx-auto">
            <button
              onClick={handleReset}
              type="reset"
              className="bg-white hover:bg-white/80 mt-5"
            >
              Reset form
            </button>
            <button
              type="submit"
              className=" text-white bg-black hover:bg-black/80 mt-5"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadPage;
