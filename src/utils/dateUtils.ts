
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getLastWeekRange = (): { start: string; end: string } => {
  const today = new Date();
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - today.getDay() - 1); // Last Saturday
  
  const lastWeekStart = new Date(lastWeekEnd);
  lastWeekStart.setDate(lastWeekEnd.getDate() - 6); // Previous Sunday
  
  return {
    start: lastWeekStart.toISOString().split('T')[0],
    end: lastWeekEnd.toISOString().split('T')[0],
  };
};

export const getLastMonthRange = (): { start: string; end: string } => {
  const today = new Date();
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  return {
    start: lastMonthStart.toISOString().split('T')[0],
    end: lastMonthEnd.toISOString().split('T')[0],
  };
};

export const getCurrentWeekRange = (): { start: string; end: string } => {
  const today = new Date();
  const currentWeekStart = new Date(today);
  const day = today.getDay() || 7; // Get day of week (0 = Sunday, so we use 7 for Sunday)
  currentWeekStart.setDate(today.getDate() - day + 1); // Start of week (Monday)
  
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of week (Sunday)
  
  return {
    start: currentWeekStart.toISOString().split('T')[0],
    end: currentWeekEnd.toISOString().split('T')[0],
  };
};

export const getCurrentMonthRange = (): { start: string; end: string } => {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  return {
    start: currentMonthStart.toISOString().split('T')[0],
    end: currentMonthEnd.toISOString().split('T')[0],
  };
};

export const getTodayStr = (): string => {
  return new Date().toISOString().split('T')[0];
};
