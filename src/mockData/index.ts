
import { User, WorkTimeEntry, Category } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "王小明",
    email: "ming@example.com",
    role: "user",
  },
  {
    id: "2",
    name: "李小花",
    email: "flower@example.com",
    role: "user",
  },
  {
    id: "3",
    name: "陳管理",
    email: "admin@example.com",
    role: "admin",
  },
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "開發",
    subCategories: [
      { id: "101", name: "前端開發" },
      { id: "102", name: "後端開發" },
      { id: "103", name: "資料庫設計" },
    ],
  },
  {
    id: "2",
    name: "設計",
    subCategories: [
      { id: "201", name: "UI設計" },
      { id: "202", name: "UX研究" },
      { id: "203", name: "原型製作" },
    ],
  },
  {
    id: "3",
    name: "測試",
    subCategories: [
      { id: "301", name: "單元測試" },
      { id: "302", name: "整合測試" },
      { id: "303", name: "使用者測試" },
    ],
  },
  {
    id: "4",
    name: "會議",
    subCategories: [
      { id: "401", name: "團隊會議" },
      { id: "402", name: "客戶會議" },
      { id: "403", name: "規劃會議" },
    ],
  },
  {
    id: "5",
    name: "休假",
    subCategories: [
      { id: "501", name: "年假" },
      { id: "502", name: "病假" },
      { id: "503", name: "事假" },
    ],
  },
];

const today = new Date();
const oneDay = 24 * 60 * 60 * 1000;

function getRandomDate(daysAgo: number): string {
  const randomDate = new Date(today.getTime() - Math.floor(Math.random() * daysAgo) * oneDay);
  return randomDate.toISOString().split("T")[0];
}

export const mockWorkTimeEntries: WorkTimeEntry[] = [
  // User 1 entries
  {
    id: "e1",
    userId: "1",
    date: getRandomDate(7), // Within last week
    hours: 4,
    mainCategory: "開發",
    subCategory: "前端開發",
    description: "實作登入頁面的UI元件",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "e2",
    userId: "1",
    date: getRandomDate(7),
    hours: 3,
    mainCategory: "開發",
    subCategory: "後端開發",
    description: "建立API資料驗證邏輯",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "e3",
    userId: "1",
    date: getRandomDate(28), // Within last month
    hours: 8,
    mainCategory: "測試",
    subCategory: "整合測試",
    description: "測試資料庫與前端連接功能",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "e4",
    userId: "1",
    date: getRandomDate(28),
    hours: 2,
    mainCategory: "會議",
    subCategory: "團隊會議",
    description: "週一進度同步會議",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // User 2 entries
  {
    id: "e5",
    userId: "2",
    date: getRandomDate(7),
    hours: 6,
    mainCategory: "設計",
    subCategory: "UI設計",
    description: "設計儀表板介面",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "e6",
    userId: "2",
    date: getRandomDate(7),
    hours: 2,
    mainCategory: "會議",
    subCategory: "客戶會議",
    description: "與客戶討論需求變更",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "e7",
    userId: "2",
    date: getRandomDate(28),
    hours: 8,
    mainCategory: "休假",
    subCategory: "年假",
    description: "個人休假",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
