import { arrowRightIcon } from '../../assets/figma'
import { registrations } from '../../data/dashboard'

export function RegistrationsTable() {
  return (
    <section className="table-card" aria-labelledby="registrations-title">
      <div className="table-card__header">
        <h2 id="registrations-title" className="section-title">
          Recent Registrations
        </h2>
        <button className="table-card__link" type="button">
          <span>View All</span>
          <img src={arrowRightIcon} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="table-scroll">
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Event</th>
              <th>Tickets</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={`${registration.customer}-${registration.date}`}>
                <td>
                  <div className="customer-cell">
                    <span className="customer-cell__avatar">{registration.initials}</span>
                    <span>{registration.customer}</span>
                  </div>
                </td>
                <td>{registration.event}</td>
                <td>{registration.tickets}</td>
                <td>{registration.amount}</td>
                <td>{registration.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
