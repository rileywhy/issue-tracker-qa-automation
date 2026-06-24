import { useState } from "react";

type LoginPageProps = {
setIsLoggedIn: (value: boolean) => void;
setUserName: (value: string) => void;
};
function LoginPage({ setIsLoggedIn, setUserName }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  


  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      const isLoggedIn = await response.json();

        if (isLoggedIn) {
            setIsLoggedIn(true);
            setUserName(email);
            setMessage("Login successful!");
        } else {
            setMessage("Invalid email or password.");
        }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default LoginPage;