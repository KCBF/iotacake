
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CustomButton from "@/components/ui/custom-button";
import AppLayout from "@/components/AppLayout";

const TopicsPage: React.FC = () => {
  const { language } = useParams<{ language: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const topics = [
    { id: 1, title: "Everyday Conversation", difficulty: "Beginner" },
    { id: 2, title: "Travel & Navigation", difficulty: "Intermediate" },
    { id: 3, title: "Food & Dining", difficulty: "Beginner" },
    { id: 4, title: "Business Communication", difficulty: "Advanced" },
    { id: 5, title: "Entertainment & Culture", difficulty: "Intermediate" },
    { id: 6, title: "Health & Wellness", difficulty: "Intermediate" },
  ];

  const handleTopicSelection = (topicId: number) => {
    toast({
      title: "Topic Selected",
      description: `You've selected topic #${topicId} in ${language}`,
    });
    // Redirect to CakeBuddy page for this language instead of a non-existent topic page
    navigate(`/cakebuddy/${language}`);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Language Topics: {language}</h1>
          <p className="text-gray-700">Select a topic to start learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              onClick={() => handleTopicSelection(topic.id)}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105"
            >
              <span className={`px-3 py-1 rounded-full text-xs ${
                topic.difficulty === "Beginner" ? "bg-green-100 text-green-800" : 
                topic.difficulty === "Intermediate" ? "bg-blue-100 text-blue-800" :
                "bg-purple-100 text-purple-800"
              }`}>
                {topic.difficulty}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{topic.title}</h3>
              <p className="text-gray-600">Learn {topic.title.toLowerCase()} phrases in {language}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Live Challenges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Limited Time Event</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{language} Translation Challenge</h3>
                  <p className="mb-4">Translate 50 sentences in 10 minutes to earn bonus Coti tokens!</p>
                  <CustomButton 
                    variant="secondary"
                    onClick={() => navigate(`/cakebuddy/${language}`)} // Redirect to CakeBuddy page
                  >
                    Join Challenge
                  </CustomButton>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm">24:00:00 left</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">Daily Task</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{language} Pronunciation Contest</h3>
                  <p className="mb-4">Record your best pronunciation and get rated by native speakers.</p>
                  <CustomButton 
                    variant="secondary"
                    onClick={() => navigate(`/cakebuddy/${language}`)} // Redirect to CakeBuddy page
                  >
                    Start Recording
                  </CustomButton>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm">12:30:00 left</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Vocabulary List</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium text-gray-700 border-b">
              <div>Word</div>
              <div>Translation</div>
              <div>Level</div>
              <div>Actions</div>
            </div>
            
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 items-center border-b last:border-0">
                <div className="font-medium">{["Success", "Journey", "Experience", "Knowledge", "Wisdom"][i]}</div>
                <div className="text-gray-600">{["Thành công", "Hành trình", "Kinh nghiệm", "Kiến thức", "Trí tuệ"][i]}</div>
                <div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">Intermediate</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => toast({
                      title: "Audio Playing",
                      description: "Word pronunciation is playing"
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.072m-2.828 9.9a9 9 0 010-12.728" />
                    </svg>
                  </button>
                  <button 
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => toast({
                      title: "Word Saved",
                      description: "Word added to your personal vocabulary list"
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TopicsPage;
