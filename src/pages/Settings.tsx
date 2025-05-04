import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AppLayout from "@/components/AppLayout";
import { useRole } from "@/context/RoleContext";
import CustomButton from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const settingsFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  bio: z.string().optional(),
  interfaceLanguage: z.string(),
  enableNotifications: z.boolean(),
  dailyGoal: z.string().optional(),
  useSystemApiKey: z.boolean().default(true),
  azureOpenaiApiKey: z.string().optional(),
  azureEndpoint: z.string().optional(),
  walletAddress: z.string().optional(),
  royaltyPercentage: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const Settings: React.FC = () => {
  const { role } = useRole();
  const { toast } = useToast();
  const [useSystemKeys, setUseSystemKeys] = useState(true);
  
  // Initialize form with default values
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      username: role === "learner" ? "VocakeLearner" : "LinguaLuna",
      email: "user@example.com",
      bio: role === "contributor" 
        ? "Language educator with 5+ years of experience teaching Spanish and English." 
        : "Language enthusiast learning Spanish and Japanese.",
      interfaceLanguage: "english",
      enableNotifications: true,
      dailyGoal: "30",
      useSystemApiKey: true,
      azureOpenaiApiKey: import.meta.env.VITE_AZURE_OPENAI_API_KEY || "",
      azureEndpoint: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || "",
      walletAddress: "0x1234...5678",
      royaltyPercentage: "10",
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    console.log("Settings values:", values);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <AppLayout>
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Profile</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Preferences</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="interfaceLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interface Language</FormLabel>
                      <FormControl>
                        <select
                          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"
                          {...field}
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="japanese">Japanese</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Notifications</FormLabel>
                        <FormDescription>
                          Receive notifications about your learning progress
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {role === "learner" && (
                  <FormField
                    control={form.control}
                    name="dailyGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Learning Goal (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" min="5" max="240" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">AI Configuration</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="useSystemApiKey"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Use System API Keys</FormLabel>
                        <FormDescription>
                          Use the system's Azure OpenAI configuration (recommended)
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setUseSystemKeys(checked);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className={useSystemKeys ? "opacity-50" : ""} />
                
                <div className={useSystemKeys ? "opacity-50 pointer-events-none" : ""}>
                  <p className="text-sm text-gray-500 mb-3">
                    Custom Azure OpenAI configuration (only if not using system keys)
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="azureOpenaiApiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Azure OpenAI API Key</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="Enter your AZURE_OPENAI_API key" 
                            {...field} 
                            disabled={useSystemKeys}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="azureEndpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Azure OpenAI Endpoint</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your Azure OpenAI endpoint" 
                            {...field} 
                            disabled={useSystemKeys}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {role === "contributor" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Creator Settings</h2>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payout Wallet Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="royaltyPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Royalty Percentage</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <CustomButton type="submit">Save Changes</CustomButton>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
};

export default Settings;
