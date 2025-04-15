
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, UserRound, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Visitor } from '@/types';

// Mock data - in a real app, this would come from an API
const mockVisitors: Visitor[] = [
  {
    id: "v1",
    studentId: "user1",
    studentName: "Alex Johnson",
    visitorName: "Robert Johnson",
    relationship: "Parent",
    purpose: "Monthly visit",
    entryTime: "2023-04-15T10:30:00",
    exitTime: "2023-04-15T14:30:00",
    status: "checked_out"
  },
  {
    id: "v2",
    studentId: "user1",
    studentName: "Alex Johnson",
    visitorName: "Emily Johnson",
    relationship: "Sister",
    purpose: "Bringing study materials",
    entryTime: "2023-04-10T13:15:00",
    exitTime: "2023-04-10T17:45:00",
    status: "checked_out"
  },
  {
    id: "v3",
    studentId: "user1",
    studentName: "Alex Johnson",
    visitorName: "Mark Wilson",
    relationship: "Friend",
    purpose: "Project discussion",
    entryTime: "2023-04-14T16:00:00",
    status: "checked_in"
  }
];

const relationshipOptions = [
  "Parent", "Guardian", "Sibling", "Relative", "Friend", "Classmate", "Other"
];

const VisitorLog = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [visitorName, setVisitorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddVisitor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!visitorName || !relationship || !purpose) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newVisitor: Visitor = {
        id: `v${visitors.length + 1}`,
        studentId: "user1",
        studentName: "Alex Johnson",
        visitorName,
        relationship,
        purpose,
        entryTime: new Date().toISOString(),
        status: "checked_in"
      };
      
      setVisitors([newVisitor, ...visitors]);
      
      // Reset form
      setVisitorName('');
      setRelationship('');
      setPurpose('');
      setIsAdding(false);
      
      toast({
        title: "Visitor checked in",
        description: "The visitor has been successfully checked in",
      });
    } catch (error) {
      toast({
        title: "Check-in failed",
        description: "An error occurred during check-in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (visitorId: string) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedVisitors = visitors.map(visitor => 
        visitor.id === visitorId 
          ? { ...visitor, exitTime: new Date().toISOString(), status: "checked_out" as const } 
          : visitor
      );
      
      setVisitors(updatedVisitors);
      
      toast({
        title: "Visitor checked out",
        description: "The visitor has been successfully checked out",
      });
    } catch (error) {
      toast({
        title: "Check-out failed",
        description: "An error occurred during check-out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Visitor Log</h1>
          <p className="text-gray-500">Manage and track your visitors</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <UserRound className="mr-2 h-4 w-4" /> Check In Visitor
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Check In New Visitor</CardTitle>
            <CardDescription>Fill in visitor details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddVisitor} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitorName">Visitor Name</Label>
                  <Input
                    id="visitorName"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Enter visitor's full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select 
                    value={relationship}
                    onValueChange={setRelationship}
                    required
                  >
                    <SelectTrigger id="relationship">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Input
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Briefly describe the purpose of the visit"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Checking in..." : "Check In Visitor"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
          <CardDescription>Your visitor history</CardDescription>
        </CardHeader>
        <CardContent>
          {visitors.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Entry Time</TableHead>
                    <TableHead>Exit Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.visitorName}</TableCell>
                      <TableCell>{visitor.relationship}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          {formatDateTime(visitor.entryTime)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {visitor.exitTime ? formatDateTime(visitor.exitTime) : "-"}
                      </TableCell>
                      <TableCell>
                        {visitor.status === "checked_in" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Left
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {visitor.status === "checked_in" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleCheckout(visitor.id)}
                          >
                            Check Out
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No visitors recorded yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorLog;
