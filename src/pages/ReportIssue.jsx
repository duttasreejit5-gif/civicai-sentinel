import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import { useState } from "react";
import { analyzeImage } from "../services/gemini";
function ReportIssue() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
  const handleAnalyze = async () => {
    console.log("Button clicked");
    
  try {
    setLoading(true);
    const base64 = await fileToBase64(file);
    console.log("Base64 created");

    const response = await analyzeImage(base64);
    console.log(response);

    setResult(response);

   console.log("Saving to Firestore...");

    const docRef = await addDoc(collection(db, "reports"), {
    result: response,
    status: "Pending",
    createdAt: new Date(),
});

  console.log("Saved! Document ID:", docRef.id);
  setSuccess(true);
  setLoading(false);

  } catch (error) {
    console.error(error);
    setSuccess(false);
    setLoading(false);
    setResult("Something went wrong!");
  }
};

  return (
  <div style={{ padding: "40px", color: "white", textAlign: "center" }}>

    <div style={{ textAlign: "left", marginBottom: "20px" }}>
      <Link
        to="/"
        style={{
          color: "#60A5FA",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        ← Back to Home
      </Link>
    </div>
      <h1>🚨 Report an Issue</h1>

      <p>Upload an image and let AI identify the civic issue.</p>

      <br />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <br />
      <br />

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{
            width: "350px",
            borderRadius: "12px",
            border: "2px solid #2563EB",
          }}
        />
      )}

      <br />
      <br />

      <button
  onClick={handleAnalyze}
  disabled={loading}
>
  {loading ? "⏳ Analyzing..." : "🤖 Analyze with AI"}
</button>
<br />
<br />

{success && (
  <div
    style={{
      background: "#16A34A",
      color: "white",
      padding: "15px",
      borderRadius: "10px",
      marginTop: "20px",
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    ✅ Report submitted successfully!
  </div>
)}

{result && (
  <div
    style={{
      marginTop: "20px",
      textAlign: "left",
      background:"#1E293B",
      padding: "20px",
      borderRadius: "10px",
      whiteSpace: "pre-wrap",
    }}
  >
    <h3>🤖 AI Analysis</h3>
    <p>{result}</p>
  </div>
)}
    </div>
  );
}

export default ReportIssue;