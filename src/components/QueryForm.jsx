import { useState } from "react";

export default function QueryForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", question: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.question)
      return alert("Please fill both fields.");
    onSubmit(form);
    setForm({ name: "", question: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-lg grid gap-4"
    >
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="p-3 border rounded-lg"
      />
      <textarea
        name="question"
        placeholder="Ask your question..."
        value={form.question}
        onChange={handleChange}
        className="p-3 border rounded-lg"
        rows={3}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Submit Question
      </button>
    </form>
  );
}
