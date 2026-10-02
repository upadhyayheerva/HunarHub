import { useEffect, useState } from "react";
import API from "../../api";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully");

      // Remove deleted user from the screen
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete user"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-page-message">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-manage-page">
      <div className="admin-page-header">
        <h1>Manage Users</h1>
        <p>
          View and manage HunarHub customers and entrepreneurs.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="admin-empty">
          No users found.
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>

                  <td>{user.email}</td>

                  <td>
                    {user.phone || "Not provided"}
                  </td>

                  <td>
                    {user.location || "Not provided"}
                  </td>

                  <td>
                    <span className="role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.role === "entrepreneur" ? (
                      user.isVerified ? (
                        <span className="status approved">
                          Approved
                        </span>
                      ) : (
                        <span className="status pending">
                          Pending
                        </span>
                      )
                    ) : (
                      <span className="status approved">
                        Active
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;