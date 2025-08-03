import React from "react";
import ExperienceUploadFormList from "./components/ExperienceUploadForm";

// Simulated logged-in user
const empId = "64f9a0abc123456789abcd01";
const userRole = "HR";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 className="text-2xl font-bold mb-4">Employee Experience Portal</h1>
      {userRole === "HR" && (
        <>
          <ExperienceUploadFormList empId={empId} />
        </>
      )}
    </div>
  );
}

export default App;
