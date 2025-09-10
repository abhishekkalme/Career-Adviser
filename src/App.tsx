import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { UserProfile } from './components/UserProfile';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { CareerDashboard } from './components/CareerDashboard';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { ChatBot } from './components/ChatBot';
import { LearningResources } from './components/LearningResources';
import { ProgressionLadder } from './components/ProgressionLadder';
import { Brain, Users, Target, TrendingUp, MessageSquare, BookOpen, Map } from 'lucide-react';

interface UserData {
  profile: any;
  assessmentResults: any;
  careerRecommendations: any[];
  skillGaps: any[];
}

export default function App() {
  const [userData, setUserData] = useState<UserData>({
    profile: null,
    assessmentResults: null,
    careerRecommendations: [],
    skillGaps: []
  });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'profile', title: 'User Profile', icon: Users },
    { id: 'assessment', title: 'Assessment', icon: Brain },
    { id: 'results', title: 'Career Insights', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CareerAI</h1>
                <p className="text-sm text-gray-600">AI-Powered Career Guidance Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Demo Version
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                      ${isActive ? 'border-indigo-600 bg-indigo-50' : 
                        isCompleted ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 0 && (
          <UserProfile 
            onComplete={(profileData) => {
              setUserData(prev => ({ ...prev, profile: profileData }));
              setCurrentStep(1);
            }}
          />
        )}

        {currentStep === 1 && (
          <AssessmentQuiz 
            onComplete={(assessmentData) => {
              setUserData(prev => ({ 
                ...prev, 
                assessmentResults: assessmentData,
                careerRecommendations: generateMockRecommendations(assessmentData),
                skillGaps: generateMockSkillGaps(assessmentData)
              }));
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Skill Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="progression" className="flex items-center space-x-2">
                <Map className="h-4 w-4" />
                <span>Career Path</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Learning</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>AI Counselor</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <CareerDashboard 
                userData={userData}
                onExploreCareer={(career) => setActiveTab('progression')}
              />
            </TabsContent>

            <TabsContent value="skills">
              <SkillGapAnalysis skillGaps={userData.skillGaps} />
            </TabsContent>

            <TabsContent value="progression">
              <ProgressionLadder 
                careerPath={userData.careerRecommendations[0] || mockCareerPath}
              />
            </TabsContent>

            <TabsContent value="learning">
              <LearningResources 
                skillGaps={userData.skillGaps}
                recommendations={userData.careerRecommendations}
              />
            </TabsContent>

            <TabsContent value="chat">
              <ChatBot userData={userData} />
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Review and update your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProfile 
                    initialData={userData.profile}
                    onComplete={(profileData) => {
                      setUserData(prev => ({ ...prev, profile: profileData }));
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {currentStep < 2 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(2)}
              className="text-sm"
            >
              Skip to Demo Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data generators
function generateMockRecommendations(assessmentData: any) {
  return [
    {
      title: "Data Scientist",
      match: 92,
      description: "Analyze complex data to help organizations make informed decisions",
      requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
      salaryRange: "$80,000 - $150,000",
      growth: "22% (Much faster than average)",
      companies: ["Google", "Microsoft", "Netflix", "Uber"]
    },
    {
      title: "Software Engineer",
      match: 88,
      description: "Design and develop software applications and systems",
      requiredSkills: ["JavaScript", "React", "Node.js", "Git", "Problem Solving"],
      salaryRange: "$75,000 - $140,000",
      growth: "13% (Faster than average)",
      companies: ["Meta", "Apple", "Amazon", "Spotify"]
    },
    {
      title: "UX Designer",
      match: 85,
      description: "Create intuitive and engaging user experiences for digital products",
      requiredSkills: ["Figma", "User Research", "Prototyping", "Design Thinking", "Usability Testing"],
      salaryRange: "$65,000 - $120,000",
      growth: "8% (As fast as average)",
      companies: ["Adobe", "Airbnb", "Salesforce", "Dropbox"]
    }
  ];
}

function generateMockSkillGaps(assessmentData: any) {
  return [
    { skill: "Python", current: 60, required: 90, category: "Programming" },
    { skill: "Machine Learning", current: 40, required: 85, category: "Technical" },
    { skill: "Statistics", current: 70, required: 80, category: "Analytics" },
    { skill: "SQL", current: 50, required: 75, category: "Database" },
    { skill: "Data Visualization", current: 65, required: 80, category: "Analytics" },
    { skill: "Communication", current: 80, required: 85, category: "Soft Skills" },
    { skill: "Problem Solving", current: 85, required: 90, category: "Soft Skills" }
  ];
}

const mockCareerPath = {
  title: "Data Scientist",
  stages: [
    {
      level: "Junior Data Analyst",
      duration: "0-2 years",
      skills: ["Excel", "SQL", "Basic Statistics"],
      responsibilities: ["Data cleaning", "Basic reporting", "Dashboard creation"]
    },
    {
      level: "Data Analyst",
      duration: "2-4 years", 
      skills: ["Python/R", "Advanced SQL", "Data Visualization"],
      responsibilities: ["Complex analysis", "Predictive modeling", "Business insights"]
    },
    {
      level: "Senior Data Scientist",
      duration: "4-7 years",
      skills: ["Machine Learning", "Deep Learning", "MLOps"],
      responsibilities: ["Model development", "ML pipeline design", "Team mentoring"]
    },
    {
      level: "Principal Data Scientist",
      duration: "7+ years",
      skills: ["Leadership", "Strategy", "Architecture"],
      responsibilities: ["Technical leadership", "Strategic planning", "Cross-team collaboration"]
    }
  ]
};