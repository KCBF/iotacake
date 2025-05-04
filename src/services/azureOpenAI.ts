import { toast } from "@/hooks/use-toast";

interface ChatMessage {
  user: boolean;
  text: string;
  translation?: string;
}

export const sendMessageToAzureOpenAI = async (
  messages: ChatMessage[],
  language: string
): Promise<ChatMessage | null> => {
  // Get Azure API key and endpoint from environment variables
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please add your Azure OpenAI API key in Settings",
      variant: "destructive"
    });
    return null;
  }

  try {
    // Format the conversation history for the API
    const formattedMessages = messages.map(msg => ({
      role: msg.user ? "user" : "assistant",
      content: msg.text
    }));

    // Add system message for context
    const systemMessage = {
      role: "system",
      content: `You are a language tutor for ${language}. Provide helpful, educational responses. Include the translation in ${language} when teaching vocabulary or phrases.`
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        messages: [systemMessage, ...formattedMessages],
        max_tokens: 800,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Azure OpenAI API error:", errorData || response.statusText);
      toast({
        title: "Error",
        description: `Failed to get response: ${response.status}`,
        variant: "destructive"
      });
      return null;
    }

    const data = await response.json();
    
    // Extract the assistant's response
    const assistantResponse = data.choices[0].message.content;
    
    // Create simple translation extraction (in a real app, this would be more sophisticated)
    let translation: string | undefined = undefined;
    
    if (assistantResponse.includes('Translation:')) {
      const parts = assistantResponse.split('Translation:');
      translation = parts[1]?.trim();
    }
    
    return {
      user: false,
      text: assistantResponse,
      translation
    };
  } catch (error) {
    console.error("Error calling Azure OpenAI API:", error);
    toast({
      title: "API Error",
      description: "Failed to communicate with Azure OpenAI",
      variant: "destructive"
    });
    return null;
  }
};
