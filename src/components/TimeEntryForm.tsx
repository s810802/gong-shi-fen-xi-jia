
import React, { useState, useEffect } from 'react';
import { useWorkTime } from '../contexts/WorkTimeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTodayStr } from '@/utils/dateUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface TimeEntryFormProps {
  entryId?: string;
  onSuccess?: () => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({ entryId, onSuccess }) => {
  const { currentUser } = useAuth();
  const { 
    categories, 
    addWorkTimeEntry, 
    updateWorkTimeEntry, 
    workTimeEntries 
  } = useWorkTime();
  
  const [date, setDate] = useState(getTodayStr());
  const [hours, setHours] = useState("8");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [subCategories, setSubCategories] = useState<{ id: string; name: string; }[]>([]);

  useEffect(() => {
    if (entryId) {
      const entry = workTimeEntries.find(entry => entry.id === entryId);
      if (entry) {
        setDate(entry.date);
        setHours(entry.hours.toString());
        setMainCategory(entry.mainCategory);
        setSubCategory(entry.subCategory);
        setDescription(entry.description);
      }
    }
  }, [entryId, workTimeEntries]);

  useEffect(() => {
    // Update subcategories when main category changes
    if (mainCategory) {
      const category = categories.find(c => c.name === mainCategory);
      if (category) {
        setSubCategories(category.subCategories);
        if (!subCategory) {
          setSubCategory(category.subCategories[0]?.name || "");
        }
      }
    } else {
      setSubCategories([]);
      setSubCategory("");
    }
  }, [mainCategory, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainCategory || !subCategory) {
      toast.error("請選擇工作類別");
      return;
    }

    if (!date) {
      toast.error("請選擇日期");
      return;
    }

    const hoursValue = parseFloat(hours);
    if (isNaN(hoursValue) || hoursValue <= 0 || hoursValue > 24) {
      toast.error("請輸入有效的工作小時數 (0-24)");
      return;
    }

    if (!description.trim()) {
      toast.error("請輸入工作描述");
      return;
    }

    if (!currentUser) {
      toast.error("請先登入");
      return;
    }

    const entryData = {
      userId: currentUser.id,
      date,
      hours: hoursValue,
      mainCategory,
      subCategory,
      description,
    };

    if (entryId) {
      updateWorkTimeEntry(entryId, entryData);
    } else {
      addWorkTimeEntry(entryData);
      // Reset form after submit
      setHours("8");
      setDescription("");
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {entryId ? "編輯工時紀錄" : "新增工時紀錄"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">日期</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours">工作時數</Label>
              <Input
                id="hours"
                type="number"
                min="0.5"
                max="24"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mainCategory">主分類</Label>
              <Select value={mainCategory} onValueChange={setMainCategory}>
                <SelectTrigger id="mainCategory">
                  <SelectValue placeholder="選擇主分類" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCategory">次分類</Label>
              <Select 
                value={subCategory} 
                onValueChange={setSubCategory}
                disabled={subCategories.length === 0}
              >
                <SelectTrigger id="subCategory">
                  <SelectValue placeholder="選擇次分類" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.name}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">工作內容描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="請簡述您的工作內容"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              {entryId ? "更新紀錄" : "新增紀錄"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TimeEntryForm;
