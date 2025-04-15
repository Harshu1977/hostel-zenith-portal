
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';

const categories = [
  'Maintenance',
  'Cleanliness',
  'Food Quality',
  'Staff Behavior',
  'Network Issues',
  'Furniture',
  'Plumbing',
  'Electrical',
  'Security',
  'Other'
];

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title || !category || !description) {
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
      
      // In a real app, we would send the form data to a backend API
      toast({
        title: "Complaint submitted",
        description: "Your complaint has been registered successfully",
      });
      
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "An error occurred while submitting your complaint. Please try again.",
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
              <CardTitle>Complaint Registered Successfully</CardTitle>
            </div>
            <CardDescription className="text-green-800">
              Your complaint has been submitted and is being reviewed
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Complaint Title</h3>
                  <p className="font-medium">{title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="font-medium">{category}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p>{description}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm">
                    {isAnonymous
                      ? "This complaint was submitted anonymously."
                      : "This complaint was submitted with your identity."}
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
                    <h3 className="text-sm font-medium text-blue-800">What happens next?</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Your complaint has been assigned a tracking number. The hostel administration will review it and take appropriate action. You can check the status of your complaint in the dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button asChild variant="outline">
                  <a href="/dashboard">Back to Dashboard</a>
                </Button>
                <Button asChild>
                  <a href="/dashboard/complaints">View All Complaints</a>
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
        <h1 className="text-2xl font-bold">Submit a Complaint</h1>
        <p className="text-gray-500">Report issues or provide suggestions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>Fill in the details of your complaint</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Complaint Title</Label>
              <Input
                id="title"
                placeholder="Brief title describing the issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the issue or suggestion"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Please include all relevant details such as location, time, and any specific information that might help in resolving the issue.
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="anonymous" 
                checked={isAnonymous} 
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="anonymous" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Submit Anonymously
                </Label>
                <p className="text-xs text-muted-foreground">
                  Your identity will not be disclosed to anyone if you check this option.
                </p>
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
                  <h3 className="text-sm font-medium text-amber-800">Important Note</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      All complaints are taken seriously and will be addressed by the hostel administration. 
                      Please ensure that the information provided is accurate and truthful.
                      False or malicious complaints may lead to disciplinary action.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintForm;
