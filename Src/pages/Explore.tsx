import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { VideoCard } from '@/components/VideoCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { videos, categories } from '@/lib/data';
import { Search, Zap, Beaker, Leaf, Laptop, Globe, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Zap,
  Flask: Beaker,
  Leaf,
  Laptop,
  Globe,
  Rocket
};

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      searchParams.delete('category');
    } else {
      setSelectedCategory(categoryId);
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
          {categories.map(category => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "gap-2",
                  isSelected && "shadow-card"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name} Videos`
                : 'All Videos'
              } ({filteredVideos.length})
            </h2>
            {selectedCategory && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedCategory(null);
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                }}
              >
                Clear Filter
              </Button>
            )}
          </div>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No videos found. Try a different search!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
