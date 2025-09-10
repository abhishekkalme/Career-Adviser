import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BookOpen, 
  Play, 
  Award, 
  Clock, 
  Star, 
  Users, 
  ExternalLink,
  Filter,
  Search,
  TrendingUp,
  CheckCircle,
  Globe,
  Video
} from 'lucide-react';

interface LearningResourcesProps {
  skillGaps: any[];
  recommendations: any[];
}

interface Course {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'bootcamp' | 'certification' | 'tutorial';
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  price: 'free' | 'paid' | 'freemium';
  description: string;
  url: string;
  features: string[];
  priority: 'high' | 'medium' | 'low';
}

export function LearningResources({ skillGaps, recommendations }: LearningResourcesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock learning resources data
  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Python for Data Science and Machine Learning Bootcamp',
      provider: 'Udemy',
      type: 'course',
      skill: 'Python',
      level: 'beginner',
      duration: '25 hours',
      rating: 4.6,
      students: 450000,
      price: 'paid',
      description: 'Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!',
      url: '#',
      features: ['Hands-on projects', 'Certificate', 'Lifetime access', 'Q&A support'],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Machine Learning Course by Andrew Ng',
      provider: 'Coursera',
      type: 'course',
      skill: 'Machine Learning',
      level: 'intermediate',
      duration: '11 weeks',
      rating: 4.9,
      students: 4800000,
      price: 'freemium',
      description: 'Learn machine learning algorithms, theory, and implementation from Stanford University.',
      url: '#',
      features: ['University-level content', 'Practical assignments', 'Peer interaction', 'Certificate'],
      priority: 'high'
    },
    {
      id: '3',
      title: 'SQL for Data Science',
      provider: 'Coursera',
      type: 'course',
      skill: 'SQL',
      level: 'beginner',
      duration: '4 weeks',
      rating: 4.5,
      students: 250000,
      price: 'freemium',
      description: 'Learn SQL basics and advanced queries for data analysis and data science.',
      url: '#',
      features: ['Hands-on practice', 'Real datasets', 'Certificate', 'Flexible schedule'],
      priority: 'high'
    },
    {
      id: '4',
      title: 'Data Visualization with Python',
      provider: 'edX',
      type: 'course',
      skill: 'Data Visualization',
      level: 'intermediate',
      duration: '6 weeks',
      rating: 4.4,
      students: 180000,
      price: 'freemium',
      description: 'Master data visualization using matplotlib, seaborn, and plotly.',
      url: '#',
      features: ['Interactive plots', 'Portfolio projects', 'Industry examples', 'Certificate'],
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Statistics for Data Science',
      provider: 'Khan Academy',
      type: 'course',
      skill: 'Statistics',
      level: 'beginner',
      duration: '20 hours',
      rating: 4.7,
      students: 520000,
      price: 'free',
      description: 'Learn fundamental statistics concepts essential for data science.',
      url: '#',
      features: ['Interactive exercises', 'Progress tracking', 'Mobile friendly', 'Free forever'],
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Effective Communication in Tech',
      provider: 'LinkedIn Learning',
      type: 'course',
      skill: 'Communication',
      level: 'beginner',
      duration: '3 hours',
      rating: 4.3,
      students: 95000,
      price: 'paid',
      description: 'Develop communication skills for technical professionals.',
      url: '#',
      features: ['Professional insights', 'Real-world scenarios', 'Certificate', 'Mobile access'],
      priority: 'low'
    },
    {
      id: '7',
      title: 'Fast.ai Deep Learning Course',
      provider: 'Fast.ai',
      type: 'course',
      skill: 'Machine Learning',
      level: 'advanced',
      duration: '7 weeks',
      rating: 4.8,
      students: 150000,
      price: 'free',
      description: 'Practical deep learning for coders - state-of-the-art results with minimal code.',
      url: '#',
      features: ['Cutting-edge techniques', 'Practical approach', 'Community support', 'Free'],
      priority: 'medium'
    },
    {
      id: '8',
      title: 'Google Data Analytics Certificate',
      provider: 'Coursera',
      type: 'certification',
      skill: 'Data Visualization',
      level: 'beginner',
      duration: '6 months',
      rating: 4.6,
      students: 320000,
      price: 'paid',
      description: 'Professional certificate program from Google covering data analytics fundamentals.',
      url: '#',
      features: ['Google credential', 'Job placement support', 'Hands-on projects', 'Industry recognition'],
      priority: 'high'
    }
  ];

  // Indian specific resources
  const indianResources = [
    {
      id: 'in1',
      title: 'NPTEL Data Science Course',
      provider: 'NPTEL',
      type: 'course',
      skill: 'Python',
      level: 'intermediate',
      duration: '12 weeks',
      rating: 4.4,
      students: 45000,
      price: 'free',
      description: 'Comprehensive data science course by IIT professors.',
      url: '#',
      features: ['IIT quality', 'Hindi/English', 'Certificate', 'Government recognized'],
      priority: 'high'
    },
    {
      id: 'in2',
      title: 'SWAYAM AI/ML Course',
      provider: 'SWAYAM',
      type: 'course',
      skill: 'Machine Learning',
      level: 'intermediate',
      duration: '16 weeks',
      rating: 4.5,
      students: 35000,
      price: 'free',
      description: 'Government initiative for AI and Machine Learning education.',
      url: '#',
      features: ['Government platform', 'Regional languages', 'Free certification', 'Industry aligned'],
      priority: 'high'
    },
    {
      id: 'in3',
      title: 'Skill India Digital Platform',
      provider: 'Skill India',
      type: 'certification',
      skill: 'Communication',
      level: 'beginner',
      duration: '40 hours',
      rating: 4.2,
      students: 125000,
      price: 'free',
      description: 'Develop workplace communication and soft skills.',
      url: '#',
      features: ['Government certified', 'Job linkage', 'Free training', 'Multiple languages'],
      priority: 'medium'
    }
  ];

  const allResources = [...allCourses, ...indianResources];

  // Filter courses based on skill gaps
  const prioritySkills = skillGaps
    .filter(gap => (gap.required - gap.current) >= 15)
    .map(gap => gap.skill);

  const filteredCourses = allResources.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill === 'all' || course.skill === filterSkill;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesType = filterType === 'all' || course.type === filterType;
    
    return matchesSearch && matchesSkill && matchesLevel && matchesType;
  });

  const recommendedCourses = filteredCourses.filter(course => 
    prioritySkills.includes(course.skill) || course.priority === 'high'
  );

  const learningPath = {
    totalDuration: '6-8 months',
    phases: [
      {
        title: 'Foundation Phase',
        duration: '2-3 months',
        courses: allResources.filter(c => c.skill === 'Python' || c.skill === 'Statistics').slice(0, 2)
      },
      {
        title: 'Core Skills Phase', 
        duration: '3-4 months',
        courses: allResources.filter(c => c.skill === 'Machine Learning' || c.skill === 'SQL').slice(0, 2)
      },
      {
        title: 'Specialization Phase',
        duration: '1-2 months',
        courses: allResources.filter(c => c.skill === 'Data Visualization').slice(0, 1)
      }
    ]
  };

  const formatStudents = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            <CardDescription className="mt-1">
              {course.provider} • {course.type}
            </CardDescription>
          </div>
          <Badge variant={course.priority === 'high' ? 'default' : course.priority === 'medium' ? 'secondary' : 'outline'}>
            {course.priority === 'high' ? 'Recommended' : course.priority === 'medium' ? 'Useful' : 'Optional'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{course.rating} ({formatStudents(course.students)})</span>
          </div>
          <div className="flex items-center space-x-2">
            {course.price === 'free' ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">Free</Badge>
            ) : course.price === 'freemium' ? (
              <Badge variant="outline" className="text-xs">Freemium</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">Paid</Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Features:</p>
          <div className="flex flex-wrap gap-1">
            {course.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {course.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn More
          </Button>
          <Button size="sm">
            Start Course
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Learning Resources</span>
          </CardTitle>
          <CardDescription>
            Curated courses and resources based on your skill gaps and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search courses, skills, providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterSkill} onValueChange={setFilterSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {Array.from(new Set(allResources.map(c => c.skill))).map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="bootcamp">Bootcamp</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="path">Learning Path</TabsTrigger>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="indian">Indian Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedCourses.length > 0 ? (
              recommendedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recommended courses found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="path" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Learning Path</CardTitle>
              <CardDescription>
                Structured curriculum based on your career goals and skill gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Data Science Career Path</h3>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {learningPath.totalDuration}
                  </Badge>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">0% Complete</p>
              </div>

              <div className="space-y-6">
                {learningPath.phases.map((phase, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{phase.title}</h4>
                      <Badge variant="secondary">{phase.duration}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {phase.courses.map(course => (
                        <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              {course.type === 'course' ? <Play className="h-4 w-4 text-blue-600" /> :
                               course.type === 'certification' ? <Award className="h-4 w-4 text-blue-600" /> :
                               <BookOpen className="h-4 w-4 text-blue-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{course.title}</p>
                              <p className="text-xs text-gray-600">{course.provider} • {course.duration}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="indian" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-orange-600" />
                <span>Indian Learning Platforms</span>
              </CardTitle>
              <CardDescription>
                Government and Indian educational platforms for affordable, quality learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {indianResources.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits of Indian Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Free or very affordable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Government recognized certificates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Available in regional languages</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Job placement assistance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Industry-aligned curriculum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Quality education from IITs/IIMs</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}