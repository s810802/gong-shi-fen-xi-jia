
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { WorkTimeEntry } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TimeEntryList from './TimeEntryList';

interface WorkTimeChartProps {
  entries: WorkTimeEntry[];
  title?: string;
  groupBy: 'mainCategory' | 'subCategory';
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', 
  '#5DADE2', '#48C9B0', '#F4D03F', '#EB984E', '#EC7063'
];

const WorkTimeChart: React.FC<WorkTimeChartProps> = ({ 
  entries, 
  title = "工時分析", 
  groupBy 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Group entries by selected category and calculate total hours
  const aggregatedData = entries.reduce((acc: Record<string, number>, entry) => {
    const category = groupBy === 'mainCategory' ? entry.mainCategory : entry.subCategory;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += entry.hours;
    return acc;
  }, {});
  
  // Convert to array for recharts
  const chartData = Object.entries(aggregatedData).map(([name, hours]) => ({
    name,
    hours,
  }));
  
  // Sort by hours (descending)
  chartData.sort((a, b) => b.hours - a.hours);
  
  // Filter entries based on selected category
  const filteredEntries = selectedCategory
    ? entries.filter(entry => {
      const category = groupBy === 'mainCategory' ? entry.mainCategory : entry.subCategory;
      return category === selectedCategory;
    })
    : [];
  
  const handlePieClick = (data: any) => {
    setSelectedCategory(data.name === selectedCategory ? null : data.name);
  };
  
  const totalHours = chartData.reduce((sum, item) => sum + item.hours, 0);
  
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="hours"
                      nameKey="name"
                      onClick={handlePieClick}
                      label={({ name, percent }) => 
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                          stroke={selectedCategory === entry.name ? '#000' : 'none'}
                          strokeWidth={selectedCategory === entry.name ? 2 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value} 小時 (${((value/totalHours)*100).toFixed(1)}%)`, '工時']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {chartData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      selectedCategory === item.name 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handlePieClick(item)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div className="font-medium truncate">{item.name}</div>
                    </div>
                    <div className="mt-1 text-sm">
                      {item.hours} 小時 ({((item.hours/totalHours)*100).toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[300px]">
              <p className="text-muted-foreground">無數據可顯示</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedCategory && filteredEntries.length > 0 && (
        <TimeEntryList 
          entries={filteredEntries} 
          title={`「${selectedCategory}」類別的工時明細`}
        />
      )}
    </div>
  );
};

export default WorkTimeChart;
