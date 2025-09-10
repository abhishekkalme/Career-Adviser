import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Brain, Clock, Target, CheckCircle2 } from 'lucide-react';

interface AssessmentQuizProps {
  onComplete: (results: any) => void;
}

interface Question {
  id: string;
  category: 'cognitive' | 'personality' | 'interests' | 'aptitude';
  type: 'multiple-choice' | 'likert' | 'ranking';
  question: string;
  options: string[];
  weight: number;
}

const assessmentQuestions: Question[] = [
  // Cognitive Skills
  {
    id: 'cog1',
    category: 'cognitive',
    type: 'multiple-choice',
    question: 'You notice a pattern in data that others missed. What do you do first?',
    options: [
      'Investigate further to validate the pattern',
      'Share the finding with your team immediately',
      'Document it for future reference',
      'Test it with additional data sources'
    ],
    weight: 1
  },
  {
    id: 'cog2',
    category: 'cognitive',
    type: 'multiple-choice',
    question: 'When solving a complex problem, you prefer to:',
    options: [
      'Break it down into smaller, manageable parts',
      'Look for similar problems solved before',
      'Brainstorm multiple creative solutions',
      'Analyze all available data first'
    ],
    weight: 1
  },
  
  // Personality
  {
    id: 'per1',
    category: 'personality',
    type: 'likert',
    question: 'I enjoy working in team environments and collaborating with others',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1
  },
  {
    id: 'per2',
    category: 'personality',
    type: 'likert',
    question: 'I prefer to have a structured plan rather than being spontaneous',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1
  },
  {
    id: 'per3',
    category: 'personality',
    type: 'likert',
    question: 'I feel energized when presenting ideas to large groups',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1
  },
  
  // Interests
  {
    id: 'int1',
    category: 'interests',
    type: 'multiple-choice',
    question: 'Which type of project excites you most?',
    options: [
      'Building innovative technology solutions',
      'Analyzing market trends and consumer behavior',
      'Creating engaging visual designs',
      'Researching scientific phenomena'
    ],
    weight: 1
  },
  {
    id: 'int2',
    category: 'interests',
    type: 'likert',
    question: 'I enjoy working with numbers and statistical analysis',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1
  },
  {
    id: 'int3',
    category: 'interests',
    type: 'likert',
    question: 'I find satisfaction in helping others solve their problems',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1
  },
  
  // Aptitude
  {
    id: 'apt1',
    category: 'aptitude',
    type: 'multiple-choice',
    question: 'If 3x + 7 = 22, what is the value of x?',
    options: ['3', '5', '7', '9'],
    weight: 1
  },
  {
    id: 'apt2',
    category: 'aptitude',
    type: 'multiple-choice',
    question: 'Which word best completes the analogy: CAR is to ROAD as SHIP is to ___',
    options: ['Ocean', 'Harbor', 'Captain', 'Anchor'],
    weight: 1
  },
  {
    id: 'apt3',
    category: 'aptitude',
    type: 'multiple-choice',
    question: 'A project timeline shows 3 months for development and 1 month for testing. If development is 25% complete, how many weeks remain until project completion?',
    options: ['9 weeks', '11 weeks', '13 weeks', '15 weeks'],
    weight: 1
  }
];

export function AssessmentQuiz({ onComplete }: AssessmentQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    const results = calculateResults();
    setIsComplete(true);
    setTimeout(() => {
      onComplete(results);
    }, 2000);
  };

  const calculateResults = () => {
    // Mock scoring algorithm
    const scores = {
      cognitive: Math.floor(Math.random() * 30) + 70, // 70-100
      analytical: Math.floor(Math.random() * 25) + 75, // 75-100
      creative: Math.floor(Math.random() * 35) + 65, // 65-100
      interpersonal: Math.floor(Math.random() * 20) + 80, // 80-100
      technical: Math.floor(Math.random() * 40) + 60, // 60-100
    };

    const personality = {
      extroversion: Math.floor(Math.random() * 40) + 60,
      openness: Math.floor(Math.random() * 30) + 70,
      conscientiousness: Math.floor(Math.random() * 25) + 75,
      agreeableness: Math.floor(Math.random() * 35) + 65,
      neuroticism: Math.floor(Math.random() * 50) + 25
    };

    const interests = {
      technology: Math.floor(Math.random() * 30) + 70,
      business: Math.floor(Math.random() * 40) + 60,
      creative: Math.floor(Math.random() * 35) + 65,
      science: Math.floor(Math.random() * 45) + 55,
      social: Math.floor(Math.random() * 25) + 75
    };

    return {
      scores,
      personality,
      interests,
      timeSpent,
      answeredQuestions: Object.keys(answers).length,
      totalQuestions: assessmentQuestions.length,
      completionDate: new Date().toISOString()
    };
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const currentQ = assessmentQuestions[currentQuestion];
  const categoryColors = {
    cognitive: 'bg-blue-100 text-blue-800',
    personality: 'bg-purple-100 text-purple-800',
    interests: 'bg-green-100 text-green-800',
    aptitude: 'bg-orange-100 text-orange-800'
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="animate-bounce mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
          <p className="text-gray-600 mb-6">
            Processing your results and generating personalized career recommendations...
          </p>
          <div className="flex justify-center">
            <Progress value={100} className="w-64" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span>AI-Powered Career Assessment</span>
              </CardTitle>
              <CardDescription>
                Answer these questions to help us understand your strengths and interests
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{currentQuestion + 1} of {assessmentQuestions.length}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={categoryColors[currentQ.category]}>
              {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
            </Badge>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold leading-relaxed">
            {currentQ.question}
          </h3>

          <RadioGroup
            value={answers[currentQ.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
            >
              {currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['cognitive', 'personality', 'interests', 'aptitude'].map((category) => {
              const questionsInCategory = assessmentQuestions.filter(q => q.category === category);
              const answeredInCategory = questionsInCategory.filter(q => answers[q.id]).length;
              const progressInCategory = (answeredInCategory / questionsInCategory.length) * 100;
              
              return (
                <div key={category} className="text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${categoryColors[category as keyof typeof categoryColors]}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  <Progress value={progressInCategory} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {answeredInCategory}/{questionsInCategory.length}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}