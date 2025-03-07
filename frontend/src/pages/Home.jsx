import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, MessageCircle, Brain } from "lucide-react";
import Navbar from "../components/Common/Navbar";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Users className="h-10 w-10 text-indigo-600" />,
    title: "Study Groups",
    description: "Join or create study groups to collaborate with peers.",
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-indigo-600" />,
    title: "Real-time Chat",
    description: "Communicate instantly with group members.",
  },
  {
    icon: <Brain className="h-10 w-10 text-indigo-600" />,
    title: "AI Assistant",
    description: "Get instant help with your study questions.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-indigo-600" />,
    title: "Resource Sharing",
    description: "Share and access study materials easily.",
  },
];

const testimonials = [
  {
    name: "Emily R.",
    quote:
      "StudyHive transformed the way I study. The AI assistant is a game changer!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James L.",
    quote:
      "I love the study groups! Connecting with like-minded learners has been amazing.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const Home = () => {
  return (
    <div className="space-y-16">
      <Navbar />

      <section className="relative flex items-center justify-center h-screen text-center">
        {/* <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/shUvFLB8mUVIkPeG/scene.splinecode" />
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-8 md:left-18 max-w-2xl mx-auto text-left px-6 lg:px-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">StudyHive</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your collaborative learning platform where knowledge meets
            community. Join study groups, share resources, and learn together.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 text-white bg-blue-600 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center"
            >
              Get Started <span className="ml-2">→</span>
            </Link>
            <Link
              to="/#feature"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-full text-lg font-semibold shadow-md hover:bg-blue-50 transition-transform transform hover:scale-105 flex items-center"
            >
              Learn more <span className="ml-2">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="features" className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need to excel in your studies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Students Are Saying
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="italic text-gray-700">"{testimonial.quote}"</p>
              <h3 className="mt-4 font-semibold text-gray-900">
                - {testimonial.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-100 to-white rounded-xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to start learning together?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of students already using StudyHive to achieve their
          academic goals.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Join StudyHive Today
        </Link>
      </section>

      <footer className="text-center text-gray-500 py-6">
        &copy; {new Date().getFullYear()} StudyHive. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
