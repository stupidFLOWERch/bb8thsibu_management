import "../styles/UpdateMember.css";
import SubmitButton from './SubmitButton';

function MemberForm({
  formData,
  selectedMember,
  onChange,
  onSave,
  submitting
}) {
  return (
    <div className="member-form">

      {selectedMember ? (
        <h3 className="editing-title">
          Editing: {selectedMember.First_name}
        </h3>
      ) : (
        <h3>Select a member</h3>
      )}

      <div className="form-group">
        <label>First Name</label>
        <input
          name="First_name"
          value={formData.First_name}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          name="Last_name"
          value={formData.Last_name}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="Email"
          value={formData.Email}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label>Telephone</label>
        <input
          name="Telephone"
          value={formData.Telephone}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label>Squad</label>
        <input
          name="Squad_id"
          type="number"
          value={formData.Squad_id}
          min={1}
          onChange={onChange}
          disabled={!selectedMember}
        />
      </div>

      <div className="form-group">
        <label>Rank</label>
        <select
          name="Ranks"
          value={formData.Ranks}
          onChange={onChange}
          disabled={!selectedMember}
        >
          <option value="">Select Rank</option>
          <option value="Pte">Pte</option>
          <option value="Lcpl">Lcpl</option>
          <option value="Cpl">Cpl</option>
          <option value="Sgt">Sgt</option>
          <option value="Ssgt">Ssgt</option>
        </select>
      </div>

      <SubmitButton onClick={onSave} loading={submitting}>
        Save Changes
      </SubmitButton>


    </div>
  );
}

export default MemberForm;