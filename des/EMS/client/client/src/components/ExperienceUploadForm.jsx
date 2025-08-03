import React, { useState } from "react";
import SingleExperienceForm from "./SingleExperienceForm";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const ExperienceUploadFormList = ({ empId }) => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [nextFormId, setNextFormId] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addForm = () => {
    setForms((prev) => [...prev, nextFormId]);
    setNextFormId((prev) => prev + 1);
    handleClose();
  };

  const deleteForm = (idToRemove) => {
    setForms((prev) => prev.filter((id) => id !== idToRemove));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Typography
        variant="h4"
        align="center"
        className="text-blue-700 mb-6 font-semibold"
      >
        Employee Experience Portal
      </Typography>

      {forms.map((formId, idx) => (
        <SingleExperienceForm
          key={formId}
          empId={empId}
          formIndex={idx + 1}
          formId={formId}
          onDelete={deleteForm}
        />
      ))}

      <div className="text-center mt-6">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          className="hover:bg-blue-50 normal-case"
        >
          Add New Experience
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Upload Experience
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <SingleExperienceForm
            empId={empId}
            formIndex={nextFormId}
            onClose={addForm}
            isNew
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceUploadFormList;
