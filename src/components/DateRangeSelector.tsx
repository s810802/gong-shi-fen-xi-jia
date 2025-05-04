
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLastWeekRange, getLastMonthRange, getCurrentWeekRange, getCurrentMonthRange } from '@/utils/dateUtils';
import { Card, CardContent } from '@/components/ui/card';

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onRangeChange: (start: string, end: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onRangeChange,
}) => {
  const handleQuickSelect = (period: 'lastWeek' | 'lastMonth' | 'currentWeek' | 'currentMonth') => {
    let range;
    switch (period) {
      case 'lastWeek':
        range = getLastWeekRange();
        break;
      case 'lastMonth':
        range = getLastMonthRange();
        break;
      case 'currentWeek':
        range = getCurrentWeekRange();
        break;
      case 'currentMonth':
        range = getCurrentMonthRange();
        break;
      default:
        return;
    }
    onRangeChange(range.start, range.end);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="grid w-full md:w-auto items-center gap-1.5">
            <Label htmlFor="startDate">起始日期</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => onRangeChange(e.target.value, endDate)}
              className="w-full"
            />
          </div>
          
          <div className="grid w-full md:w-auto items-center gap-1.5">
            <Label htmlFor="endDate">結束日期</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => onRangeChange(startDate, e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => handleQuickSelect('currentWeek')}
            >
              本週
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => handleQuickSelect('lastWeek')}
            >
              上週
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => handleQuickSelect('currentMonth')}
            >
              本月
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => handleQuickSelect('lastMonth')}
            >
              上個月
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateRangeSelector;
