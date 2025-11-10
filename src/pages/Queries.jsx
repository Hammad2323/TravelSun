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
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
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
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [queries, setQueries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [editing, setEditing] = useState({});
  const userToken = useRef(ensureUserToken());
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  
  useEffect(() => {
    const q = query(collection(db, "queries"), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setQueries(data);
    });
    return () => unsub();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) {
      toast.error("Please fill in your name and question.");
      return;
    }
    await addDoc(collection(db, "queries"), {
      name: name.trim(),
      question: question.trim(),
      date: new Date().toLocaleString(),
      ownerToken: userToken.current,
      answer: null,
    });
    toast.success("Question submitted successfully!");
    setName("");
    setQuestion("");
  };

  
  const saveEditQuestion = async (q) => {
    const newText = editing[q.id]?.text.trim();
    if (!newText) return toast.error("Question cannot be empty.");
    await updateDoc(doc(db, "queries", q.id), {
      question: newText,
      date: new Date().toLocaleString(),
    });
    setEditing({});
    toast.success("Question updated.");
  };

  
  const deleteQuestion = async (q) => {
    const confirmMsg = isAdmin
      ? "Delete this question permanently?"
      : "Delete your question?";
    if (!window.confirm(confirmMsg)) return;
    await deleteDoc(doc(db, "queries", q.id));
    toast.success("Deleted successfully.");
  };

  
  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Admin logged out.");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F2FF] via-[#F5FAFF] to-[#EAF2FF] py-20 px-4 sm:px-6 font-[Inter]">
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-extrabold text-center text-[#0B1A3C] mb-10"
      >
        💬 Customer Queries
      </motion.h1>

    
      {!isAdmin && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-[#0D1B4C]/20 shadow-lg p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 border border-[#0D1B4C]/30 rounded-xl p-3 focus:ring-2 focus:ring-[#0D1B4C]/50 text-gray-800"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#0D1B4C] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#0A1538]"
            >
              <Send size={16} /> Ask
            </button>
          </div>
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="mt-3 w-full border border-[#0D1B4C]/30 rounded-xl p-3 focus:ring-2 focus:ring-[#0D1B4C]/50 text-gray-800"
          />
        </motion.form>
      )}

      
      <div className="max-w-3xl mx-auto mt-10 space-y-5">
        {queries.slice(0, visibleCount).map((q) => {
          const owned = q.ownerToken === userToken.current;
          const inEdit = editing[q.id];

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 border border-[#0D1B4C]/20 rounded-3xl shadow p-5 sm:p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-[#0D1B4C] font-semibold">
                    <MessageSquare size={16} /> {q.name}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{q.date}</p>
                </div>

        
                <div className="flex gap-2">
                  {owned && !q.answer && !inEdit && (
                    <>
                      <button
                        onClick={() =>
                          setEditing({ [q.id]: { text: q.question } })
                        }
                        className="p-1.5 rounded-lg hover:bg-[#E8EDFF]"
                      >
                        <Edit2 size={16} />
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
                {!inEdit ? (
                  <p className="text-gray-800">{q.question}</p>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={editing[q.id].text}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [q.id]: { text: e.target.value },
                        })
                      }
                      className="w-full border border-[#0D1B4C]/30 rounded-lg p-3 focus:ring-2 focus:ring-[#0D1B4C]/40"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEditQuestion(q)}
                        className="flex items-center gap-2 bg-[#0D1B4C] text-white px-3 py-1.5 rounded-md hover:bg-[#0A1538]"
                      >
                        <Check size={14} /> Save
                      </button>
                      <button
                        onClick={() => setEditing({})}
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
                  <p className="text-[#0D4C2E] font-medium">
                    <strong>Admin:</strong> {q.answer}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 italic">No answer yet</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

    
      {queries.length > visibleCount && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((v) => v + 10)}
            className="inline-flex items-center gap-2 bg-[#0D1B4C]/10 text-[#0D1B4C] px-4 py-2 rounded-full hover:bg-[#0D1B4C]/20"
          >
            <Eye size={14} /> See More
          </button>
        </div>
      )}

      
      {isAdmin && (
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0B1A3C]">Admin Panel</h2>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 text-red-600 hover:underline"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
          <AdminReplyPanel />
        </div>
      )}
    </div>
  );
}
