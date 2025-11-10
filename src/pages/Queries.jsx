import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminReplyPanel from "../components/AdminReplyPanel";

function ensureUserToken() {
  let token = localStorage.getItem("userToken");
  if (!token) {
    token = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("userToken", token);
  }
  return token;
}

export default function Queries() {
  const listRef = useRef(null);
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [queries, setQueries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [editing, setEditing] = useState({});
  const userToken = useRef(ensureUserToken());
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("queries") || "[]");
    setQueries(stored);
  }, []);

  const persist = (list) => {
    const trimmed = list.slice(0, 20);
    localStorage.setItem("queries", JSON.stringify(trimmed));
    setQueries(trimmed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) {
      toast.error("Please provide your name and question.");
      return;
    }

    const newQ = {
      id: Date.now(),
      name: name.trim(),
      question: question.trim(),
      answer: null,
      date: new Date().toLocaleString(),
      ownerToken: userToken.current,
    };

    const updated = [newQ, ...queries].slice(0, 20);
    persist(updated);
    toast.success("Question submitted — admin will reply soon.");
    setName("");
    setQuestion("");
    setTimeout(() => listRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  const startEditQuestion = (q) => {
    setEditing((s) => ({ ...s, [q.id]: { text: q.question } }));
  };
  const saveEditQuestion = (q) => {
    const updated = queries.map((item) =>
      item.id === q.id ? { ...item, question: editing[q.id].text, date: new Date().toLocaleString() } : item
    );
    persist(updated);
    setEditing((s) => {
      const copy = { ...s };
      delete copy[q.id];
      return copy;
    });
    toast.success("Question updated.");
  };
  const cancelEditQuestion = (q) => {
    setEditing((s) => {
      const copy = { ...s };
      delete copy[q.id];
      return copy;
    });
  };
  const deleteQuestion = (q) => {
    const confirmMsg = isAdmin
      ? `Are you sure you want to permanently delete this question (ID: ${q.id})?`
      : "Are you sure you want to delete your question? This cannot be undone.";
    if (!window.confirm(confirmMsg)) return;
    const updated = queries.filter((item) => item.id !== q.id);
    persist(updated);
    toast.success("Question deleted.");
  };
  const handleAdminUpdate = (updatedList) => {
    persist(updatedList);
    toast.success("Admin changes saved.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F2FF] via-[#F5FAFF] to-[#EAF2FF] py-20 px-4 sm:px-6 font-[Inter]">
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-extrabold text-center text-[#0B1A3C] mb-10 drop-shadow-[0_2px_8px_rgba(13,27,76,0.2)]"
      >
        💬 Customer Queries
      </motion.h1>

  
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-[#0D1B4C]/20 shadow-[0_10px_40px_rgba(13,27,76,0.1)] p-6 sm:p-8 transition-all hover:shadow-[0_10px_50px_rgba(13,27,76,0.15)]"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 border border-[#0D1B4C]/30 rounded-xl p-3 focus:ring-2 focus:ring-[#0D1B4C]/50 focus:outline-none text-gray-800"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#0D1B4C] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#0A1538] transition-all shadow-[0_3px_10px_rgba(13,27,76,0.3)]"
          >
            <Send size={16} /> Ask Question
          </button>
        </div>
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="mt-3 w-full border border-[#0D1B4C]/30 rounded-xl p-3 focus:ring-2 focus:ring-[#0D1B4C]/50 focus:outline-none text-gray-800"
        />
      </motion.form>

  
      <div ref={listRef} className="max-w-3xl mx-auto mt-10 space-y-5">
        {queries.slice(0, visibleCount).map((q) => {
          const inEditMode = Boolean(editing[q.id]);
          const isAdmin = localStorage.getItem("isAdmin") === "true";
          const owned = q.ownerToken === userToken.current;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl border border-[#0D1B4C]/20 rounded-3xl shadow-[0_8px_30px_rgba(13,27,76,0.1)] p-5 sm:p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-[#0D1B4C] font-semibold">
                    <MessageSquare size={16} />
                    <span>{q.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{q.date}</p>
                </div>

                
                <div className="flex gap-2">
                  {owned && !q.answer && !inEditMode && (
                    <>
                      <button
                        onClick={() => setEditing({ ...editing, [q.id]: { text: q.question } })}
                        className="p-1.5 rounded-lg hover:bg-[#E8EDFF]"
                      >
                        <Edit2 size={16} className="text-[#0D1B4C]" />
                      </button>
                      <button
                        onClick={() => deleteQuestion(q)}
                        className="p-1.5 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => deleteQuestion(q)}
                      className="p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  )}
                </div>
              </div>

              
              <div className="mt-3">
                {!inEditMode ? (
                  <p className="text-gray-800 leading-relaxed">{q.question}</p>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={editing[q.id].text}
                      onChange={(e) =>
                        setEditing({ ...editing, [q.id]: { text: e.target.value } })
                      }
                      className="w-full border border-[#0D1B4C]/30 rounded-lg p-3 focus:ring-2 focus:ring-[#0D1B4C]/40"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEditQuestion(q)}
                        className="flex items-center gap-2 bg-[#0D1B4C] text-white px-3 py-1.5 rounded-md hover:bg-[#0A1538]"
                      >
                        <Check size={14} /> Save
                      </button>
                      <button
                        onClick={() => cancelEditQuestion(q)}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md"
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-[#0D1B4C]/10">
                {q.answer ? (
                  <div className="text-[#0D4C2E] font-medium">
                    <strong>Admin:</strong> {q.answer}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 italic">No answer yet</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      
      {queries.length > visibleCount && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setVisibleCount((v) => v + 10);
              toast("Loaded more questions.");
            }}
            className="inline-flex items-center gap-2 bg-[#0D1B4C]/10 text-[#0D1B4C] px-4 py-2 rounded-full hover:bg-[#0D1B4C]/20 transition"
          >
            <Eye size={14} /> See More
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="max-w-3xl mx-auto mt-10">
          <AdminReplyPanel queries={queries} onUpdate={handleAdminUpdate} />
        </div>
      )}
    </div>
  );
}
