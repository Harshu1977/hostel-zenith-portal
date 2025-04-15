
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMessMenus } from '@/data/mockData';

const MessMenu = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const todayMenu = mockMessMenus.find(menu => menu.day === today) || mockMessMenus[0];
  
  // Helper function to render a meal list
  const renderMealItems = (items: string[]) => {
    return items.map((item, index) => (
      <span key={index} className="block">
        {item}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mess Menu</h1>
        <p className="text-gray-500">Weekly mess menu schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-3 bg-hostel-purple/5">
          <CardHeader>
            <CardTitle>Today's Menu ({today})</CardTitle>
            <CardDescription>What's being served today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Breakfast</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {todayMenu.breakfast.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-2">7:00 AM - 9:00 AM</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Lunch</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {todayMenu.lunch.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-2">12:00 PM - 2:00 PM</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Dinner</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {todayMenu.dinner.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-2">7:00 PM - 9:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Menu</CardTitle>
          <CardDescription>Complete mess menu for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableCaption>Weekly mess menu schedule</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Day</TableHead>
                  <TableHead>Breakfast (7:00 - 9:00 AM)</TableHead>
                  <TableHead>Lunch (12:00 - 2:00 PM)</TableHead>
                  <TableHead>Dinner (7:00 - 9:00 PM)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMessMenus.map((menu) => (
                  <TableRow key={menu.id} className={menu.day === today ? "bg-hostel-purple/5" : ""}>
                    <TableCell className="font-medium">{menu.day}</TableCell>
                    <TableCell>{renderMealItems(menu.breakfast)}</TableCell>
                    <TableCell>{renderMealItems(menu.lunch)}</TableCell>
                    <TableCell>{renderMealItems(menu.dinner)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Dietary Requirements</CardTitle>
          <CardDescription>Information for students with special dietary needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              If you have special dietary requirements due to medical conditions, allergies, or religious restrictions, 
              please contact the mess administration at least 24 hours in advance.
            </p>
            <ul className="mt-2">
              <li>Vegetarian options are available for all meals</li>
              <li>Gluten-free alternatives available upon request</li>
              <li>Dairy-free alternatives available upon request</li>
              <li>For severe allergies, please contact the mess supervisor directly</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              For more information, please contact the mess administration at mess@hostelzenith.edu
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessMenu;
