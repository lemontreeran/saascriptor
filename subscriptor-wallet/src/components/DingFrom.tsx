import React, { useState } from "react";

type DingFromProps = {
  onDingSubmit: (did: string, note: string) => void;
};

const DingForm: React.FC<DingFromProps> = ({ onDingSubmit }) => {
  const [did, setDid] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDingSubmit(did, note);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Send Info</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          value={did}
          onChange={(e) => setDid(e.target.value)}
          placeholder="Enter DID"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            height: "100px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
        </button>
      </form>
    </div>
  );
};

export default DingForm;
