
import { Announcement } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, formatDistanceToNow } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

export const AnnouncementCard = ({
  announcement,
  compact = false,
}: {
  announcement: Announcement;
  compact?: boolean;
}) => {
  const createdDate = new Date(announcement.createdAt);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
  const formattedDate = format(createdDate, 'MMMM d, yyyy');

  return (
    <Card className={`overflow-hidden hover-scale ${compact ? 'h-auto' : 'h-full'}`}>
      <CardHeader className={`${announcement.important ? 'bg-red-50' : 'bg-hostel-gray-light'} py-3`}>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className={`text-base ${announcement.important ? 'text-red-600' : ''}`}>
            {announcement.important && <AlertTriangle size={18} className="inline-block mr-1" />}
            {announcement.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs flex justify-between">
          <span>By {announcement.postedBy}</span>
          <span title={formattedDate}>{timeAgo}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className={compact ? 'py-2' : 'py-3'}>
        <p className={compact ? 'text-sm line-clamp-2' : 'text-sm whitespace-pre-wrap'}>
          {announcement.content}
        </p>
        {compact && announcement.content.length > 100 && (
          <span className="text-xs text-hostel-blue font-medium">Read more</span>
        )}
      </CardContent>
    </Card>
  );
};
