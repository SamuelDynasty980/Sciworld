import { Navbar } from '@/components/Navbar';
import { VideoCard } from '@/components/VideoCard';
import { useUser } from '@/contexts/UserContext';
import { videos, categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Beaker, Leaf, Laptop, Globe, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Zap,
  Flask: Beaker,
  Leaf,
  Laptop,
  Globe,
  Rocket
};

export default function Home() {
  const { user } = useUser();
  
  const recommendedVideos = videos
    .filter(v => v.ageGroup.includes(user?.ageGroup || 'kids'))
    .slice(0, 3);
  
  const continueWatching = videos
    .filter(v => user?.videosWatched.includes(v.id))
    .slice(-2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground animate-fade-in">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hey {user?.name}! Ready to explore science? {user?.avatar}
            </h1>
            <p className="text-xl mb-6 text-primary-foreground/90">
              Discover amazing videos, take fun quizzes, and become a science superstar!
            </p>
            <Link to="/explore">
              <Button variant="secondary" size="lg" className="group">
                Start Exploring
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <section className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Continue Watching</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueWatching.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Videos */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Popular Science Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              const Icon = iconMap[category.icon as keyof typeof iconMap];
              
              return (
                <Link key={category.id} to={`/explore?category=${category.id}`}>
                  <div className="bg-card rounded-2xl p-6 text-center hover:scale-105 transition-all shadow-card hover:shadow-hover cursor-pointer group border-2 border-transparent hover:border-primary">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-primary rounded-full flex items-center justify-center group-hover:animate-bounce-gentle">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
