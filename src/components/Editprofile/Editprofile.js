import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Editprofile.css";

const GENDER_OPTIONS     = ["Male", "Female", "Non-binary", "Prefer not to say"];
const PROFESSION_OPTIONS = ["Student", "Working Professional", "Freelancer", "Business Owner", "Other"];

function getInitials(name = "") {
    return name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("") || "?";
}

export default function EditProfile() {
    const navigate = useNavigate();
    const [saving,  setSaving]  = useState(false);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        fullName:   "",
        age:        "",
        gender:     "",
        profession: "",
        city:       "",
        phone:      "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = auth.currentUser;
                if (!user) { navigate("/login"); return; }
                const snap = await getDoc(doc(db, "users", user.uid));
                if (snap.exists()) {
                    const d = snap.data();
                    setForm({
                        fullName:   d.fullName   || "",
                        age:        d.age        || "",
                        gender:     d.gender     || "",
                        profession: d.profession || "",
                        city:       d.city       || "",
                        phone:      d.phone      || "",
                    });
                }
            } catch {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const handleSave = async () => {
        setSaving(true);
        setError("");
        setSuccess(false);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Please login first.");

            if (!form.fullName.trim())
                throw new Error("Full name is required.");
            if (!form.age)
                throw new Error("Please enter your age.");
            if (Number(form.age) < 18 || Number(form.age) > 99)
                throw new Error("Age must be between 18 and 99.");

            const phone = form.phone.trim();
            if (!phone)
                throw new Error("Mobile number is required.");
            if (!/^[6-9]\d{9}$/.test(phone))
                throw new Error("Please enter a valid 10-digit mobile number.");

            if (!form.city.trim())
                throw new Error("City is required.");
            if (!form.gender)
                throw new Error("Please select your gender.");
            if (!form.profession)
                throw new Error("Please select your profession.");

            await updateDoc(doc(db, "users", user.uid), {
                fullName:   form.fullName.trim(),
                age:        Number(form.age),
                gender:     form.gender,
                profession: form.profession,
                city:       form.city.trim(),
                phone,
                updatedAt:  new Date(),
            });

            setSuccess(true);
            setTimeout(() => navigate("/profile"), 1200);
        } catch (err) {
            setError(err.message || "Failed to save profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="ep-state">Loading…</div>;

    return (
        <div className="ep-page">

            {/* ── Top bar ── */}
            <div className="ep-topbar">
                <button className="ep-back" onClick={() => navigate(-1)}>&#8592;</button>
                <span className="ep-title">Edit profile</span>
                <button className="ep-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving…" : "Save"}
                </button>
            </div>

            <div className="ep-body">

                {/* ── Avatar ── */}
                <div className="ep-avatar-wrap">
                    <div className="ep-avatar">{getInitials(form.fullName)}</div>
                    <span className="ep-avatar-hint">Tap to change photo</span>
                </div>

                {/* ── Basic info card ── */}
                <div className="ep-card">
                    <div className="ep-card-header">
                        <div className="ep-card-icon icon-purple">&#9881;</div>
                        <span className="ep-card-title title-purple">Basic info</span>
                    </div>

                    <div className="ep-field">
                        <label className="ep-label">Full name</label>
                        <input
                            className="ep-input"
                            type="text"
                            value={form.fullName}
                            onChange={(e) => set("fullName", e.target.value)}
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="ep-row">
                        <div className="ep-field">
                            <label className="ep-label">Age</label>
                            <input
                                className="ep-input"
                                type="number"
                                min="18"
                                max="99"
                                value={form.age}
                                onChange={(e) => set("age", e.target.value)}
                                placeholder="e.g. 25"
                            />
                        </div>
                        <div className="ep-field">
                            <label className="ep-label">Phone</label>
                            <input
                                className="ep-input"
                                type="tel"
                                maxLength={10}
                                value={form.phone}
                                onChange={(e) =>
                                    set("phone", e.target.value.replace(/\D/g, ""))
                                }
                                placeholder="9876543210"
                            />
                        </div>
                    </div>

                    <div className="ep-field">
                        <label className="ep-label">City</label>
                        <input
                            className="ep-input"
                            type="text"
                            value={form.city}
                            onChange={(e) => set("city", e.target.value)}
                            placeholder="e.g. Mumbai"
                        />
                    </div>
                </div>

                {/* ── About you card ── */}
                <div className="ep-card">
                    <div className="ep-card-header">
                        <div className="ep-card-icon icon-teal">&#9733;</div>
                        <span className="ep-card-title title-teal">About you</span>
                    </div>

                    <div className="ep-field">
                        <label className="ep-label">Gender</label>
                        <div className="ep-chips">
                            {GENDER_OPTIONS.map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    className={`ep-chip chip-purple ${form.gender === g ? "active" : ""}`}
                                    onClick={() => set("gender", g)}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="ep-field">
                        <label className="ep-label">Profession</label>
                        <div className="ep-chips">
                            {PROFESSION_OPTIONS.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    className={`ep-chip chip-teal ${form.profession === p ? "active" : ""}`}
                                    onClick={() => set("profession", p)}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {error   && <p className="ep-error">{error}</p>}
                {success && <p className="ep-success">Profile saved!</p>}

            </div>
        </div>
    );
}
