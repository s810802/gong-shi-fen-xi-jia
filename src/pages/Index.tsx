
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to dashboard or time entry page
    if (currentUser && !isLoading) {
      navigate('/dashboard');
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">載入中...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">工時輸入與分析系統</h1>
            <p className="text-xl text-blue-700 mb-8">
              高效管理工作時間，提升專案透明度
            </p>
            
            <div className="flex justify-center">
              <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
                立即登入
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>簡易工時紀錄</CardTitle>
                <CardDescription>結構化記錄每日工作時間</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>日期與工作時數追蹤</li>
                  <li>兩層分類架構（主分類+次分類）</li>
                  <li>工作內容描述欄位</li>
                  <li>支援休假類別紀錄</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>視覺化分析報告</CardTitle>
                <CardDescription>深入了解工時分配情況</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>主分類與次分類圖表分析</li>
                  <li>點擊圖表項目顯示詳細資訊</li>
                  <li>各種時間區間查詢</li>
                  <li>個人工時摘要統計</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>權限分級管理</CardTitle>
                <CardDescription>完善的角色權限控制</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>一般使用者：管理個人工時</li>
                  <li>管理者：檢視所有使用者資料</li>
                  <li>嚴格的資料存取限制</li>
                  <li>安全的使用者驗證機制</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null; // This is handled by the useEffect redirect
};

export default Index;
