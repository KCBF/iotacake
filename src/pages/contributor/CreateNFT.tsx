import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useIotaWallet } from '@/context/IotaWalletContext';
import { WalletConnectButton } from "@/components/WalletConnectButton";
import CustomButton from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadTime: string;
}

const CreateNFT: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected } = useIotaWallet();
  const [name, setName] = useState("100 Essential Spanish Nouns");
  const [url, setUrl] = useState("essential-spanish-nouns");
  const [description, setDescription] = useState("A collection of the 100 most common Spanish nouns at A1 level, perfect for beginners.");
  const [price, setPrice] = useState("0.1");
  const [language, setLanguage] = useState("Spanish");
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "Quiz.mp3", size: "2.4 MB", uploadTime: "2m ago" },
    { id: "2", name: "Quiz.pdf", size: "1.1 MB", uploadTime: "2m ago" }
  ]);

  const handlePublish = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to publish your NFT",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Simulate NFT minting process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "NFT Collection Published",
        description: `Your collection "${name}" has been published successfully.`
      });
      navigate("/contributor/nft-library");
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "There was an error publishing your NFT collection.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // In a real app, we would upload the files to a server
    // This is just a placeholder for the UI demonstration
    toast({
      title: "File Upload",
      description: "File upload simulation. In a real app, this would upload your files."
    });
  };

  return (
    <AppLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Create NFT Collection</h1>
          <p className="text-gray-600 mt-2">Create and publish your language learning content as NFTs</p>
        </div>

        {!isConnected ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              You need to connect your wallet to create and publish NFT collections
            </p>
            <div className="flex justify-center">
              <WalletConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Collection Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      NFT Collection Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="url">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      id="url"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                        Price (Coti)
                      </label>
                      <input
                        type="text"
                        id="price"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="language">
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Korean">Korean</option>
                        <option value="Italian">Italian</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* File Upload Area */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Upload Files</h2>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:bg-gray-50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    multiple 
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Drag and Drop or Browse</p>
                    <p className="text-sm text-gray-500 mt-1">Support for PDF, MP3, MP4, PNG, JPG (Max: 50MB)</p>
                  </div>
                </div>
                
                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Uploaded Files</h3>
                    <div className="space-y-3">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center rounded bg-gray-200 text-gray-600 mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size} • {file.uploadTime}</p>
                            </div>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Sidebar - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Collection Name</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Language</p>
                    <p className="font-medium">{language}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-medium">{price} Coti</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Files</p>
                    <p className="font-medium">{uploadedFiles.length} files</p>
                  </div>
                </div>
                
                <CustomButton
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="w-full"
                >
                  {isPublishing ? "Publishing..." : "Publish Collection"}
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CreateNFT;
