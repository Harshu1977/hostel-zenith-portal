
import { QrCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const QRCodeDisplay = ({ 
  studentId, 
  studentName
}: { 
  studentId: string; 
  studentName: string; 
}) => {
  // In a real app, this would be an actual QR code generator
  // using a library like 'qrcode.react'
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-hostel-purple/10">
        <CardTitle className="text-hostel-purple">Student Mess QR Code</CardTitle>
        <CardDescription>Show this to mark your meal attendance</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="w-64 h-64 border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 bg-white">
          <div className="w-full h-full border-8 border-hostel-purple flex items-center justify-center">
            <QrCode size={150} strokeWidth={1} />
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="font-medium text-lg">{studentName}</p>
          <p className="text-sm text-gray-500">ID: {studentId}</p>
          <p className="mt-2 text-xs text-gray-500">Valid for today only</p>
        </div>
      </CardContent>
    </Card>
  );
};
