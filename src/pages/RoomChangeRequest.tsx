
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - in a real app, this would be fetched from API
const hostelBlocks = ['A', 'B', 'C', 'D'];
const rooms = Array.from({ length: 50 }, (_, i) => `${i + 101}`);

const RoomChangeRequest = () => {
  const { user } = useAuth();
  const [currentBlock, setCurrentBlock] = useState('A');
  const [currentRoom, setCurrentRoom] = useState('101');
  const [requestedBlock, setRequestedBlock] = useState('');
  const [requestedRoom, setRequestedRoom] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!requestedBlock || !requestedRoom || !reason) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (currentBlock === requestedBlock && currentRoom === requestedRoom) {
      toast({
        title: "Invalid request",
        description: "The requested room is the same as your current room",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we would send the form data to a backend API
      toast({
        title: "Room change request submitted",
        description: "Your request has been sent for approval",
      });
      
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "An error occurred while submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="border-green-100">
          <CardHeader className="bg-green-50 text-green-700">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Room Change Request Submitted</CardTitle>
            </div>
            <CardDescription className="text-green-800">
              Your request has been sent for approval
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Room</h3>
                  <p className="font-medium">Block {currentBlock}, Room {currentRoom}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Requested Room</h3>
                  <p className="font-medium">Block {requestedBlock}, Room {requestedRoom}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                  <p>{reason}</p>
                </div>
              </div>
              
              <div className="rounded-md bg-amber-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Pending Approval</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>Your room change request is pending approval from the hostel warden. You'll receive a notification once it's approved or rejected.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button asChild variant="outline">
                  <a href="/dashboard">Back to Dashboard</a>
                </Button>
                <Button asChild>
                  <a href="/dashboard/room-change">View Request Status</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Room Change Request</h1>
        <p className="text-gray-500">Request to change your current room assignment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Fill in all fields to submit your request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Current Room</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentBlock">Block</Label>
                    <Select 
                      value={currentBlock} 
                      onValueChange={setCurrentBlock}
                      disabled
                    >
                      <SelectTrigger id="currentBlock">
                        <SelectValue placeholder="Select Block" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostelBlocks.map(block => (
                          <SelectItem key={block} value={block}>Block {block}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentRoom">Room No.</Label>
                    <Select 
                      value={currentRoom} 
                      onValueChange={setCurrentRoom}
                      disabled
                    >
                      <SelectTrigger id="currentRoom">
                        <SelectValue placeholder="Select Room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map(room => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Requested Room</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestedBlock">Block</Label>
                    <Select 
                      value={requestedBlock} 
                      onValueChange={setRequestedBlock}
                      required
                    >
                      <SelectTrigger id="requestedBlock">
                        <SelectValue placeholder="Select Block" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostelBlocks.map(block => (
                          <SelectItem key={block} value={block}>Block {block}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestedRoom">Room No.</Label>
                    <Select 
                      value={requestedRoom} 
                      onValueChange={setRequestedRoom}
                      required
                    >
                      <SelectTrigger id="requestedRoom">
                        <SelectValue placeholder="Select Room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map(room => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Room Change</Label>
              <Textarea
                id="reason"
                placeholder="Provide a detailed reason for your room change request"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Note</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Room changes are subject to availability and approval from the hostel administration. You'll be notified once your request has been processed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomChangeRequest;
