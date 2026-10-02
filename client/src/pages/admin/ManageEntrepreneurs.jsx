import { useEffect, useState } from "react";
import API from "../../api";
import "./ManageEntrepreneurs.css";

const ManageEntrepreneurs = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/entrepreneurs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEntrepreneurs(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load entrepreneurs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/entrepreneurs/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Entrepreneur approved successfully");

      // Reload the page data after approval
      const response = await API.get("/admin/entrepreneurs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntrepreneurs(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to approve entrepreneur"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-page-message">
        Loading entrepreneurs...
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
        <h1>Manage Entrepreneurs</h1>
        <p>
          View and approve HunarHub entrepreneurs.
        </p>
      </div>

      {entrepreneurs.length === 0 ? (
        <div className="admin-empty">
          No entrepreneurs found.
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {entrepreneurs.map((entrepreneur) => (
                <tr key={entrepreneur._id}>
                  <td>{entrepreneur.fullName}</td>

                  <td>{entrepreneur.email}</td>

                  <td>
                    {entrepreneur.phone || "Not provided"}
                  </td>

                  <td>
                    {entrepreneur.location || "Not provided"}
                  </td>

                  <td>
                    {entrepreneur.isVerified ? (
                      <span className="status approved">
                        Approved
                      </span>
                    ) : (
                      <span className="status pending">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    {!entrepreneur.isVerified ? (
                      <button
                        className="approve-btn"
                        onClick={() =>
                          handleApprove(entrepreneur._id)
                        }
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="approved-text">
                        ✓ Approved
                      </span>
                    )}
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

export default ManageEntrepreneurs;