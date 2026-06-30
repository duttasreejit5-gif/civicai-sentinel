import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const pendingCount = reports.filter(
  (report) => report.status === "Pending"
).length;

const resolvedCount = reports.filter(
  (report) => report.status === "Resolved"
).length;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const q = query(
  collection(db, "reports"),
  orderBy("createdAt", "desc")
);

const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setReports(data);
  };
  const handleResolve = async (id) => {
    await updateDoc(doc(db, "reports", id), {
        status: "Resolved",
     });

    fetchReports();
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>

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

  <br />
  <br />

  <h1>👮 Officer Dashboard</h1>
      <input
  type="text"
  placeholder="🔍 Search reports..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    marginBottom: "30px",
    borderRadius: "10px",
    border: "1px solid #475569",
    background: "#1E293B",
    color: "white",
    fontSize: "16px",
    outline: "none",
  }}
/>
  <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "30px",
    borderRadius: "10px",
    background: "#1E293B",
    color: "white",
    border: "1px solid #475569",
    fontSize: "16px",
  }}
>
  <option value="All">All Reports</option>
  <option value="Pending">Pending</option>
  <option value="Resolved">Resolved</option>
</select>
  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginBottom: "30px",
    borderRadius: "10px",
    background: "#1E293B",
    color: "white",
    border: "1px solid #475569",
    fontSize: "16px",
  }}
>
  <option value="Newest">Newest First</option>
  <option value="Oldest">Oldest First</option>
</select>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#1E293B",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h2>{reports.length}</h2>
    <p>Total Reports</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#F59E0B",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
    }}
  >
    <h2>{pendingCount}</h2>
    <p>Pending</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#16A34A",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
    }}
  >
    <h2>{resolvedCount}</h2>
    <p>Resolved</p>
  </div>
</div>

      <br />

     {reports
  .filter((report) =>
    report.result.toLowerCase().includes(search.toLowerCase())
  )
  .filter((report) =>
    filter === "All" ? true : report.status === filter
  )
  .map((report) => (
        <div
          key={report.id}
          style={{
  background: "#1E293B",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "25px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  border: "1px solid #334155",
}}
        >
          <div
  style={{
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "20px",
    backgroundColor:
      report.status === "Resolved" ? "#16A34A" : "#F59E0B",
    color: "white",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  {report.status === "Resolved"
    ? "✅ Resolved"
    : "🟡 Pending"}
</div>

          {(() => {
  const issue = report.result.match(/Issue:\s*(.*?)(?=Severity:|$)/s);

  const severity = report.result.match(/Severity:\s*(.*?)(?=Description:|$)/s);

  const description = report.result.match(/Description:\s*(.*)/s);

  return (
    <>
      <p>
        <strong>🚨 Issue:</strong><br />
        {
  issue
    ? issue[1].replace(/\*\*/g, "").trim()
    : "Not Available"
}
      </p>

      <br />

      <p>
        <strong>⚠ Severity:</strong>
<br />

<span
  style={{
    color:
      severity &&
      severity[1].toLowerCase().includes("high")
        ? "#EF4444"
        : severity &&
          severity[1].toLowerCase().includes("moderate")
        ? "#F59E0B"
        : "#22C55E",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  {severity
    ? severity[1].replace(/\*\*/g, "").trim()
    : "Not Available"}
</span>
      </p>

      <br />

      <div>
  <strong>📝 Description:</strong>
  <br />
  {description
    ? description[1].replace(/\*\*/g, "").trim()
    : "Not Available"}

  <br />
  <br />

  <strong>🕒 Reported On:</strong>
  <br />
  {report.createdAt
    ? report.createdAt.toDate().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not Available"}
</div>
    </>
  );
})()}
          {report.status === "Pending" ? (
  <button
    onClick={() => handleResolve(report.id)}
    style={{
      marginTop: "15px",
      padding: "10px 20px",
      background: "#2563EB",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ✔ Resolve
  </button>
) : (
  <div
    style={{
      marginTop: "15px",
      color: "#22C55E",
      fontWeight: "bold",
    }}
  >
    ✅ Already Resolved
  </div>
)}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;