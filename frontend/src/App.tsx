import { useEffect, useState } from "react";
import TicketCard from "./components/TicketCard";
import CreateTicketForm from "./components/CreateTicketForm";

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);


  function loadTickets() {
    fetch("http://localhost:8080/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }
  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <main>
      <h1>Issue Tracker</h1>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          id={ticket.id}
          title={ticket.title}
          description={ticket.description}
          status={ticket.status}
          priority={ticket.priority}
          assignee={ticket.assignee}
          createdAt={ticket.createdAt}
          updatedAt={ticket.updatedAt}
          onDelete={loadTickets}
        />
      ))}
      <CreateTicketForm loadTickets={loadTickets} onDelete={loadTickets}/>
    </main>
  );
}

export default App;