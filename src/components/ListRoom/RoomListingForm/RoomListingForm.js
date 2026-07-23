import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import "./RoomListingForm.css";

/* ── questions ── */
const ALL_QUESTIONS = [
  { key:"roomType",      title:"What type of flat are you listing?",           type:"single", opts:["Studio Apartment","1BHK","2BHK","3BHK","4BHK+","Any"] },
  { key:"occupancy",     title:"What type of flat occupancy?",                 type:"single", opts:["Single Occupancy","Double Occupancy","Triple Occupancy","Other"] },
  { key:"furnished",     title:"Is the flat furnished?",                       type:"single", opts:["Fully Furnished","Semi Furnished","Unfurnished","Any"] },
  { key:"availableFor",  title:"Who is the flat available for?",               type:"single", opts:["Male","Female","No Preference","Any"] },
  { key:"availableFrom", title:"When is the flat available from?",             type:"date" },
  { key:"rent",          title:"What is the monthly rent for the flat/room?",  type:"number" },
  { key:"deposit",       title:"What is the security deposit amount?",         type:"number" },
  { key:"bathroom",      title:"What kind of bathroom is available?",          type:"single", opts:["Attached Bathroom","Shared Bathroom","Private Bathroom","Common Bathroom"] },
  { key:"amenities",     title:"What amenities are available in the flat?",    type:"multi",  opts:["WiFi","AC","Geyser","Refrigerator","Microwave","Cook","Maid Service","Parking","Laundry","Lift","Balcony","Gym","Swimming Pool","Power Backup","Security"] },
  { key:"address",       title:"What is the full address of the flat?",        type:"text" },
  { key:"landmark",      title:"Add a nearby landmark (Optional)",             type:"text" },
  { key:"description",   title:"Describe your flat",                           type:"textarea" },
  { key:"genderPref",    title:"What is your preferred flatmate gender?",      type:"single", opts:["Male","Female","No Preference","Any"] },
  { key:"agePref",       title:"What is your preferred flatmate age group?",   type:"single", opts:["18-24","25-30","30-40","40+","No Preference"] },
  { key:"occupationPref",title:"Preferred flatmate occupation type?",          type:"single", opts:["Student","Working Professional","Both","No Preference"] },
  { key:"habits",        title:"What habits do you prefer in a flatmate?",     type:"multi",  opts:["Non-Smoker","Non-Drinker","Vegetarian","Tidy","Quiet","Social","Early Riser","Respectful","Pet Friendly","Financially Responsible"] },
  { key:"qualities",     title:"What qualities do you desire in a flatmate?",  type:"multi",  opts:["Friendly","Respectful","Tidy","Communicative","Quiet","Independent","Responsible","Easy Going","Financially Stable","Shares Chores"] },
  { key:"dealBreakers",  title:"Any deal breakers for a flatmate?",            type:"multi",  opts:["Smoking Indoors","Untidiness","Frequent Parties","Late Night Guests","Unpaid Bills","Poor Communication","Drug Use","Disrespectful Behaviour"] },
];

const DESKTOP_GROUPS = [
  [0,1],[2,3],[4,5],[6,7],[8],[9,10],[11],[12,13],[14,15],[16,17],
];

/* ── helpers ── */
function Chips({ options=[], value, onChange, multi=false }) {
  const isActive = (o) => multi ? (value||[]).includes(o) : value === o;
  const handle   = (o) => {
    if (!multi) { onChange(o); return; }
    const arr = value||[];
    onChange(arr.includes(o) ? arr.filter((i)=>i!==o) : [...arr,o]);
  };
  return (
    <div className="room-grid">
      {options.map((o) => (
        <button type="button" key={o}
          className={`room-card ${isActive(o)?"active":""}`}
          onClick={()=>handle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

function QuestionCard({ q, form, set }) {
  return (
    <div className="question-card">
      <h1>{q.title}</h1>
      {q.type==="date" && <input type="date" className="input-field" min={new Date().toISOString().split("T")[0]} value={form[q.key]||""} onChange={(e)=>set(q.key,e.target.value)} />}
      {q.type==="number"   && <input type="number" className="input-field" placeholder="Enter amount in ₹" value={form[q.key]||""} onChange={(e)=>set(q.key,e.target.value)} />}
      {q.type==="text"     && <input type="text"   className="input-field" value={form[q.key]||""} onChange={(e)=>set(q.key,e.target.value)} />}
      {q.type==="textarea" && <textarea className="input-field textarea-field" rows="5" placeholder="Describe your flat..." value={form[q.key]||""} onChange={(e)=>set(q.key,e.target.value)} />}
      {q.type==="single"   && <Chips options={q.opts} value={form[q.key]}       onChange={(v)=>set(q.key,v)} />}
      {q.type==="multi"    && <Chips options={q.opts} value={form[q.key]||[]}   onChange={(v)=>set(q.key,v)} multi />}
    </div>
  );
}

/* ── main component ── */
export default function RoomListingForm({ onComplete }) {
  const [step, setStep]                 = useState(1);
  const [showSections, setShowSections] = useState(false);
  const [isDesktop, setIsDesktop]       = useState(window.innerWidth >= 1024);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");
  const [form, setForm]                 = useState({
    amenities:[], habits:[], qualities:[], dealBreakers:[],
  });

  useEffect(() => {
    const handle = () => {
      const d = window.innerWidth >= 1024;
      if (d !== isDesktop) { setIsDesktop(d); setStep(1); }
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [isDesktop]);

  const TOTAL    = isDesktop ? DESKTOP_GROUPS.length : ALL_QUESTIONS.length;
  const progress = Math.round((step / TOTAL) * 100);

  const currentQuestions = isDesktop
    ? DESKTOP_GROUPS[step-1].map((i) => ALL_QUESTIONS[i])
    : [ALL_QUESTIONS[step-1]];

  const set = (key,val) => setForm((f) => ({...f,[key]:val}));

  /* ── save to users/{uid}/roomListings subcollection ── */
  const saveToFirebase = async () => {
    setSaving(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in. Please log in and try again.");

      await addDoc(
        collection(db, "users", user.uid, "roomListings"),  // subcollection under user
        {
          ...form,
          rent:      form.rent    ? Number(form.rent)    : null,
          deposit:   form.deposit ? Number(form.deposit) : null,
          uid:       user.uid,        // redundant but handy for queries
          email:     user.email,      // store user email for reference
          createdAt: serverTimestamp(),
          status:    "active",
        }
      );
      onComplete?.();
    } catch (err) {
      console.error("Firebase save error:", err);
      setError(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const goNext = () => {
    if (step < TOTAL) setStep((s) => s + 1);
    else saveToFirebase();
  };
  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const SECTION_LABELS = [
    "1. Room Type & Occupancy","2. Furnishing & Availability",
    "3. Rent & Deposit","4. Bathroom Details","5. Amenities",
    "6. Location","7. Flat Description","8. Flatmate Preferences",
  ];

  return (
    <div className="basic-info-container">

      <div className="listroom-header">
        <button className="back-arrow" onClick={goBack}>←</button>
        <button className="section-btn" onClick={() => setShowSections(true)}>Sections</button>
      </div>

      {showSections && (
        <div className="section-overlay" onClick={() => setShowSections(false)}>
          <div className="section-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Room Listing Sections</h3>
              <button className="close-btn" onClick={() => setShowSections(false)}>✕</button>
            </div>
            {SECTION_LABELS.map((label, i) => (
              <div key={i} className={`section-item ${i===Math.floor((step-1)/2)?"active":""}`}>
                <span>{label}</span>
                {i===Math.floor((step-1)/2) && <span className="active-arrow">›</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <span className="section-title">Room listing • Question {step} of {TOTAL}</span>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width:`${progress}%` }} />
      </div>

      {currentQuestions.map((q) => (
        <QuestionCard key={q.key} q={q} form={form} set={set} />
      ))}

      {error && <p className="save-error">{error}</p>}

      <div className="button-wrapper">
        <button className="back-btn" onClick={goBack} disabled={step===1||saving}>
          ← Back
        </button>
        <button className="next-btn" onClick={goNext} disabled={saving}>
          {saving ? "Saving..." : step===TOTAL ? "Finish ✓" : "Next→"}
        </button>
      </div>

    </div>
  );
}