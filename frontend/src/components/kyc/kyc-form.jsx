import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../file-upload";
import { postRequest } from "../../api";

export const KycForm = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userId: user.id,
    kycId: user?.kyc?.approvedStatus || "",
    approvedStatus: user?.kyc?.approvedStatus || "PENDING",
    panNo: user?.kyc?.panNo || "",
    aadharNo: user?.kyc?.aadharNo || "",
    remarks: user?.kyc?.remarks || "",
    documents: [
      {
        docType: "PHOTO",
        docPath: "",
      },
      {
        docType: "PAN",
        docPath: "",
      },
      {
        docType: "AADHAR",
        docPath: "",
      },
    ],
  });

  //   console.log("formdata", formData);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (index, filePath) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments[index].docPath = filePath;
    setFormData({ ...formData, documents: updatedDocuments });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { aadharNo, panNo, userId, documents } = formData;

    if (!panNo || !aadharNo) return setError("All fields are required");

    if (!documents[0].docPath || !documents[1].docPath || !documents[2].docPath)
      return setError("All documents are required to upload");

    await postRequest(`/user/${user?.id}/kyc`, {
      aadharNo,
      panNo,
      userId,
      documents,
    }).then((data) => {
      if (!data.error) {
      } else setError(data.message);
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items- gap-10">
      <h1>KYC Pending</h1>
      <div className="p-5 bg-gray-200 rounded-md">
        <div>
          <form
            onSubmit={onSubmit}
            className="p-5 grid grid-cols-2 items-start justify-items-stretch gap-y-5"
          >
            <FileUpload
              label={"PHOTO"}
              doc={formData.documents[0]}
              setDoc={handleFileChange}
              index={0}
            />
            <label>User ID:</label>
            <input
              name="userId"
              disabled
              value={formData.userId}
              onChange={handleOnChange}
            />

            <label>KYC ID:</label>
            <input
              name="kycId"
              disabled
              value={formData.kycId}
              onChange={handleOnChange}
            />

            <label>Approval Status:</label>
            <input
              name="approvedStatus"
              disabled
              value={formData.approvedStatus}
              onChange={handleOnChange}
            />

            <label>PAN No.:</label>
            <input
              name="panNo"
              value={formData.panNo}
              onChange={handleOnChange}
            />
            {formData.panNo && (
              <FileUpload
                label={"PAN"}
                doc={formData.documents[1]}
                setDoc={handleFileChange}
                index={1}
              />
            )}
            <label>AADHAR No.:</label>
            <input
              name="aadharNo"
              type="number"
              value={formData.aadharNo}
              onChange={handleOnChange}
            />
            {formData.aadharNo && (
              <FileUpload
                label={"AADHAR"}
                doc={formData.documents[2]}
                setDoc={handleFileChange}
                index={2}
              />
            )}

            <label>Remarks:</label>
            <input
              name="remarks"
              disabled
              value={formData.remarks}
              onChange={handleOnChange}
            />

            <button className="col-span-2">Submit</button>
          </form>
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};
