import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, BarChart3, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { avatars } from '@/lib/data';

export const Navbar = () => {
  const location = useLocation();
  const { user } = useUser();
  
  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="bg-gradient-hero p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SciWorld
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-card" 
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium hidden md:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {user && (
              <Link to="/settings" className="flex items-center gap-2 ml-2 hover:opacity-80 transition-opacity">
                {avatars.includes(user.avatar) ? (
                  <span className="text-2xl">{user.avatar}</span>
                ) : (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <span className="font-medium hidden sm:inline">{user.name}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
