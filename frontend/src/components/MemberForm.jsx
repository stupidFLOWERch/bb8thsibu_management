import "../styles/UpdateMember.css";
import SubmitButton from './SubmitButton';

function MemberForm({
  formData,
  selectedMember,
  onChange,
  onSave,
  submitting,
  memberType
}) {
  return (
    <div className="member-form">
      
      {selectedMember ? (
        <h3 className="editing-title">
          Editing {selectedMember.Role === "Officers" ? "Officer" : "Member"}:{" "}
          {selectedMember.First_name}
        </h3>
      ) : (
        <h3>
          {memberType === "officer"
            ? "Select an officer"
            : "Select a member"}
        </h3>
      )}

      <div className="form-group">
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          name="First_name"
          value={formData.First_name}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          name="Last_name"
          value={formData.Last_name}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="Email"
          value={formData.Email}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Telephone</label>
        <input
          id="telephone"
          name="Telephone"
          value={formData.Telephone}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label htmlFor="squad">Squad</label>
        <input
          id="squad"
          name="Squad_id"
          type="number"
          value={formData.Squad_id}
          min={1}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rank">Rank</label>

        <select
          id="rank"
          name="Ranks"
          value={formData.Ranks}
          onChange={onChange}
          disabled={!selectedMember}
        >
          <option value="">Select Rank</option>

          {selectedMember?.Role === "Boys" && (
            <>
              <option value="Pte">Pte</option>
              <option value="Lcpl">Lcpl</option>
              <option value="Cpl">Cpl</option>
              <option value="Sgt">Sgt</option>
              <option value="Ssgt">Ssgt</option>
            </>
          )}

          {selectedMember?.Role === "Officers" && (
            <>
              <option value="Helper">Helper</option>
              <option value="W/O">W/O</option>
              <option value="Lt.">Lt.</option>
              <option value="Capt.">Capt.</option>
              <option value="H/Capt.">H/Capt.</option>
              <option value="Chap.">Chap.</option>
            </>
          )}
        </select>
      </div>

      <SubmitButton onClick={onSave} loading={submitting}>
        Save Changes
      </SubmitButton>


    </div>
  );
}

export default MemberForm;