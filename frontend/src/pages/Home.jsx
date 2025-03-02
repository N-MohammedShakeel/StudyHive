// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, MessageCircle, Brain } from "lucide-react";
import Navbar from "../components/Common/Navbar"; // Adjust path based on structure

const features = [
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Study Groups",
    description: "Join or create study groups to collaborate with peers",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-indigo-600" />,
    title: "Real-time Chat",
    description: "Communicate instantly with group members",
  },
  {
    icon: <Brain className="h-8 w-8 text-indigo-600" />,
    title: "AI Assistant",
    description: "Get instant help with your study questions",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
    title: "Resource Sharing",
    description: "Share and access study materials easily",
  },
];

const Home = () => {
  return (
    <div className="space-y-16">
      <Navbar />
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-indigo-600">StudyHive</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your collaborative learning platform where knowledge meets community.
          Join study groups, share resources, and learn together.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>
      <section id="features" className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need to excel in your studies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-indigo-50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to start learning together?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of students already using StudyHive to achieve their
          academic goals.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-block"
        >
          Join StudyHive Today
        </Link>
      </section>
    </div>
  );
};

export default Home;
