import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Kober from "/media/logos/kober.png";
import UserLogo from "/media/logos/UserLogo.svg";
import UserIcon from "/media/logos/UserIcon.svg";
import CompanyIcon from "/media/logos/CompanyIcon.svg";
import Dropdown from "/media/logos/Dropdown.svg";
import Logout from "/media/logos/Logout.svg";
import { getProfile } from "./request/_request";

interface Company {
  id: string;
  name: string;
  created_at: string;
  type: string;
  owner: string;
  status: boolean;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]); // State to store the fetched companies
  const navigate = useNavigate();

  // Fetch companies data when the component mounts
  // Update your useEffect to get companies from userLogin
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get userLogin data from localStorage
        const userLoginStr = localStorage.getItem("userLogin");
        if (!userLoginStr) {
          throw new Error("userLogin not found in localStorage");
        }

        const userLogin = JSON.parse(userLoginStr) as {
          user?: { id?: string; name?: string };
          companies?: Company[];
        };

        // Set companies from userLogin if they exist
        if (userLogin.companies && userLogin.companies.length > 0) {
          setCompanies(userLogin.companies);

          const storedCompanyId = localStorage.getItem("company_id");
          const selectedCompany = storedCompanyId
            ? userLogin.companies.find((c) => c.id === storedCompanyId)
            : userLogin.companies[0];

          if (selectedCompany) {
            setSelectedOutlet(selectedCompany.name);
            localStorage.setItem("company_id", selectedCompany.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Filter daftar cabang berdasarkan input pencarian
  const filteredCabang = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    // Remove user-related data from localStorage
    localStorage.removeItem("userLogin"); // Remove usersLogin
    localStorage.removeItem("company_id"); // Optionally, remove company_id as well

    navigate(0); // Adjust the route as needed
  };

  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
  const userName = userLogin?.user?.name || "Guest";

  return (
    <div
      className="fixed-top d-flex align-items-center bg-white border shadow-sm"
      style={{ height: "5rem" }}
    >
      {/* Logo */}
      <div className="header-logo me-5 ms-3 d-flex align-items-center h-80">
        <Link className="d-flex align-items-center" to="/">
          <img src={Kober} alt="Logo" className="h-40px me-2" />
          <h2 className="mb-0 fw-bold">Kober ERP</h2>
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-grow-1"></div>

      {/* User Profile Section */}
      <div className="position-relative me-3">
        <img
          src={UserLogo}
          alt="UserLogo"
          className="h-40px me-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        />
        {isOpen && (
          <div
            className="position-absolute end-0 bg-white shadow-lg rounded p-3"
            style={{ width: "250px", top: "50px", zIndex: 1000 }}
          >
            <div className="d-flex align-items-center mb-3">
              <img src={UserIcon} alt="UserIcon" className="h-40px me-2" />
              <span className="fw-bold">{userName}</span>
            </div>

            {/* Dropdown Outlet */}
            <div className="border-top py-2">
              <button
                className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={CompanyIcon}
                    alt="CompanyIcon"
                    className="h-25px me-2"
                  />
                  <span className="fw-bold">
                    {selectedOutlet || "Pilih Outlet"}
                  </span>
                </div>
                <img
                  src={Dropdown}
                  alt="Dropdown"
                  className="h-5px me-2"
                  style={{
                    transform: isDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {isDropdownOpen && (
                <div className="mt-2 border rounded p-2 bg-light">
                  {/* Search Input */}
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Cari cabang..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  {/* List Cabang */}
                  <div className="overflow-auto" style={{ maxHeight: "150px" }}>
                    {filteredCabang.length > 0 ? (
                      filteredCabang.map((company, index) => (
                        <button
                          key={index}
                          className="text-start w-100 border-0 bg-transparent p-2 ps-3 text-dark fw-semibold d-block"
                          onClick={() => {
                            setSelectedOutlet(company.name);
                            setIsDropdownOpen(false);
                            setSearchTerm(""); // Reset search

                            // Update company_id in local storage
                            localStorage.setItem("company_id", company.id);
                            window.location.href = window.location.pathname;
                          }}
                        >
                          {company.name}
                        </button>
                      ))
                    ) : (
                      <p className="text-muted text-center">
                        Cabang tidak ditemukan
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="border-top py-2">
              <button
                className="d-flex align-items-center w-100 border-0 bg-transparent p-2"
                onClick={handleLogout} // Call handleLogout on button click
              >
                <img src={Logout} alt="Logout" className="h-25px me-2" />
                <span className="fw-bold">Keluar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
