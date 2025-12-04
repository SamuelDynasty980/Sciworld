import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { badges } from '@/lib/data';
import { Trophy, PlayCircle, CheckCircle2, Star, Eye, Compass, Brain, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Eye,
  Compass,
  Brain,
  Award
};

export default function Dashboard() {
  const { user } = useUser();

  if (!user) return null;

  const earnedBadges = badges.filter(badge => 
    badge.id === 'curious' && user.videosWatched.length >= badge.requirement ||
    badge.id === 'explorer' && user.videosWatched.length >= badge.requirement ||
    badge.id === 'genius' && user.videosWatched.length >= badge.requirement ||
    badge.id === 'master' && user.quizzesCompleted.length >= badge.requirement
  );

  const nextBadge = badges.find(badge => !earnedBadges.includes(badge));
  
  const stats = [
    { 
      title: 'Videos Watched', 
      value: user.videosWatched.length, 
      icon: PlayCircle, 
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    { 
      title: 'Quizzes Completed', 
      value: user.quizzesCompleted.length, 
      icon: CheckCircle2, 
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    { 
      title: 'Badges Earned', 
      value: earnedBadges.length, 
      icon: Trophy, 
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    { 
      title: 'Total Score', 
      value: user.videosWatched.length * 10 + user.quizzesCompleted.length * 5, 
      icon: Star, 
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-gradient-hero rounded-3xl p-8 text-primary-foreground animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{user.avatar}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}'s Dashboard</h1>
              <p className="text-xl text-primary-foreground/90">
                Age {user.age} • {user.ageGroup === 'kids' ? 'Young Explorer' : 'Science Enthusiast'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-hover transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Section */}
        {nextBadge && (
          <Card className="shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Next Badge Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = iconMap[nextBadge.icon as keyof typeof iconMap];
                      return <Icon className="w-8 h-8 text-primary" />;
                    })()}
                    <div>
                      <p className="font-bold text-lg">{nextBadge.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {nextBadge.id === 'master' 
                          ? `Complete ${nextBadge.requirement} quizzes`
                          : `Watch ${nextBadge.requirement} videos`
                        }
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {nextBadge.id === 'master' 
                      ? `${user.quizzesCompleted.length}/${nextBadge.requirement}`
                      : `${user.videosWatched.length}/${nextBadge.requirement}`
                    }
                  </Badge>
                </div>
                <Progress 
                  value={
                    nextBadge.id === 'master'
                      ? (user.quizzesCompleted.length / nextBadge.requirement) * 100
                      : (user.videosWatched.length / nextBadge.requirement) * 100
                  }
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map(badge => {
                const earned = earnedBadges.includes(badge);
                const Icon = iconMap[badge.icon as keyof typeof iconMap];
                
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      "p-4 rounded-xl text-center transition-all",
                      earned 
                        ? "bg-gradient-secondary shadow-card hover:scale-105" 
                        : "bg-muted/30 opacity-50"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center",
                      earned ? "bg-secondary-foreground/20" : "bg-foreground/10"
                    )}>
                      <Icon className={cn(
                        "w-8 h-8",
                        earned ? "text-secondary-foreground" : "text-muted-foreground"
                      )} />
                    </div>
                    <p className={cn(
                      "font-bold text-sm",
                      earned ? "text-secondary-foreground" : "text-muted-foreground"
                    )}>
                      {badge.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
