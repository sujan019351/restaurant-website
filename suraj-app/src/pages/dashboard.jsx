import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch (e) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>Zepto Canteen</h2>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              color: "#a78bfa",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              padding: "8px 14px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            🍔 Order Canteen Food
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {user && (
          <>
            <h1>Welcome, {user.name}!</h1>
            <p>You are logged into your canteen account.</p>

            <div className="user-card">
              <h3>Account Information</h3>

              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <div style={{ marginTop: "24px" }}>
                <Link
                  to="/"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #7025ec 0%, #ec4899 100%)",
                    color: "white",
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    textDecoration: "none"
                  }}
                >
                  ⚡ Open Canteen 10-Min Menu
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;