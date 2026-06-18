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
    <div>
      <h2>{title}</h2>

      <button onClick={() => setExpanded(!expanded)}>
        Toggle Description
      </button>

      {expanded && <p>{description}</p>}

      <p>
        {status} - {priority}
      </p>

      <p>Assigned to: {assignee}</p>
    </div>
  );
}

export default TicketCard;