import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDownload,
  faFloppyDisk,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons'
import { useMovieContext } from "../contexts/MovieContext"; // import MovieContext

const getLibraryBackups = () => {
  const backups = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("libraryBackup_")) {
      const data = localStorage.getItem(key);
      backups.push({
        key,
        data: JSON.parse(data),
        timestamp: key.replace("libraryBackup_", "")
      });
    }
  }
  backups.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  return backups;
};

const saveLibraryBackup = (library) => {
  if (!library || library.length === 0) {
    alert("Library is empty or missing.");
    return;
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const key = `libraryBackup_${timestamp}`;
  localStorage.setItem(key, JSON.stringify(library));
  alert(`Library backup saved as ${key}`);
};

const downloadBackup = (key, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${key}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const deleteBackup = (key) => {
  localStorage.removeItem(key);
  alert(`Backup ${key} deleted.`);
};

const LibraryBackupManager = () => {
  const [backups, setBackups] = useState([]);
  const [sortField, setSortField] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const { library, dispatch } = useMovieContext(); // use MovieContext

  const refreshBackups = () => {
    setBackups(getLibraryBackups());
  };

  const restoreBackup = (data) => {
    dispatch({ type: "SET_LIBRARY", payload: data });
    localStorage.setItem("owned", JSON.stringify(data)); // update localStorage
    alert("Backup restored!");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) {
          alert("Invalid backup format.");
          return;
        }

        // Optionally, save the imported backup as a new backup
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const key = `libraryBackup_${timestamp}_imported`;
        localStorage.setItem(key, JSON.stringify(data));

        // Restore to context
        restoreBackup(data);
        refreshBackups();
        alert("Backup imported successfully!");

      } catch (err) {
        console.error(err);
        alert("Failed to import backup. Make sure it's a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    refreshBackups();
  }, []);

  // Sorting logic
  const sortedBackups = [...backups].sort((a, b) => {
    let compareA, compareB;
    if (sortField === "timestamp") {
      compareA = a.timestamp;
      compareB = b.timestamp;
    } else if (sortField === "count") {
      compareA = a.data.length;
      compareB = b.data.length;
    }
    if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
    if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="content" data-page="backups">
      <h2>Library Backups</h2>

      <div className="button-container">
        <button className="btn btn--secondary" onClick={() => {
          saveLibraryBackup(library);
          refreshBackups();
        }}>
          <span className="btn-icon left">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </span>
          Save Current Library
        </button>
      </div>

      {sortedBackups.length === 0
        ? (
          <p>No backups found.</p>
          )
        : (
          <div className="backups-list">
            <table>
              <thead>
                <tr>
                  <th onClick={() => toggleSort("timestamp")}>
                    Timestamp {sortField === "timestamp" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => toggleSort("count")}>
                    Films {sortField === "count" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                <tr style={{ backgroundColor: "#f0f8ff" }}>
                  <td>Current Library</td>
                  <td>{library?.length || 0}</td>
                  <td></td>
                </tr>

                {sortedBackups.map((backup) => (
                  <tr key={backup.key}>
                    <td>{backup.timestamp}</td>
                    <td>{backup.data.length || "?"}</td>
                    <td>
                      <div className="button-container">

                        <button className="btn btn--tertiary" onClick={() => downloadBackup(backup.key, backup.data)}>
                          <span className="btn-icon left">
                            <FontAwesomeIcon icon={faDownload} />
                          </span>
                          Download
                        </button>

                        <button className="btn btn--secondary" onClick={() => {
                          if (window.confirm("Restore this backup? This will overwrite your current library.")) {
                            restoreBackup(backup.data);
                          }
                        }}>
                          <span className="btn-icon left">
                            <FontAwesomeIcon icon={faUpload} />
                          </span>
                          Restore
                        </button>

                        <button className="btn btn--secondary" onClick={() => {
                          if (window.confirm("Delete this backup?")) {
                            deleteBackup(backup.key);
                            refreshBackups();
                          }
                        }}>
                          <span className="btn-icon left">
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )
      }

      <p>Select a JSON backup to import.</p>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
};

export default LibraryBackupManager;
