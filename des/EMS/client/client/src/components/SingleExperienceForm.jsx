import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SingleExperienceForm = ({
  empId,
  formIndex,
  onDelete,
  onClose,
  formId,
  isNew,
}) => {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a certificate file");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("certificate", file);

    try {
      const res = await fetch(
        `http://localhost:5000/api/experience/upload/${empId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      alert(`Experience ${formIndex} uploaded successfully!`);
      setUploaded(true);
      if (onClose) onClose(); // Close dialog on upload
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <Paper
      elevation={3}
      className={`p-6 mb-6 border ${
        uploaded ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography variant="h6">Experience #{formIndex ?? ""}</Typography>
          {onDelete && !isNew && (
            <IconButton onClick={() => onDelete(formId)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </div>

        <TextField
          name="jobTitle"
          label="Job Title"
          onChange={handleChange}
          required
        />
        <TextField
          name="companyName"
          label="Company Name"
          onChange={handleChange}
          required
        />
        <TextField
          type="date"
          name="startDate"
          label="Start Date"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          type="date"
          name="endDate"
          label="End Date"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          multiline
          rows={3}
        />

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onClose && (
            <Button variant="outlined" onClick={onClose} color="secondary">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={uploaded}>
            {uploaded ? "Uploaded" : `Submit Experience`}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SingleExperienceForm;
