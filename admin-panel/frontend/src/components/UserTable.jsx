import React from "react";
import axios from "axios";

const UserTable = ({ users }) => {
  const toggleBlock = async (chatId, isBlocked) => {
    const token = localStorage.getItem("authToken");
    await axios.patch(
      `http://localhost:5000/api/users/block/${chatId}`,
      { isBlocked: !isBlocked },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Users</h3>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={cellStyle}>Chat ID</th>
            <th style={cellStyle}>Location</th>
            <th style={cellStyle}>Is Subscribed</th>
            <th style={cellStyle}>Is Blocked</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={rowStyle}>
              <td style={cellStyle}>{user.chatId}</td>
              <td style={cellStyle}>{user.location || "N/A"}</td>
              <td style={cellStyle}>{user.isSubscribed ? "Yes" : "No"}</td>
              <td style={cellStyle}>{user.isBlocked ? "Yes" : "No"}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => toggleBlock(user.chatId, user.isBlocked)}
                  style={buttonStyle}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const headerRowStyle = {
  backgroundColor: "#f4f4f4",
};

const rowStyle = {
  textAlign: "center",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const buttonStyle = {
  padding: "5px 10px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

export default UserTable;
