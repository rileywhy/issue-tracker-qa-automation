import { useState } from "react";

type AccountMenuProps = {
  name: string;
  onLogout: () => void;
};

function AccountMenu({ name, onLogout }: AccountMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="account-menu">
      <button
        className="account-button"
        onClick={() => setOpen(!open)}
      >
        {name} ▼
      </button>

      {open && (
        <div className="account-dropdown">
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;