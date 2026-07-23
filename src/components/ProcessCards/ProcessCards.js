import React from "react";
import "./ProcessCards.css";

import {
  UserPlus,
  SlidersHorizontal,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserPlus size={45} />,
    title: "Create Profile",
    description:
      "Create a detailed profile that shows who you really are and what you're looking for.",
  },
  {
    id: 2,
    icon: <SlidersHorizontal size={45} />,
    title: "Set Preferences",
    description:
      "Set your filters for budget, location, and daily habits to narrow down the best candidates.",
  },
  {
    id: 3,
    icon: <BarChart3 size={45} />,
    title: "Get Matches",
    description:
      "See compatibility scores powered by our smart algorithm to find high-harmony flatmates.",
  },
  {
    id: 4,
    icon: <MessageSquare size={45} />,
    title: "Chat & Move In",
    description:
      "Connect safely within our platform and secure your perfect living situation with ease.",
  },
];

const ProcessCards = () => {
  return (
    <section className="process-section">
      <div className="process-container">
        {steps.map((step) => (
          <div className="process-card" key={step.id}>
            <div className="step-number">{step.id}</div>

            <div className="step-icon">{step.icon}</div>

            <h2>{step.title}</h2>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessCards;