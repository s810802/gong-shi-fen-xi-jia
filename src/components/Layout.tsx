
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 
              className="text-xl md:text-2xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              工時輸入與分析系統
            </h1>
            
            {currentUser && (
              <nav className="ml-8 space-x-4 hidden md:flex">
                <Link 
                  to="/dashboard" 
                  className="text-white hover:text-blue-100 transition"
                >
                  儀表板
                </Link>
                <Link 
                  to="/time-entry" 
                  className="text-white hover:text-blue-100 transition"
                >
                  工時輸入
                </Link>
              </nav>
            )}
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-blue-700">
                    {getUserInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs opacity-80">
                    {currentUser.role === 'admin' ? '管理者' : '一般使用者'}
                  </p>
                </div>
              </div>
              <Button variant="secondary" onClick={handleLogout} size="sm">
                登出
              </Button>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex flex-1 pt-16">
        {currentUser && <Sidebar />}
        
        <main className="flex-1 md:ml-64 p-4">
          {children}
        </main>
      </div>
      
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 border-t">
        &copy; {new Date().getFullYear()} 工時輸入與分析系統 - 版權所有
      </footer>
    </div>
  );
};

export default Layout;
