import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, GraduationCap, Briefcase, Target, Plus, X } from 'lucide-react';

interface UserProfileProps {
  initialData?: any;
  onComplete: (data: any) => void;
}

export function UserProfile({ initialData, onComplete }: UserProfileProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: initialData?.name || '',
    age: initialData?.age || '',
    location: initialData?.location || '',
    email: initialData?.email || '',
    
    // Education
    education: initialData?.education || '',
    field: initialData?.field || '',
    graduation: initialData?.graduation || '',
    gpa: initialData?.gpa || '',
    
    // Experience
    experience: initialData?.experience || '',
    currentRole: initialData?.currentRole || '',
    industry: initialData?.industry || '',
    skills: initialData?.skills || [],
    
    // Goals & Interests
    careerGoals: initialData?.careerGoals || '',
    interests: initialData?.interests || [],
    workStyle: initialData?.workStyle || '',
    salaryExpectation: initialData?.salaryExpectation || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const steps = [
    { title: 'Basic Information', icon: User },
    { title: 'Education', icon: GraduationCap },
    { title: 'Experience & Skills', icon: Briefcase },
    { title: 'Goals & Preferences', icon: Target }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((i: string) => i !== interest)
    }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  const predefinedInterests = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'Marketing',
    'Design', 'Research', 'Management', 'Entrepreneurship', 'Creative Arts',
    'Social Impact', 'Environment', 'Travel', 'Sports', 'Gaming'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto p-2 sm:p-4">
  <CardHeader>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <CardTitle className="text-xl sm:text-2xl">Build Your Profile</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Help us understand your background to provide personalized career guidance
        </CardDescription>
      </div>
      <div className="flex items-center space-x-2 self-end sm:self-auto">
        <span className="text-xs sm:text-sm text-gray-600">
          {step + 1} of {steps.length}
        </span>
        <Progress value={progressPercentage} className="w-16 sm:w-24" />
      </div>
    </div>
  </CardHeader>

  <CardContent className="space-y-6">
    {/* Step Indicator */}
    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-8">
      {steps.map((stepInfo, index) => {
        const Icon = stepInfo.icon;
        const isActive = index === step;
        const isCompleted = index < step;

        return (
          <div key={index} className="flex flex-col items-center min-w-[70px] flex-1 sm:flex-none">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-1
              ${isActive ? 'border-blue-500 bg-blue-50 text-blue-600' :
                isCompleted ? 'border-green-500 bg-green-50 text-green-600' :
                'border-gray-300 bg-gray-50 text-gray-400'}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={`text-[10px] sm:text-xs text-center px-1
              ${isActive ? 'text-blue-600' :
                isCompleted ? 'text-green-600' :
                'text-gray-400'}`}
            >
              {stepInfo.title}
            </span>
          </div>
        );
      })}
    </div>

    {/* Step Content */}
    <div className="space-y-6">
      {step === 0 && (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            {/* Age */}
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Your age"
              />
            </div>
            {/* Location */}
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </div>
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>
      )}

      {/* Other steps remain the same — just ensure grid uses `grid-cols-1 sm:grid-cols-2` and wrapping on badges */}
    </div>

    {/* Navigation Buttons */}
    <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={step === 0}
        className="w-full sm:w-auto"
      >
        Back
      </Button>
      <Button onClick={handleNext} className="w-full sm:w-auto">
        {step === steps.length - 1 ? 'Complete Profile' : 'Next'}
      </Button>
    </div>
  </CardContent>
</Card>

  );
}