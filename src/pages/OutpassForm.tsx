
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const OutpassForm = () => {
  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [parentConsent, setParentConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!destination || !reason || !fromDate || !toDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!parentConsent) {
      toast({
        title: "Parent consent required",
        description: "Please confirm that you have your parent's consent",
        variant: "destructive",
      });
      return;
    }
    
    if (fromDate > toDate) {
      toast({
        title: "Invalid date range",
        description: "Return date must be after departure date",
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
        title: "Outpass request submitted",
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
              <CardTitle>Outpass Request Submitted</CardTitle>
            </div>
            <CardDescription className="text-green-800">
              Your request has been sent for approval
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Destination</h3>
                  <p className="font-medium">{destination}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date Range</h3>
                  <p className="font-medium">
                    {fromDate && format(fromDate, 'PPP')} to {toDate && format(toDate, 'PPP')}
                  </p>
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
                      <p>Your outpass request is pending approval from the hostel warden. You'll receive a notification once it's approved or rejected.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button asChild variant="outline">
                  <a href="/dashboard">Back to Dashboard</a>
                </Button>
                <Button asChild>
                  <a href="/dashboard/outpass">View Outpass Status</a>
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
        <h1 className="text-2xl font-bold">New Outpass Request</h1>
        <p className="text-gray-500">Request permission to leave the hostel</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outpass Details</CardTitle>
          <CardDescription>Fill in all fields to submit your request</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : <span>From date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="w-1/2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : <span>To date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          disabled={(date) => 
                            (fromDate ? date < fromDate : false) || 
                            date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                placeholder="Provide a detailed reason for your leave request"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="parentConsent"
                checked={parentConsent}
                onCheckedChange={(checked) => setParentConsent(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="parentConsent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Parent Consent
                </Label>
                <p className="text-xs text-muted-foreground">
                  I confirm that my parents are aware of this leave request and have given their consent.
                </p>
              </div>
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
                    <p>Once your outpass is approved, an SMS notification will be sent to your parents.</p>
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

export default OutpassForm;
