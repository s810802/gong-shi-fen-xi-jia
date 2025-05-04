
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">無法訪問</h1>
        <p className="text-xl text-gray-600 mb-8">
          您沒有權限訪問此頁面。
        </p>
        <Button onClick={() => navigate('/')}>
          返回首頁
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
