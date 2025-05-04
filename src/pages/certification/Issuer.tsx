import React, { useState } from "react";
import { useCertification, useCertificationStore, Course } from "@/context/CertificationContext";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const Issuer: React.FC = () => {
  const { issuerDID, studentDID } = useCertification();
  const { courses, credentials, addCredential, networkMode } = useCertificationStore();
  const { toast } = useToast();
  
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [studentId, setStudentId] = useState<string>(studentDID);
  const [isLoading, setIsLoading] = useState(false);

  const selectedCourseDetails = courses.find(c => c.courseCode === selectedCourse);

  const handleIssueCredential = async () => {
    if (!selectedCourse || !studentId) {
      toast({
        title: "Missing Information",
        description: "Please select a course and enter a student ID",
        variant: "destructive",
      });
      return;
    }
    
    const course = courses.find(c => c.courseCode === selectedCourse);
    if (!course) return;
    
    setIsLoading(true);
    
    try {
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCredential = {
        id: `${networkMode === 'testnet' ? 'tst' : 'iot'}-${Math.random().toString(36).substring(2, 10)}`,
        courseCode: course.courseCode,
        title: course.title,
        skillTag: course.skillTag,
        date: new Date().toISOString(),
        studentDID: studentId,
        issuerDID: issuerDID,
      };
      
      addCredential(newCredential);
      
      toast({
        title: "Credential Issued",
        description: `Successfully issued credential for ${course.title}`,
      });
      
      // Reset form
      setSelectedCourse("");
      setStudentId(studentDID);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue credential",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Issue New Credential</CardTitle>
          <CardDescription>
            Select a course and enter student information to issue a new credential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Course</label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.courseCode} value={course.courseCode}>
                    {course.title} ({course.courseCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Student DID</label>
            <Input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter student DID"
            />
          </div>

          {selectedCourseDetails && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Details</label>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{selectedCourseDetails.title}</p>
                <p className="text-sm text-gray-600">{selectedCourseDetails.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{selectedCourseDetails.skillTag}</Badge>
                  <Badge variant="outline">{selectedCourseDetails.credits} Credits</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleIssueCredential}
            disabled={!selectedCourse || !studentId || isLoading}
            className="w-full"
          >
            {isLoading ? "Issuing..." : "Issue Credential"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Issued Credentials</CardTitle>
          <CardDescription>
            View and manage previously issued credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          {credentials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No credentials issued yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Student DID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credentials.map((cred) => (
                  <TableRow key={cred.id}>
                    <TableCell className="font-mono text-sm">{cred.id}</TableCell>
                    <TableCell>{cred.title}</TableCell>
                    <TableCell className="font-mono text-sm">{cred.studentDID}</TableCell>
                    <TableCell>{new Date(cred.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={cred.verified ? "default" : "outline"}>
                        {cred.verified ? "Verified" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
