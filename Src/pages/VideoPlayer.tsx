import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { videos } from '@/lib/data';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';

export default function VideoPlayer() {
  const { id } = useParams();
  const { user, updateProgress } = useUser();
  const video = videos.find(v => v.id === id);

  useEffect(() => {
    if (video && user) {
      // Mark video as watched after 3 seconds (simulating watching)
      const timer = setTimeout(() => {
        updateProgress(video.id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [video, user, updateProgress]);

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-xl">Video not found</p>
          <div className="text-center mt-4">
            <Link to="/explore">
              <Button>Back to Explore</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasWatched = user?.videosWatched.includes(video.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/explore">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Videos
          </Button>
        </Link>

        <div className="space-y-6 animate-fade-in">
          {/* Video Player */}
          <Card className="overflow-hidden shadow-hover">
            <div className="aspect-video bg-foreground/5">
              <iframe
                src={`${video.embedUrl}?rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Card>

          {/* Video Info */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{video.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {video.category}
                  </Badge>
                  <Badge variant={video.difficulty === 'easy' ? 'default' : 'outline'}>
                    {video.difficulty}
                  </Badge>
                  {hasWatched && (
                    <Badge variant="default" className="gap-1 bg-accent">
                      <CheckCircle2 className="w-3 h-3" />
                      Watched
                    </Badge>
                  )}
                </div>
              </div>
              
              <Link to={`/quiz/${video.id}`}>
                <Button variant="hero" size="lg" className="gap-2">
                  Take Quiz
                  <CheckCircle2 className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3">About this video</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Related Videos */}
          <div>
            <h2 className="text-2xl font-bold mb-4">More {video.category} videos</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {videos
                .filter(v => v.category === video.category && v.id !== video.id)
                .slice(0, 3)
                .map(relatedVideo => (
                  <Link key={relatedVideo.id} to={`/video/${relatedVideo.id}`}>
                    <Card className="overflow-hidden hover:scale-105 transition-all shadow-card hover:shadow-hover cursor-pointer">
                      <img 
                        src={relatedVideo.thumbnail} 
                        alt={relatedVideo.title}
                        className="w-full aspect-video object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-bold line-clamp-2">{relatedVideo.title}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
