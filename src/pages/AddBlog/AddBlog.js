// src/pages/AddBlog/AddBlog.js

import React, { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../../firebase";
import PageLayout from "../../components/PageLayout/PageLayout"
import "./AddBlog.css";

function getTodayFormatted() {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function AddBlog() {

  const [form, setForm] = useState({
    title: "",
    category: "",
    author: "",
    authorLocation: "",
    image: "",
    readTime: "",
    date: getTodayFormatted(),
    summary: "",
    content: ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {

    if (!form.title.trim()) {
      alert("Please enter a blog title");
      return;
    }

    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    setSaving(true);

    try {

      await addDoc(
        collection(db, "blogs"),
        {
          ...form,
          slug,
          createdAt: serverTimestamp()
        }
      );

      alert("Blog Saved Successfully");

      setForm({
        title: "",
        category: "",
        author: "",
        authorLocation: "",
        image: "",
        readTime: "",
        date: getTodayFormatted(),
        summary: "",
        content: ""
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving the blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageLayout>
    <div className="add-blog-wrapper">
      <div className="add-blog">

        <div className="add-blog-header">
          <h1>Write a New Blog</h1>
          <p>Share flatmate tips, stories, or guides with the UrbanHomey community.</p>
        </div>

        <div className="field-group">
          <label className="field-label">Blog Title</label>
          <input
            name="title"
            placeholder="e.g. 5 Tips for Finding the Perfect Flatmate"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Category</label>
          <input
            name="category"
            placeholder="e.g. Rental Tips, Safety, Lifestyle"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Author</label>
          <input
            name="author"
            placeholder="Author's name"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Author Location</label>
          <input
            name="authorLocation"
            placeholder="e.g. Pune, Maharashtra"
            value={form.authorLocation}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Read Time</label>
          <input
            name="readTime"
            placeholder="e.g. 5 min read"
            value={form.readTime}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Date</label>
          <input
            name="date"
            placeholder="e.g. June 17, 2026"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Image URL</label>
          <input
            name="image"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={handleChange}
          />
          {form.image && (
            <div className="image-preview">
              <img
                src={form.image}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>

        <div className="field-group">
          <label className="field-label">Summary</label>
          <textarea
            name="summary"
            placeholder="A short summary shown on blog cards"
            value={form.summary}
            onChange={handleChange}
          />
        </div>

        <div className="field-group">
          <label className="field-label">Full Blog Content</label>
          <textarea
            name="content"
            placeholder="Write the full blog content here..."
            rows="12"
            value={form.content}
            onChange={handleChange}
          />
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="spinner" />
              Saving...
            </>
          ) : (
            "Save Blog"
          )}
        </button>

      </div>
    </div>
    </PageLayout>
  );
}

export default AddBlog;