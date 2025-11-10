import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Reply, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminReplyPanel() {
  const [queries, setQueries] = useState([]);
  const [editing, setEditing] = useState({});

  useEffect(() => {
  
    const q = query(collection(db, "queries"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQueries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  const saveReply = async (q) => {
    const text = editing[q.id]?.trim();
    if (!text) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      await updateDoc(doc(db, "queries", q.id), { answer: text });
      toast.success("Reply saved successfully!");
      setEditing({});
    } catch (err) {
      console.error(err);
      toast.error("Error saving reply. Check your Firestore rules.");
    }
  };

  const deleteQuestion = async (q) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteDoc(doc(db, "queries", q.id));
      toast.success("Question deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting question.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-xl border border-[#0D1B4C]/20 shadow-[0_10px_40px_rgba(13,27,76,0.1)] rounded-3xl p-6 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold text-[#0B1A3C] mb-6 flex items-center gap-2">
        <Reply className="text-[#0B1A3C]" /> Admin Reply Panel
      </h2>

      {queries.length === 0 && (
        <p className="text-gray-500 text-center py-6">No customer questions yet.</p>
      )}

      <div className="space-y-6">
        {queries.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#0D1B4C]/10 rounded-2xl p-5 bg-white/80"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[#0D1B4C]">{q.name}</p>
                <p className="text-xs text-gray-500">{q.date}</p>
              </div>
              <button
                onClick={() => deleteQuestion(q)}
                className="p-1.5 rounded-md hover:bg-red-50"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>

            <p className="mt-3 text-gray-800">{q.question}</p>

            
            <div className="mt-4">
              {!editing[q.id] ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  {q.answer ? (
                    <>
                      <p className="text-[#0D4C2E]">
                        <strong>Admin:</strong> {q.answer}
                      </p>
                      <button
                        onClick={() => setEditing({ [q.id]: q.answer })}
                        className="mt-2 text-sm text-blue-700 hover:underline"
                      >
                        Edit reply
                      </button>
                    </>
                  ) : (
                    <>
                      <textarea
                        placeholder="Write a reply..."
                        rows={2}
                        value={editing[q.id] ?? ""}
                        onChange={(e) =>
                          setEditing({ ...editing, [q.id]: e.target.value })
                        }
                        className="w-full border border-[#0D1B4C]/30 rounded-lg p-3 focus:ring-2 focus:ring-[#0D1B4C]/40 focus:outline-none"
                      />
                      <button
                        onClick={() => saveReply(q)}
                        className="mt-2 flex items-center gap-2 bg-[#0D1B4C] text-white px-3 py-1.5 rounded-md hover:bg-[#0A1538]"
                      >
                        <Save size={14} /> Save Reply
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <textarea
                    rows={3}
                    value={editing[q.id]}
                    onChange={(e) =>
                      setEditing({ ...editing, [q.id]: e.target.value })
                    }
                    className="w-full border border-[#0D1B4C]/30 rounded-lg p-3 focus:ring-2 focus:ring-[#0D1B4C]/40 focus:outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveReply(q)}
                      className="flex items-center gap-2 bg-[#0D1B4C] text-white px-3 py-1.5 rounded-md hover:bg-[#0A1538]"
                    >
                      <Save size={14} /> Save
                    </button>
                    <button
                      onClick={() => setEditing({})}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
