"use client";
import { useState } from "react";

export default function DashboardForm() {
  const [domain, setDomain] = useState("");

  return (
    <form>
      <input
        type="text"
        name="domain"
        placeholder="domain"
        value={domain}
        onChange={(e) => {
          e.preventDefault();
          setDomain(e.target.value);
        }}
      ></input>
    </form>
  );
}
