import { useCallback, useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import CreateTicketForm from "../components/CreateTicketForm";
import "../App.css";

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

type TicketPageProps = {
  token: string;
};

function TicketPage({ token }: TicketPageProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [searchFilter, setSearchFilter] = useState("");
  const [message, setMessage] = useState("");

  const loadTickets = useCallback(() => {
    fetch("/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setMessage(`Could not load tickets (${response.status}).`);
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (data === null) {
          return;
        }

        setTickets(data);
        setMessage("");
      });
  }, [token]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "ALL" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "ALL" || ticket.priority === priorityFilter;
    const matchesSearch =
      searchFilter === "" ||
      ticket.description.toLowerCase().includes(searchFilter) ||
      ticket.title.toLowerCase().includes(searchFilter);

    return matchesStatus && matchesPriority && matchesSearch;
  });
  return (
    <main>
      <h1>Issue Tracker</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>
      {message && <p role="alert">{message}</p>}
      {filteredTickets.map((ticket) => (
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
          onUpdate={loadTickets}
          token={token}
        />
      ))}
      <CreateTicketForm
        loadTickets={loadTickets}
        onDelete={loadTickets}
        token={token}
      />
    </main>
  );
}

export default TicketPage;
