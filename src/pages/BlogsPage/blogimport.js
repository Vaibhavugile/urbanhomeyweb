import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase"; // UPDATE PATH if needed


const blogs = [
  {
    id: "lfolMJtPPJstIWGcdYTk",
    title:
      "Affordable Shared Accommodation in Ahmedabad: Complete Guide for Students and Working Professionals.",
    category: "Shared Living Guide",
    summary:
      "Ahmedabad has emerged as one of India's fastest-growing cities, attracting students, entrepreneurs, and professionals from across the country. Known for its affordable cost of living, thriving business environment, and growing infrastructure, the city offers excellent opportunities for those seeking rental accommodation. This guide explores the best areas to live in Ahmedabad, rental costs, flatmate selection tips, and how UrbanHomey helps renters find suitable homes and compatible roommates.",
    author: "Vikram Patel",
    authorLocation: "Ahmedabad",
    date: "May 5, 2026",
    readTime: "11 min read",
    slug:
      "affordable-shared-accommodation-in-ahmedabad-complete-guide-for-students-and-working-professionals",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "Co70Hh3aOBQj8LzkScZX",
    title:
      "Best Areas to Rent a Flat in Kolkata for Students and Working Professionals",
    category: "Rental Guide",
    summary:
      "Kolkata is quickly becoming a preferred destination for students, fresh graduates, and working professionals looking for affordable housing and excellent career opportunities. Compared to other major metropolitan cities, Kolkata offers a lower cost of living, reliable public transportation, and growing employment hubs. Whether you're relocating for education or work, choosing the right area and finding a compatible flatmate can make your experience much smoother. This guide covers the best places to rent in Kolkata, average rental expectations, and tips for finding the perfect shared accommodation through UrbanHomey.",
    author: "Rohit Sharma",
    authorLocation: "Kolkata",
    date: "June 11, 2026",
    readTime: "10 min read",
    slug:
      "best-areas-to-rent-a-flat-in-kolkata-for-students-and-working-professionals",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "LAyOOQhhcLFJnxS7ximK",
    title:
      "Shared Accommodation Guide in Chennai for Students and Working Professionals",
    category: "Shared Living Guide",
    summary:
      "Chennai is one of India’s fastest-growing metropolitan cities, known for its strong IT industry, educational institutions, and affordable cost of living compared to other metros. Thousands of students, engineers, and corporate professionals move to Chennai every year. Finding the right flat and compatible flatmate plays a major role in ensuring a comfortable lifestyle. This guide explains the best areas to live in Chennai, the benefits of shared accommodation, and how UrbanHomey helps simplify the rental journey.",
    author: "Sneha Iyer",
    authorLocation: "Chennai",
    date: "May 11, 2026",
    readTime: "11 min read",
    slug:
      "shared-accommodation-guide-in-chennai-for-students-and-working-professionals",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "HI6Wb05p87kuouCErbWw",
    title:
      "Best Areas to Live in Delhi for Students and Working Professionals",
    category: "Rental Housing Guide",
    summary:
      "Delhi, the capital of India, is one of the most dynamic cities for students, professionals, and job seekers. With top universities, government offices, corporate hubs, and a fast-growing startup ecosystem, Delhi attracts people from across the country. However, high rental costs in prime areas make shared accommodation one of the most practical options. This guide helps you understand the best areas to live in Delhi, how to choose the right flatmate, and how UrbanHomey simplifies the rental journey.",
    author: "Neha Sharma",
    authorLocation: "Delhi",
    date: "May 19, 2026",
    readTime: "11 min read",
    slug:
      "best-areas-to-live-in-delhi-for-students-and-working-professionals",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "qNeMDa5rUSxWJXbgLKtE",
    title:
      "Living in Mumbai: A Complete Guide to Flats, Flatmates, and Shared Accommodation",
    category: "City Living Guide",
    summary:
      "Mumbai is India's financial capital and one of the most exciting cities to live in. Every year, thousands of students, professionals, entrepreneurs, and job seekers move to Mumbai in search of better opportunities. However, finding affordable accommodation in a city known for high rental costs can be challenging. Shared accommodation and flatmate matching have become popular solutions for reducing expenses while enjoying a comfortable lifestyle. This guide explores the best places to live in Mumbai, tips for choosing the right flatmate, and how UrbanHomey helps simplify the accommodation search process.",
    author: "Arjun Mehta",
    authorLocation: "Mumbai, Maharashtra",
    date: "June 1, 2026",
    readTime: "12 min read",
    slug:
      "living-in-mumbai-a-complete-guide-to-flats-flatmates-and-shared-accommodation",
    image:
      "https://images.unsplash.com/photo-1504600770771-fb03a6961d33?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "a77r0AiV6aaiRl7lAhv7",
    title:
      "Best Areas to Rent a Flat in Hyderabad for Students and IT Professionals",
    category: "City Guide",
    summary:
      "Hyderabad has emerged as one of India's fastest-growing cities, attracting students, IT professionals, and entrepreneurs from across the country. With world-class infrastructure, affordable living costs, and thriving employment opportunities, the city offers an ideal environment for shared accommodation. This guide explores the best rental locations in Hyderabad and how UrbanHomey helps people find suitable flats and flatmates.",
    author: "Rahul Verma",
    authorLocation: "Hyderabad",
    date: "August 5, 2026",
    readTime: "9 min read",
    slug:
      "best-areas-to-rent-a-flat-in-hyderabad-for-students-and-it-professionals",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "iO6blEvTYs7gD5LEjAFE",
    title:
      "Why Bengaluru is the Top Choice for Students and Professionals Looking for Shared Accommodation",
    category: "City Guide",
    summary:
      "Bengaluru continues to attract thousands of students, fresh graduates, entrepreneurs, and working professionals every year. Known as India's technology capital, the city offers excellent career opportunities, vibrant neighborhoods, and modern living options. However, finding affordable accommodation in a rapidly growing city can be challenging. This guide explores the best areas to live in Bengaluru, the benefits of shared accommodation, and practical tips for finding the right flat and flatmate through UrbanHomey.",
    author: "Priya Sharma",
    authorLocation: "Bengaluru",
    date: "July 12, 2026",
    readTime: "10 min read",
    slug:
      "why-bengaluru-is-the-top-choice-for-students-and-professionals-looking-for-shared-accommodation",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "tPTztvJxkndfxgtqqvUz",
    title:
      "The Ultimate Guide to Finding Flats and Flatmates in Pune",
    category: "Accommodation",
    summary:
      "Pune has become one of India's top destinations for students, IT professionals, and working individuals seeking better career opportunities. With growing demand for rental housing, finding the right flat and compatible flatmate can be challenging. This guide explores the best areas to live in Pune, tips for choosing the right flatmate, and how UrbanHomey simplifies the entire accommodation search process.",
    author: "UrbanHomey Team",
    authorLocation: "Pune, Maharashtra",
    date: "June 18, 2026",
    readTime: "7 min read",
    slug:
      "the-ultimate-guide-to-finding-flats-and-flatmates-in-pune",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];


export const importBlogs = async () => {
  try {
    await runTransaction(db, async (transaction) => {
      for (const blog of blogs) {
        const blogRef = doc(db, "blogs", blog.id);

        transaction.set(
          blogRef,
          {
            title: blog.title,
            category: blog.category,
            summary: blog.summary,
            author: blog.author,
            authorLocation: blog.authorLocation,
            date: blog.date,
            readTime: blog.readTime,
            slug: blog.slug,
            image: blog.image,

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }
    });

    console.log("✅ ALL BLOGS IMPORTED SUCCESSFULLY");
    alert("All blogs imported successfully");
  } catch (error) {
    console.error("❌ BLOG IMPORT ERROR:", error);
    alert(error.message);
  }
};