// frontend/src/components/AIModal.jsx
import React, { useState } from "react";
import { X, Book, Brain, HelpCircle, ArrowLeft } from "lucide-react";
import {
  summarizeContent,
  generateStudyPlan,
  explainTopic,
} from "../api/aiApi";

const AIModal = ({ isOpen, onClose, userInterests }) => {
  const [activeTab, setActiveTab] = useState("summarize");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(7); // Default 7 days for study plan

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");
    try {
      if (activeTab === "summarize") {
        const summary = await summarizeContent(input);
        setOutput(summary);
      } else if (activeTab === "studyPlan") {
        const plan = await generateStudyPlan(userInterests, duration);
        setOutput(plan);
      } else if (activeTab === "explain") {
        const explanation = await explainTopic(input);
        setOutput(explanation);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col z-50">
      <div className="bg-white rounded-t-lg shadow-lg p-6 flex-1 flex flex-col h-full w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-wrap space-x-2 sm:space-x-4 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("summarize")}
            className={`flex items-center px-3 py-2 rounded-t-md ${
              activeTab === "summarize"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
          >
            <Book className="h-5 w-5 mr-2" />
            Summarize
          </button>
          <button
            onClick={() => setActiveTab("studyPlan")}
            className={`flex items-center px-3 py-2 rounded-t-md ${
              activeTab === "studyPlan"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
          >
            <Brain className="h-5 w-5 mr-2" />
            Study Plan
          </button>
          <button
            onClick={() => setActiveTab("explain")}
            className={`flex items-center px-3 py-2 rounded-t-md ${
              activeTab === "explain"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Explain
          </button>
        </div>
        <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
          {activeTab === "summarize" && (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste content to summarize..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 flex-1 resize-none"
            />
          )}
          {activeTab === "studyPlan" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration (days)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, e.target.value))}
                className="w-full sm:w-32 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                min="1"
              />
              <p className="text-sm text-gray-600">
                Based on your interests: {userInterests.join(", ")}
              </p>
            </div>
          )}
          {activeTab === "explain" && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic to explain..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          {output && (
            <div className="p-4 bg-gray-50 rounded-md flex-1 overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Response
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {output}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 mt-4 rounded-md text-white text-lg font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } transition-colors`}
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AIModal;
