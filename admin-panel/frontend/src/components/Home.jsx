import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import SettingsTable from "./SettingsTable";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userResponse = await axios.get("http://localhost:5000/api/users", config);
        // const settingsResponse = await axios.get("http://localhost:5000/api/settings", config);

        setUsers(userResponse.data);
        // setSettings(settingsResponse.data);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h2>Admin Dashboard</h2>
      <UserTable users={users} />
      {/* <SettingsTable settings={settings} /> */}
    </div>
  );
};

export default Home;
