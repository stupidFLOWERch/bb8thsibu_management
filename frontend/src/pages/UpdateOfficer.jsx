import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { listOfficers, getMemberInfo, updateMemberInfo } from "../api/member";
import MemberForm from "../components/MemberForm";
import "../styles/UpdateMember.css";

function UpdateOfficer() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Telephone: "",
    Squad_id: "",
    Ranks: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if (name === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  };
  
  const handleSave = async () => {
    if (!selectedMember) return;
  
    if (emailError) {
      alert("Please fix email format before saving");
      return;
    }
  
    try {
      setSubmitting(true);
  
      await updateMemberInfo(selectedMember.Id, formData);
  
      alert("Member updated!");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  const showOfficers = async () => {
    try {
      const data = await listOfficers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

 const handleGetInfo = async (id) => {
  try {
    const member = await getMemberInfo(id);

    setSelectedMember(member);

    setFormData({
      First_name: member.First_name,
      Last_name: member.Last_name,
      Email: member.Email,
      Telephone: member.Telephone,
      Squad_id: member.Squad_id,
      Ranks: member.Ranks,
    });
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    showOfficers();
  }, []);

  return (
    <div className="menu-page">
      <TopBar />
  
      <header className="app-page-heading">
        <h1 className="page-title">Update Officer</h1>
        <p className="page-description">Select an officer to update their details.</p>
      </header>
      
      <div className="member-layout">
  
        {/* Left */}
        <div className="member-list">
          <table className="member-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {members.map((m) => (
                <tr key={m.Id}>
                  <td>{m.First_name}</td>
                  <td>{m.Last_name}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleGetInfo(m.Id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              
        <MemberForm
          formData={formData}
          selectedMember={selectedMember}
          onChange={handleChange}
          onSave={handleSave}
          submitting={submitting}
          memberType="officer"
        />

        </div>
      </div>

  );
}

export default UpdateOfficer;
