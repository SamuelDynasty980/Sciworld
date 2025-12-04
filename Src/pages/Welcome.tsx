import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Rocket, Microscope } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { AgeGroup } from '@/types';
import { avatars } from '@/lib/data';

export default function Welcome() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleAgeGroupSelect = (group: AgeGroup) => {
    setAgeGroup(group);
    setStep(2);
  };

  const handleComplete = () => {
    if (name && age && ageGroup) {
      const newUser = {
        id: Date.now().toString(),
        name,
        age: parseInt(age),
        ageGroup,
        avatar: selectedAvatar,
        videosWatched: [],
        quizzesCompleted: [],
        badges: [],
        createdAt: new Date()
      };
      setUser(newUser);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block p-4 bg-card/20 rounded-2xl mb-4 animate-bounce-gentle">
            <Sparkles className="w-16 h-16 text-secondary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">
            Welcome to SciWorld!
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Your journey into amazing science starts here 🚀
          </p>
        </div>

        {step === 1 ? (
          <div className="grid md:grid-cols-2 gap-4 animate-scale-in">
            <Card 
              className="cursor-pointer hover:scale-105 transition-all shadow-hover border-4 hover:border-secondary"
              onClick={() => handleAgeGroupSelect('kids')}
            >
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Rocket className="w-12 h-12 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Kids (6-12)</CardTitle>
                <CardDescription className="text-base">
                  Fun and colorful science adventures!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:scale-105 transition-all shadow-hover border-4 hover:border-primary"
              onClick={() => handleAgeGroupSelect('teens')}
            >
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Microscope className="w-12 h-12 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Teens (13-18)</CardTitle>
                <CardDescription className="text-base">
                  Dive deep into scientific concepts!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        ) : (
          <Card className="animate-scale-in shadow-hover">
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Profile</CardTitle>
              <CardDescription>Tell us a bit about yourself!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={6}
                  max={18}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Choose Your Avatar</Label>
                <div className="grid grid-cols-5 gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={cn(
                        "text-4xl p-3 rounded-lg border-2 hover:scale-110 transition-all",
                        selectedAvatar === avatar 
                          ? "border-primary bg-primary/10 scale-110" 
                          : "border-border"
                      )}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back
                </Button>
                <Button
                  variant="hero"
                  onClick={handleComplete}
                  disabled={!name || !age}
                  className="w-full"
                  size="lg"
                >
                  Start Learning!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
