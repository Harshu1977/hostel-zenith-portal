
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockStudents } from '@/data/mockData';
import { Check, X, Clock } from 'lucide-react';

// Mock data - would be fetched from API in a real app
const currentStudent = mockStudents[0];

const mockTodaysMeals = [
  {
    id: 'breakfast',
    type: 'Breakfast',
    time: '7:00 AM - 9:00 AM',
    status: 'attended', // 'attended', 'missed', 'upcoming'
    timestamp: '7:45 AM'
  },
  {
    id: 'lunch',
    type: 'Lunch',
    time: '12:00 PM - 2:00 PM',
    status: 'missed',
    timestamp: '-'
  },
  {
    id: 'dinner',
    type: 'Dinner',
    time: '7:00 PM - 9:00 PM',
    status: 'upcoming',
    timestamp: '-'
  }
];

const StudentMealQR = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mess QR Code</h1>
        <p className="text-gray-500">Show this QR code to mark your meal attendance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <QRCodeDisplay 
            studentId={currentStudent.id} 
            studentName={currentStudent.name} 
          />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Meals</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTodaysMeals.map((meal) => (
                <div key={meal.id} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">{meal.type}</p>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                    {meal.status !== 'upcoming' && (
                      <p className="text-xs text-gray-400">
                        {meal.status === 'attended' ? `Attended at ${meal.timestamp}` : 'Missed'}
                      </p>
                    )}
                  </div>
                  {meal.status === 'attended' ? (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  ) : meal.status === 'missed' ? (
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Statistics</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Breakfast</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-hostel-blue h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lunch</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-hostel-blue h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dinner</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-hostel-blue h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Overall: 83%</p>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum required attendance: 75%
                </p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">View Detailed Attendance</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentMealQR;
