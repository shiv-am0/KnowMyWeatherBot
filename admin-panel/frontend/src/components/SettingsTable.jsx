import React, { useState } from "react";
import axios from "axios";

const SettingsTable = ({ settings }) => {
  const [weatherApiKey, setWeatherApiKey] = useState(settings.weatherApiKey);
  const [telegramBotToken, setTelegramBotToken] = useState(settings.telegramBotToken);

  const updateSettings = async () => {
    const token = localStorage.getItem("authToken");
    await axios.put(
      "http://localhost:5000/api/admin/settings",
      { weatherApiKey, telegramBotToken },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Settings updated!");
  };

  return (
    <div>
      <h3>Settings</h3>
      <table>
        <tbody>
          <tr>
            <td>Weather API Key</td>
            <td>
              <input
                type="text"
                value={weatherApiKey}
                onChange={(e) => setWeatherApiKey(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Telegram Bot Token</td>
            <td>
              <input
                type="text"
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={updateSettings}>Save</button>
    </div>
  );
};

export default SettingsTable;
