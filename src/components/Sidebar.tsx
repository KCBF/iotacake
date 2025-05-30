import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  List, 
  Settings, 
  Home, 
  Image, 
  FileText 
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { role } = useRole();
  const location = useLocation();

  const learnerNavItems = [
    { 
      name: "Learn with VoCake", 
      path: "/", 
      icon: <BookOpen className="w-5 h-5" /> 
    },
    { 
      name: "Topics", 
      path: "/topics/English", 
      icon: <List className="w-5 h-5" /> 
    },
    { 
      name: "Setting", 
      path: "/settings", 
      icon: <Settings className="w-5 h-5" /> 
    }
  ];

  const contributorNavItems = [
    { 
      name: "Dashboard", 
      path: "/contributor/dashboard", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      name: "NFTs Library", 
      path: "/contributor/nft-library", 
      icon: <Image className="w-5 h-5" /> 
    },
    { 
      name: "Marketplace", 
      path: "/contributor/marketplace", 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      name: "Setting", 
      path: "/settings", 
      icon: <Settings className="w-5 h-5" /> 
    }
  ];

  const navItems = role === "learner" ? learnerNavItems : contributorNavItems;

  return (
    <div className="min-h-screen w-64 bg-white/80 backdrop-blur-sm border-r">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/f7516383-5f4c-4523-9056-d37c79fcc8be.png" 
              alt="Cake Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 ml-2">VOCAKE</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-all",
                      isActive 
                        ? "bg-orange-500 text-white" 
                        : "hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {role === "learner" && (
        <div className="p-4 mt-8">
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800">Pro Tip</h3>
            <p className="text-sm text-purple-700 mt-1">
              Practice regularly to earn more Coti tokens!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
