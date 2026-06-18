import { useEffect, useState } from "react";
import TicketCard from "./components/TicketCard";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
};

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <main>
      <h1>Issue Tracker</h1>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          title={ticket.title}
          description={ticket.description}
          status={ticket.status}
          priority={ticket.priority}
          assignee={ticket.assignee}
        />
      ))}
    </main>
  );
}

export default App;