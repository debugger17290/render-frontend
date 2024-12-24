import "./App.css";
import { useEffect, useState } from "react";
import axiosInstance from "./url";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axiosInstance
      .get("/users") // Using relative path since the base URL is already set
      .then((response) => {
        setUsers(response.data); // Store the fetched data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Set error if any
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // Render user name, assuming "id" and "name" properties
        ))}
      </ul>
    </div>
  );
}

export default App;
