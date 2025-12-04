import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { avatars } from '@/lib/data';
import { AlertCircle, LogOut, Save, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Settings() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age.toString() || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || avatars[0]);
  const [customImage, setCustomImage] = useState<string | null>(
    user?.avatar && !avatars.includes(user.avatar) ? user.avatar : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomImage(base64String);
        setSelectedAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomImage = () => {
    setCustomImage(null);
    setSelectedAvatar(avatars[0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (user && name && age) {
      setUser({
        ...user,
        name,
        age: parseInt(age),
        avatar: selectedAvatar
      });
      toast({
        title: "Settings saved!",
        description: "Your profile has been updated successfully."
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleResetProgress = () => {
    if (user && confirm('Are you sure you want to reset all your progress? This cannot be undone!')) {
      setUser({
        ...user,
        videosWatched: [],
        quizzesCompleted: [],
        badges: []
      });
      toast({
        title: "Progress reset",
        description: "Your learning progress has been reset.",
        variant: "destructive"
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Settings */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={6}
                max={18}
              />
            </div>

            <div className="space-y-2">
              <Label>Avatar</Label>
              
              {/* Custom Image Upload */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 w-4 h-4" />
                    Upload Custom Picture
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {customImage && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={customImage} alt="Custom avatar" />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm flex-1">Custom picture</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeCustomImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Emoji Avatars */}
              <div>
                <Label className="text-sm text-muted-foreground">Or choose an emoji</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setCustomImage(null);
                      }}
                      className={cn(
                        "text-4xl p-3 rounded-lg border-2 hover:scale-110 transition-all",
                        selectedAvatar === avatar && !customImage
                          ? "border-primary bg-primary/10 scale-110" 
                          : "border-border"
                      )}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full" variant="default">
              <Save className="mr-2 w-4 h-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>See how far you've come!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Videos Watched</span>
              <span className="text-2xl font-bold text-primary">{user.videosWatched.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Quizzes Completed</span>
              <span className="text-2xl font-bold text-accent">{user.quizzesCompleted.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium">Badges Earned</span>
              <span className="text-2xl font-bold text-secondary">{user.badges.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="shadow-card border-destructive/50 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Careful! These actions cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleResetProgress} 
              variant="destructive" 
              className="w-full"
            >
              Reset All Progress
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
