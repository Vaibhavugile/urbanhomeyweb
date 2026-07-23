import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";

import "./BasicInfo.css";

const ROOM_TYPES = ["Studio Apartment","1BHK","2BHK","3BHK","4BHK+","Any"];
const OCCUPANCY  = ["Single Occupancy","Double Occupancy","Triple Occupancy","Other"];
const FURNISHED  = ["Fully Furnished","Semi Furnished","Unfurnished","Any"];
const AMENITIES  = ["WiFi","AC","Geyser","Refrigerator","Microwave","Maid Service","Cook","Parking","Laundry","Lift","Balcony","Gym","Swimming Pool","Power Backup","Security"];
const GENDER     = ["Male","Female","No preference","Any"];
const AGE        = ["18–24","25–30","30–40","40+","No preference"];
const OCCUPATION = ["Student","Working Professional","Both","No preference"];
const HABITS     = ["Non-Smoker","Non-Drinker","Vegetarian","Tidy","Quiet","Social","Early Riser","Respectful","Financially Responsible","Pet Friendly"];
const QUALITIES  = ["Friendly","Respectful","Tidy","Communicative","Quiet","Independent","Shares chores","Financially stable","Responsible","Easy Going"];
const LIFESTYLE  = ["Non-Smoker","Smoker Friendly","Non-Drinker","Social Drinking","Early Sleeper","Night Owl","Clean & Organized","Flexible with Guests"];

const ALL_QUESTIONS = [
  { key:"moveInDate",     title:"When are you looking to move in?",       sub:"Approximate date works fine.",     type:"date"   },
  { key:"minBudget",      title:"What is your minimum budget per month?",  sub:"Drag the slider to set amount.", type:"number", min:1000,  max:50000,  step:500  },
  { key:"maxBudget",      title:"What is your maximum budget per month?",  sub:"Drag the slider to set amount.", type:"number", min:1000,  max:100000, step:500  },
  { key:"roomType",       title:"What type of flat are you looking for?",  sub:"Choose one option.",              type:"single", opts:ROOM_TYPES  },
  { key:"occupancy",      title:"What occupancy are you looking for?",     sub:"Choose one option.",              type:"single", opts:OCCUPANCY   },
  { key:"furnished",      title:"Preferred furnished status?",             sub:"Choose one option.",              type:"single", opts:FURNISHED   },
  { key:"amenities",      title:"What amenities are you looking for?",     sub:"Select all that apply.",          type:"multi",  opts:AMENITIES   },
  { key:"flatmateGender", title:"Preferred flatmate gender?",              sub:"Choose one option.",              type:"single", opts:GENDER      },
  { key:"ageGroup",       title:"Preferred flatmate age group?",           sub:"Choose one option.",              type:"single", opts:AGE         },
  { key:"occupationType", title:"Preferred flatmate occupation?",          sub:"Choose one option.",              type:"single", opts:OCCUPATION  },
  { key:"habits",         title:"What habits do you prefer?",              sub:"Select all that apply.",          type:"multi",  opts:HABITS      },
  { key:"qualities",      title:"What qualities matter most?",             sub:"Select all that apply.",          type:"multi",  opts:QUALITIES   },
  { key:"lifestyle",      title:"What are your lifestyle preferences?",    sub:"Helps us match you better.",      type:"multi",  opts:LIFESTYLE   },
];

const DESKTOP_GROUPS = [
  [0, 1], [2, 3], [4, 5], [6], [7, 8], [9, 10], [11, 12],
];

/* ── SingleChips ── */
function SingleChips({ options, value, onSelect }) {
  return (
    <div className="room-grid">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          className={`room-card ${value === o ? "active" : ""}`}
          onClick={() => onSelect(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ── MultiChips ── */
function MultiChips({ options, values = [], onToggle }) {
  return (
    <div className="room-grid">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          className={`room-card ${values.includes(o) ? "active" : ""}`}
          onClick={() => onToggle(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ── RangeSlider ── */
function RangeSlider({ q, value, onChange }) {
  const min     = q.min  || 1000;
  const max     = q.max  || 100000;
  const step    = q.step || 500;
  const current = Number(value) || min;
  const pct     = ((current - min) / (max - min)) * 100;

  return (
    <div className="range-wrapper">
      <div className="range-value-display">
        ₹{current.toLocaleString("en-IN")}
      </div>

      <div className="range-track-wrapper">
        <input
          type="range"
          className="range-slider"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={(e) => onChange(e.target.value)}
          style={{ "--pct": `${pct}%` }}
        />
      </div>

      <div className="range-labels">
        <span>₹{min.toLocaleString("en-IN")}</span>
        <span>₹{max.toLocaleString("en-IN")}</span>
      </div>

      <div className="range-quick-btns">
        {[
          { label: "₹5K",   val: 5000   },
          { label: "₹10K",  val: 10000  },
          { label: "₹20K",  val: 20000  },
          { label: "₹50K",  val: 50000  },
        ]
          .filter((b) => b.val >= min && b.val <= max)
          .map((b) => (
            <button
              type="button"
              key={b.val}
              className={`quick-btn ${current === b.val ? "active" : ""}`}
              onClick={() => onChange(b.val)}
            >
              {b.label}
            </button>
          ))}
      </div>
    </div>
  );
}

/* ── QuestionCard ── */
function QuestionCard({ q, form, set, tog }) {
  return (
    <div className="question-card">
      <h1>{q.title}</h1>
      {q.sub && <p>{q.sub}</p>}

      {q.type === "date" && (
        <input
          type="date"
          className="input-field"
          value={form[q.key] || ""}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => set(q.key, e.target.value)}
        />
      )}

      {q.type === "number" && (
        <RangeSlider
          q={q}
          value={form[q.key]}
          onChange={(val) => set(q.key, val)}
        />
      )}

      {q.type === "single" && (
        <SingleChips
          options={q.opts}
          value={form[q.key]}
          onSelect={(v) => set(q.key, v)}
        />
      )}

      {q.type === "multi" && (
        <MultiChips
          options={q.opts}
          values={form[q.key] || []}
          onToggle={(v) => tog(q.key, v)}
        />
      )}
    </div>
  );
}

/* ── Main component ── */
export default function BasicInfo({ onComplete }) {
  const [step, setStep]                 = useState(1);
  const [showSections, setShowSections] = useState(false);
  const [isDesktop, setIsDesktop]       = useState(window.innerWidth >= 1024);
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState("");
  const [form, setForm]                 = useState({
    moveInDate:"", minBudget:1000, maxBudget:1000,
    roomType:"", occupancy:"", furnished:"",
    amenities:[], flatmateGender:"", ageGroup:"",
    occupationType:"", habits:[], qualities:[], lifestyle:[],
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
    ? DESKTOP_GROUPS[step - 1].map((i) => ALL_QUESTIONS[i])
    : [ALL_QUESTIONS[step - 1]];

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const tog = (key, item) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(item)
        ? f[key].filter((v) => v !== item)
        : [...f[key], item],
    }));

  const saveToFirebase = async () => {
    setSaving(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in. Please log in and try again.");

      await addDoc(
        collection(db, "users", user.uid, "userData"),
        {
          ...form,
          minBudget: form.minBudget ? Number(form.minBudget) : null,
          maxBudget: form.maxBudget ? Number(form.maxBudget) : null,
          uid:       user.uid,
          email:     user.email,
          createdAt: serverTimestamp(),
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
    else window.history.back();
  };

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
              <h3>Sections</h3>
              <button className="close-btn" onClick={() => setShowSections(false)}>✕</button>
            </div>
            {["Your basic info","Your hobbies","Flat requirements","Flatmate preferences","Upload images"].map((label, i) => (
              <div key={i} className={`section-item ${i === 0 ? "active" : ""}`}>
                <span>{i + 1}. {label}</span>
                {i === 0 && <span className="active-arrow">›</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <span className="section-title">Section 1 of 5 — your basic info</span>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {currentQuestions.map((q) => (
        <QuestionCard key={q.key} q={q} form={form} set={set} tog={tog} />
      ))}

      {error && <p className="save-error">{error}</p>}

      <div className="button-wrapper">
        <button className="back-btn" onClick={goBack} disabled={step === 1 || saving}>
          ← Back
        </button>
        <button className="next-btn" onClick={goNext} disabled={saving}>
          {saving ? "Saving..." : step === TOTAL ? "Finish ✓" : "Next →"}
        </button>
        
      </div>
      
    </div>
    
  );
}