import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Reply,
  Edit2,
  Trash2,
  Check,
  X,
  LogOut,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";


export default function AdminReplyPanel({ queries = [], onUpdate }) {
  const [local, setLocal] = useState([]);
  const [replyText, setReplyText] = useState({}); 
  const [editingAnswer, setEditingAnswer] = useState({}); 

  useEffect(() => {
    setLocal(queries);
  }, [queries]);

  const persist = (list) => {
    onUpdate(list);
    setLocal(list);
  };

  const postReply = (q) => {
    const text = (replyText[q.id] || "").trim();
    if (!text) {
      toast.error("Please write an answer before replying.");
      return;
    }
    const updated = local.map((item) =>
      item.id === q.id ? { ...item, answer: text } : item
    );
    persist(updated);
    setReplyText((s) => ({ ...s, [q.id]: "" }));
    toast.success("Answer posted.");
  };

  const startEditAnswer = (q) => {
    setEditingAnswer((s) => ({ ...s, [q.id]: true }));
    setReplyText((s) => ({ ...s, [q.id]: q.answer || "" }));
  };

  const saveEditAnswer = (q) => {
    const text = (replyText[q.id] || "").trim();
    if (!text) {
      toast.error("Answer cannot be empty.");
      return;
    }
    const updated = local.map((item) => (item.id === q.id ? { ...item, answer: text } : item));
    persist(updated);
    setEditingAnswer((s) => {
      const c = { ...s };
      delete c[q.id];
      return c;
    });
    toast.success("Answer updated.");
  };

  const cancelEditAnswer = (q) => {
    setEditingAnswer((s) => {
      const c = { ...s };
      delete c[q.id];
      return c;
    });
    setReplyText((s) => {
      const c = { ...s };
      delete c[q.id];
      return c;
    });
  };

  const deleteQuestion = (q) => {
    if (!window.confirm("Are you sure you want to delete this question and its answer (if any)?")) return;
    const updated = local.filter((item) => item.id !== q.id);
    persist(updated);
    toast.success("Question deleted.");
  };

  const deleteAnswer = (q) => {
    if (!window.confirm("Delete this answer? This action cannot be undone.")) return;
    const updated = local.map((item) => (item.id === q.id ? { ...item, answer: null } : item));
    persist(updated);
    toast.success("Answer removed.");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast("Admin logged out.");
  
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-blue-100 rounded-2xl shadow-lg p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-700">🛠 Admin Reply Panel</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {local.length === 0 && (
          <div className="text-sm text-gray-500">No questions yet.</div>
        )}

        {local.map((q) => {
          const isAnswered = Boolean(q.answer);
          return (
            <div
              key={q.id}
              className="bg-blue-50/50 border border-blue-50 rounded-lg p-3 sm:p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-700">{q.name}</span>
                    <span className="text-xs text-gray-400">• {q.date}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-800">{q.question}</div>
                </div>

                <div className="flex items-start gap-2">
                  
                  <button
                    onClick={() => deleteQuestion(q)}
                    title="Delete question"
                    className="p-1 rounded-md hover:bg-red-50"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              <div className="mt-3">
                
                {!isAnswered ? (
                  <div className="space-y-2">
                    <textarea
                      placeholder="Type answer..."
                      value={replyText[q.id] || ""}
                      onChange={(e) => setReplyText((s) => ({ ...s, [q.id]: e.target.value }))}
                      rows={3}
                      className="w-full border border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => postReply(q)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md"
                      >
                        <Reply size={14} /> Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyText((s) => ({ ...s, [q.id]: "" }));
                        }}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md"
                      >
                        <X size={14} /> Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {!editingAnswer[q.id] ? (
                      <div className="flex items-start justify-between">
                        <div className="text-sm text-green-800">
                          <strong>Admin:</strong> {q.answer}
                        </div>
                        <div className="flex gap-2 ml-3">
                          <button
                            onClick={() => startEditAnswer(q)}
                            title="Edit answer"
                            className="p-1 rounded-md hover:bg-blue-50"
                          >
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteAnswer(q)}
                            title="Delete answer"
                            className="p-1 rounded-md hover:bg-red-50"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          value={replyText[q.id] || q.answer || ""}
                          onChange={(e) => setReplyText((s) => ({ ...s, [q.id]: e.target.value }))}
                          rows={3}
                          className="w-full border border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEditAnswer(q)}
                            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md"
                          >
                            <Check size={14} /> Save
                          </button>
                          <button
                            onClick={() => cancelEditAnswer(q)}
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md"
                          >
                            <X size={14} /> Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
