import { useState } from "react";


type TicketCardProps = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
};

function TicketCard({
  title,
  description,
  status,
  priority,
  assignee,
  
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

      <p>Created at: {new Date().toLocaleString()}</p>

      <p>Last updated: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default TicketCard;