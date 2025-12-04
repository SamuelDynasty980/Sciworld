import { Video } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link to={`/video/${video.id}`}>
      <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 shadow-card hover:shadow-hover cursor-pointer group">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-foreground/90 text-background px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Badge variant="secondary" className="capitalize">
            {video.category}
          </Badge>
          <Badge variant={video.difficulty === 'easy' ? 'default' : video.difficulty === 'medium' ? 'outline' : 'destructive'}>
            {video.difficulty}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};
