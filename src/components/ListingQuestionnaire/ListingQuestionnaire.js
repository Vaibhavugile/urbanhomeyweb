import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection, getDocs, query, orderBy, limit,
  doc, updateDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./ListingQuestionnaire.css";

/* ─── Field definitions (type + options) ─────────── */
const FIELD_META = {
  /* flatmate basic info */
  moveInDate:      { type: "date" },
  minBudget:       { type: "number", placeholder: "e.g. 5000" },
  maxBudget:       { type: "number", placeholder: "e.g. 15000" },
  roomType:        { type: "select", options: ["1 BHK","2 BHK","3 BHK","Studio","PG","Any"] },
  occupancy:       { type: "select", options: ["Single","Double","Triple","Any"] },
  furnished:       { type: "select", options: ["Fully Furnished","Semi-Furnished","Unfurnished","Any"] },
  amenities:       { type: "chips",  options: ["WiFi","AC","Parking","Gym","Lift","CCTV","Gas Pipeline","Power Backup","Washing Machine","Geyser"] },
  flatmateGender:  { type: "select", options: ["Male","Female","Any"] },
  ageGroup:        { type: "select", options: ["18-25","25-35","35-45","45+","Any"] },
  occupationType:  { type: "chips",  options: ["Student","Working Professional","Business","Any"] },
  habits:          { type: "chips",  options: ["Non-Smoker","Non-Drinker","Vegetarian","Early Riser","Night Owl","Pet Friendly","Fitness Enthusiast"] },
  qualities:       { type: "chips",  options: ["Clean","Quiet","Social","Respectful","Responsible","Cooperative","Friendly"] },
  lifestyle:       { type: "chips",  options: ["Work from Home","Party Lover","Homebody","Traveller","Minimalist"] },
  /* room listing */
  availableFor:    { type: "chips",  options: ["Male","Female","Any","Students","Working Professionals"] },
  availableFrom:   { type: "date" },
  rent:            { type: "number", placeholder: "Monthly rent ₹" },
  deposit:         { type: "number", placeholder: "Security deposit ₹" },
  bathroom:        { type: "select", options: ["Attached","Common"] },
  address:         { type: "textarea" },
  landmark:        { type: "text",   placeholder: "Nearby landmark" },
  description:     { type: "textarea" },
  genderPref:      { type: "select", options: ["Male","Female","Any"] },
  agePref:         { type: "select", options: ["18-25","25-35","35-45","45+","Any"] },
  occupationPref:  { type: "chips",  options: ["Student","Working Professional","Business","Any"] },
  dealBreakers:    { type: "chips",  options: ["Smoking","Drinking","Pets","Loud Music","Late Night Guests","Messy Habits"] },
};

/* ─── Label maps ─────────────────────────────────── */
const BASIC_INFO_LABELS = {
  moveInDate:"Move-in date", minBudget:"Min budget", maxBudget:"Max budget",
  roomType:"Flat type", occupancy:"Occupancy", furnished:"Furnished",
  amenities:"Amenities", flatmateGender:"Gender", ageGroup:"Age group",
  occupationType:"Occupation", habits:"Habits", qualities:"Qualities", lifestyle:"Lifestyle",
};

const ROOM_LISTING_LABELS = {
  roomType:"Flat type", occupancy:"Occupancy", furnished:"Furnished",
  availableFor:"Available for", availableFrom:"Available from",
  rent:"Monthly rent", deposit:"Security deposit", bathroom:"Bathroom",
  amenities:"Amenities", address:"Address", landmark:"Landmark",
  description:"Description", genderPref:"Gender", agePref:"Age group",
  occupationPref:"Occupation", habits:"Habits", qualities:"Qualities", dealBreakers:"Deal breakers",
};

const FULL_WIDTH_KEYS = new Set([
  "amenities","habits","qualities","lifestyle","dealBreakers",
  "address","description","landmark","occupationType","occupationPref","availableFor",
]);

const chipColor = (key) => {
  if (["amenities","availableFor"].includes(key)) return "green";
  if (["habits","qualities","dealBreakers"].includes(key)) return "purple";
  return "amber";
};

const formatCurrency = (val) =>
  val != null ? `₹${Number(val).toLocaleString("en-IN")}` : "—";

function buildRows(data, labelMap) {
  return Object.entries(labelMap)
    .filter(([key]) => data[key] != null && data[key] !== "")
    .map(([key, question]) => {
      let answer = data[key];
      let isChips = false;
      if (Array.isArray(answer)) {
        if (answer.length === 0) return null;
        isChips = true;
      } else if (["minBudget","maxBudget","rent","deposit"].includes(key)) {
        answer = formatCurrency(answer);
      }
      return { key, question, answer, isChips, color: chipColor(key), full: FULL_WIDTH_KEYS.has(key) || isChips };
    })
    .filter(Boolean);
}

const BASIC_INFO_SECTIONS = [
  { label:"Flat requirements",    keys:["moveInDate","minBudget","maxBudget","roomType","occupancy","furnished","amenities"] },
  { label:"Flatmate preferences", keys:["flatmateGender","ageGroup","occupationType","habits","qualities","lifestyle"] },
];
const ROOM_LISTING_SECTIONS = [
  { label:"Room details",         keys:["roomType","occupancy","furnished","availableFor","availableFrom","rent","deposit","bathroom","amenities"] },
  { label:"Location",             keys:["address","landmark"] },
  { label:"About the flat",       keys:["description"] },
  { label:"Flatmate preferences", keys:["genderPref","agePref","occupationPref","habits","qualities","dealBreakers"] },
];

/* ─── Inline field editor ────────────────────────── */
function FieldEditor({ fieldKey, value, onSave, onCancel }) {
  const meta = FIELD_META[fieldKey] || { type: "text" };
  const [draft, setDraft] = useState(
    Array.isArray(value) ? [...value] : (value ?? "")
  );

  const toggleChip = (chip) =>
    setDraft((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );

  return (
    <div className="lq-editor">
      {meta.type === "select" && (
        <div className="lq-select-wrapper">
          <select
            className="lq-input lq-select"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          >
            {meta.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <span className="lq-select-chevron" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      )}

      {(meta.type === "text" || meta.type === "number" || meta.type === "date") && (
        <input
          className="lq-input"
          type={meta.type}
          value={draft}
          placeholder={meta.placeholder || ""}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
      )}

      {meta.type === "textarea" && (
        <textarea
          className="lq-input lq-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          autoFocus
        />
      )}

      {meta.type === "chips" && (
        <div className="lq-chip-picker">
          {meta.options.map((o) => (
            <button
              key={o}
              type="button"
              className={`lq-chip-opt${draft.includes(o) ? " selected" : ""}`}
              onClick={() => toggleChip(o)}
            >
              {o}
            </button>
          ))}
        </div>
      )}

      <div className="lq-editor-actions">
        <button className="lq-btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="lq-btn-save" onClick={() => onSave(draft)}>Save</button>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────── */
export default function ListingQuestionnaire() {
  const navigate = useNavigate();
  const { type } = useParams();

  const isFlat        = type === "flat-listing";
  const title         = isFlat ? "Flat listing" : "Flatmate listing";
  const heroTitle     = isFlat ? "Your room details" : "Your flatmate preferences";
  const subcollection = isFlat ? "roomListings" : "userData";
  const labelMap      = isFlat ? ROOM_LISTING_LABELS : BASIC_INFO_LABELS;
  const sections      = isFlat ? ROOM_LISTING_SECTIONS : BASIC_INFO_SECTIONS;

  const [rawData,        setRawData]        = useState({});
  const [rowMap,         setRowMap]         = useState({});
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState("");
  const [editMode,       setEditMode]       = useState(false);
  const [editingKey,     setEditingKey]     = useState(null);
  const [saving,         setSaving]         = useState(false);
  const [savedKey,       setSavedKey]       = useState(null);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [deleting,       setDeleting]       = useState(false);
  const docIdRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError("");
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Please log in to view your listing.");
        const ref  = collection(db, "users", user.uid, subcollection);
        const snap = await getDocs(query(ref, orderBy("createdAt", "desc"), limit(1)));
        if (!snap.empty) {
          const data = snap.docs[0].data();
          docIdRef.current = snap.docs[0].id;
          setRawData(data);
          const rows = buildRows(data, labelMap);
          const map  = {};
          rows.forEach((r) => { map[r.key] = r; });
          setRowMap(map);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load your answers.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subcollection, labelMap]);

  const handleSave = async (fieldKey, newValue) => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid, subcollection, docIdRef.current);
      await updateDoc(docRef, { [fieldKey]: newValue, updatedAt: serverTimestamp() });

      const updated = { ...rawData, [fieldKey]: newValue };
      setRawData(updated);
      const rows = buildRows(updated, labelMap);
      const map  = {};
      rows.forEach((r) => { map[r.key] = r; });
      setRowMap(map);

      setEditingKey(null);
      setSavedKey(fieldKey);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid, subcollection, docIdRef.current);
      await deleteDoc(docRef);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Please try again.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const hasData = Object.keys(rowMap).length > 0;

  return (
    <div className="lq-page">

      {/* Top bar */}
      <div className="lq-topbar">
        <button
          className="lq-back-btn"
          onClick={() => {
            if (editMode) { setEditMode(false); setEditingKey(null); }
            else navigate(-1);
          }}
          aria-label="Go back"
        >
          &#8592;
        </button>
        <span className="lq-title">{title}</span>
        <div className="lq-topbar-actions">
          {hasData && (
            <button
              className="lq-delete-btn"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete listing"
            >
              🗑
            </button>
          )}
          <button
            className={`lq-edit-btn${editMode ? " lq-edit-btn--active" : ""}`}
            onClick={() => { setEditMode((p) => !p); setEditingKey(null); }}
          >
            {editMode ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div
          className="lq-modal-backdrop"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="lq-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lq-modal-icon">🗑️</div>
            <h3 className="lq-modal-title">Delete listing?</h3>
            <p className="lq-modal-body">
              This will permanently remove your {title.toLowerCase()}. You can always create a new one.
            </p>
            <div className="lq-modal-actions">
              <button
                className="lq-modal-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="lq-modal-confirm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit mode banner */}
      {editMode && (
        <div className="lq-edit-banner">
          ✏️ Tap any field below to edit it
        </div>
      )}

      {loading && <p className="lq-state-msg">Loading your answers…</p>}
      {!loading && error && <p className="lq-state-msg lq-error">{error}</p>}

      {!loading && !error && !hasData && (
        <div className="lq-empty">
          <div className="lq-empty-icon">📋</div>
          <p>No answers saved yet.</p>
          <button
            className="lq-fill-btn"
            onClick={() => navigate(isFlat ? "/list-room" : "/find-flatmate")}
          >
            Fill in your answers →
          </button>
        </div>
      )}

      {!loading && !error && hasData && (
        <>
          <div className="lq-hero">
            <div className="lq-avatar">{isFlat ? "🏠" : "🤝"}</div>
            <div className="lq-hero-text">
              <h2>{heroTitle}</h2>
              <p>Last updated · {new Date().toLocaleDateString("en-IN", { month:"long", year:"numeric" })}</p>
              <span className="lq-badge">
                <span className="lq-badge-dot" />
                Active listing
              </span>
            </div>
          </div>

          {sections.map((sec) => {
            const items = sec.keys.map((k) => rowMap[k]).filter(Boolean);
            if (items.length === 0) return null;
            return (
              <React.Fragment key={sec.label}>
                <div className="lq-divider" />
                <p className="lq-section-head">{sec.label}</p>
                <div className="lq-cards">
                  {items.map((item) => (
                    <div
                      key={item.key}
                      className={[
                        "lq-card",
                        item.full ? "lq-card--full" : "",
                        editMode ? "lq-card--editable" : "",
                        editingKey === item.key ? "lq-card--editing" : "",
                        savedKey === item.key ? "lq-card--saved" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => {
                        if (editMode && editingKey !== item.key) {
                          setEditingKey(item.key);
                        }
                      }}
                    >
                      <div className="lq-card-header">
                        <p className="lq-card-q">{item.question}</p>
                        {editMode && editingKey !== item.key && (
                          <span className="lq-edit-pencil">✏️</span>
                        )}
                        {savedKey === item.key && (
                          <span className="lq-saved-tick">✓ Saved</span>
                        )}
                      </div>

                      {/* Show editor OR value */}
                      {editingKey === item.key ? (
                        <FieldEditor
                          fieldKey={item.key}
                          value={rawData[item.key]}
                          onSave={(val) => handleSave(item.key, val)}
                          onCancel={() => setEditingKey(null)}
                        />
                      ) : item.isChips ? (
                        <div className="lq-chips">
                          {item.answer.map((chip, i) => (
                            <span key={i} className={`lq-chip chip-${item.color}`}>{chip}</span>
                          ))}
                        </div>
                      ) : (
                        <p className="lq-card-a">{item.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </>
      )}

      {saving && (
        <div className="lq-saving-overlay">Saving…</div>
      )}
    </div>
  );
}
