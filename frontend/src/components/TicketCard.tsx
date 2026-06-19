import { useState } from "react";


type TicketCardProps = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  onDelete: () => void;
};




function TicketCard({
  title,
  description,
  status,
  priority,
  assignee,
  createdAt,
  updatedAt,
  id,
  onDelete,


}: TicketCardProps) {

  const [expanded, setExpanded] = useState(false);
  return (
    <div className="ticket-card">
      <h2>{title}</h2>

      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide Details" : "Show Details"}
      </button>

      {expanded && <p>{description}</p>}

      <p>
        {status} - {priority}
      </p>

      <p>Assigned to: {assignee}</p>

      <p>Created at: {new Date(createdAt).toLocaleString()}</p>

      <p>Last updated: {new Date(updatedAt).toLocaleString()}</p>
      <button onClick={() => deleteTicket()}>
        Delete Ticket
      </button>
    </div>
  );
  function deleteTicket() {
    fetch(`http://localhost:8080/ticket/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete();
    });
  }
}

export default TicketCard;