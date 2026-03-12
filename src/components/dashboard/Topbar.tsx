import { bellIcon, caretDownIcon } from '../../assets/figma'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <img src={bellIcon} alt="" aria-hidden="true" />
        </button>

        <button className="profile-chip" type="button">
          <span className="profile-chip__avatar">DA</span>
          <span className="profile-chip__name">Delasie Ametepey</span>
          <img src={caretDownIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
