
import { Badge } from '@/components/ui/badge';

type Status = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'resolved' | 'checked_in' | 'checked_out';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusDetails = (status: Status) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', variant: 'outline', className: 'bg-yellow-50 text-yellow-800 hover:bg-yellow-50' };
      case 'approved':
        return { label: 'Approved', variant: 'outline', className: 'bg-green-50 text-green-800 hover:bg-green-50' };
      case 'rejected':
        return { label: 'Rejected', variant: 'outline', className: 'bg-red-50 text-red-800 hover:bg-red-50' };
      case 'in_progress':
        return { label: 'In Progress', variant: 'outline', className: 'bg-blue-50 text-blue-800 hover:bg-blue-50' };
      case 'resolved':
        return { label: 'Resolved', variant: 'outline', className: 'bg-green-50 text-green-800 hover:bg-green-50' };
      case 'checked_in':
        return { label: 'Checked In', variant: 'outline', className: 'bg-purple-50 text-purple-800 hover:bg-purple-50' };
      case 'checked_out':
        return { label: 'Checked Out', variant: 'outline', className: 'bg-gray-50 text-gray-800 hover:bg-gray-50' };
      default:
        return { label: status, variant: 'outline', className: '' };
    }
  };

  const { label, className } = getStatusDetails(status);

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};
