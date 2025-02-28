"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  ChevronDown,
  Menu,
  X,
  AlertCircle,
  CheckCircle2,
  Star,
  Filter,
  Building2,
  Clock,
  BookOpen,
  Users,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from "@/components/ui/alert";
import { DarkModeToggle } from "./dark-mode-toggle";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// Add a Job type definition
type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  postedDate: string;
  requiredSkills: string[];
  description: string;
  perks: string[];
  companySize: string;
  industry: string;
};

// Define a User type
type User = {
  name: string;
  email: string;
  avatar: string;
  skills: string[];
};

// Define a mock user for login
const mockUser: User = {
  name: "Williams Folorunso",
  email: "williamsfolorunso07@gmail.com",
  avatar: "WF",
  skills: ["React", "JavaScript", "HTML5", "CSS/Tailwind", "TypeScript"]
};

export default function JobListingsDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for demo
  
  // Move user skills to the component so it can change based on login state
  const [userSkills, setUserSkills] = useState<string[]>(mockUser.skills);
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showSkillAlert, setShowSkillAlert] = useState(false);
  const [filterLocation, setFilterLocation] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [recentlyQualifiedJobs, setRecentlyQualifiedJobs] = useState<number[]>([]);

  // Toggle login/logout function
  const toggleLogin = () => {
    if (isLoggedIn) {
      // Clear applied jobs when logging out
      setAppliedJobs([]);
      setUserSkills([]);
    } else {
      // Restore user skills on login
      setUserSkills(mockUser.skills);
    }
    setIsLoggedIn(!isLoggedIn);
  };

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // In a real app, replace this with your actual API endpoint
        // For now, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample job data - in a real app, this would come from the API
        const sampleJobs = [
          {
            id: 0,
            title: "Junior Frontend Developer",
            company: "Perfect Match Technologies",
            location: "Remote (Worldwide)",
            salaryRange: "$90,000 - $120,000",
            matchScore: 100,
            postedDate: "Just now",
            requiredSkills: ["React", "JavaScript", "HTML5", "CSS/Tailwind", "TypeScript"],
            description: "We're seeking a Junior Frontend Developer with exactly your skillset! This role focuses on building modern React applications using TypeScript. You'll be working with our design team to implement responsive UIs using HTML5 and CSS/Tailwind.",
            perks: ["100% Remote", "Flexible Hours", "Professional Development Budget", "Health Insurance", "Annual Team Retreats"],
            companySize: "25-100 employees",
            industry: "Web Development"
          },
          {
            id: 1,
            title: "Frontend Developer",
            company: "TechForward Inc.",
            location: "San Francisco, CA (Remote)",
            salaryRange: "$110,000 - $140,000",
            matchScore: 92,
            postedDate: "2 days ago",
            requiredSkills: ["React", "TypeScript", "CSS/Tailwind", "HTML5", "REST API Integration"],
            description: "We're looking for a talented Frontend Developer to join our product team. You'll be responsible for building user interfaces for our SaaS platform, implementing designs, and creating responsive web applications that deliver exceptional user experiences.",
            perks: ["Health Insurance", "401(k) Matching", "Flexible Schedule", "Professional Development Budget"],
            companySize: "50-250 employees",
            industry: "Software Development"
          },
          {
            id: 2,
            title: "Full Stack Engineer",
            company: "Innovatech Solutions",
            location: "New York, NY (Hybrid)",
            salaryRange: "$120,000 - $150,000",
            matchScore: 84,
            postedDate: "1 week ago",
            requiredSkills: ["JavaScript", "Node.js", "React", "MongoDB", "Express", "Git"],
            description: "Join our engineering team to develop and maintain full-stack applications. You'll work on both frontend and backend components, collaborating with product managers and designers to create intuitive, scalable solutions for our clients.",
            perks: ["Unlimited PTO", "Health Benefits", "Remote Work Options", "Stock Options"],
            companySize: "100-500 employees",
            industry: "Technology Consulting"
          },
          {
            id: 3,
            title: "UX/UI Designer",
            company: "DesignMasters Co.",
            location: "Austin, TX (On-site)",
            salaryRange: "$95,000 - $120,000",
            matchScore: 76,
            postedDate: "3 days ago",
            requiredSkills: ["Figma", "User Research", "Prototyping", "Visual Design", "Design Systems"],
            description: "As our UX/UI Designer, you'll lead the design process for our products, creating wireframes, prototypes, and high-fidelity designs. You'll work closely with developers to ensure design implementation meets specifications.",
            perks: ["Creative Studio", "Design Workshops", "Conference Budget", "Flexible Hours"],
            companySize: "25-100 employees",
            industry: "Creative Agency"
          },
          {
            id: 4,
            title: "DevOps Engineer",
            company: "CloudScale Technologies",
            location: "Chicago, IL (Remote)",
            salaryRange: "$130,000 - $160,000",
            matchScore: 67,
            postedDate: "1 day ago",
            requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Linux"],
            description: "We're seeking a DevOps Engineer to optimize our cloud infrastructure and deployment processes. You'll implement automation, manage our CI/CD pipelines, and ensure system reliability and security.",
            perks: ["Remote-First Culture", "Learning Stipend", "Home Office Budget", "Weekly Team Events"],
            companySize: "50-250 employees",
            industry: "Cloud Services"
          },
          {
            id: 5,
            title: "Backend Developer",
            company: "DataFlex Systems",
            location: "Seattle, WA (Hybrid)",
            salaryRange: "$115,000 - $145,000",
            matchScore: 45,
            postedDate: "5 days ago",
            requiredSkills: ["Java", "Spring Boot", "PostgreSQL", "RESTful APIs", "Microservices"],
            description: "Join our backend team to design and implement scalable APIs and services. You'll work on high-performance applications, optimize database queries, and collaborate with frontend developers to integrate user interfaces.",
            perks: ["Health and Dental", "Parental Leave", "Education Reimbursement", "Gym Membership"],
            companySize: "250-1000 employees",
            industry: "Enterprise Software"
          }
        ];
        
        setJobs(sampleJobs);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowSkillAlert(false);
  };

  const handleApplyNow = () => {
    if (selectedJob) {
      const missingSkills = selectedJob.requiredSkills.filter(skill => !userSkills.includes(skill));
      if (missingSkills.length > 0) {
        setShowSkillAlert(true);
      } else {
        setAppliedJobs(prev => [...prev, selectedJob.id]);
        alert("Your application has been submitted successfully!");
      }
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score === 100) return "bg-blue-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColorClass = (score: number) => {
    if (score === 100) return "text-blue-500";
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const filteredJobs = filterLocation === "all" 
    ? jobs 
    : jobs.filter(job => job.location.toLowerCase().includes(filterLocation.toLowerCase()));

  const handleApplyForJob = (job: Job) => {
    setSelectedJob(job);
    const missingSkills = job.requiredSkills.filter(skill => !userSkills.includes(skill));
    if (missingSkills.length > 0) {
      openJobDetails(job);
      setShowSkillAlert(true);
    } else {
      setAppliedJobs(prev => [...prev, job.id]);
      alert("Your application has been submitted successfully!");
    }
  };

  // Add a function to calculate match score based on skills
  const calculateMatchScore = (userSkills: string[], requiredSkills: string[]): number => {
    if (requiredSkills.length === 0) return 100;
    
    let matchedSkills = 0;
    requiredSkills.forEach(skill => {
      if (userSkills.includes(skill)) {
        matchedSkills++;
      }
    });
    
    return Math.round((matchedSkills / requiredSkills.length) * 100);
  };

  // Add a function to update job match scores
  const updateJobMatchScores = () => {
    const updatedJobs = jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(userSkills, job.requiredSkills)
    }));
    
    setJobs(updatedJobs);
  };

  // Call this function when skills change
  useEffect(() => {
    if (jobs.length > 0) {
      // Find jobs that were previously unqualified but are now qualified
      const newlyQualifiedJobs = jobs.filter(job => {
        const wasQualified = calculateMatchScore(
          userSkills.filter(s => s !== newSkill.trim()), 
          job.requiredSkills
        ) < 100;
        
        const isQualified = calculateMatchScore(userSkills, job.requiredSkills) === 100;
        
        return !wasQualified && isQualified;
      }).map(job => job.id);
      
      setRecentlyQualifiedJobs(newlyQualifiedJobs);
      
      // Clear the recently qualified status after 3 seconds
      if (newlyQualifiedJobs.length > 0) {
        setTimeout(() => {
          setRecentlyQualifiedJobs([]);
        }, 3000);
      }
      
      updateJobMatchScores();
    }
  }, [userSkills]);

  // Update the handleAddSkill function to refresh match scores
  const handleAddSkill = () => {
    if (newSkill.trim() && !userSkills.includes(newSkill.trim())) {
      const updatedSkills = [...userSkills, newSkill.trim()];
      setUserSkills(updatedSkills);
      setNewSkill("");
    }
  };

  const calculateSuggestedSkills = useEffect(() => {
    // Find all unique required skills from jobs that aren't in the user's skills
    const missingSkills = new Set<string>();
    jobs.forEach(job => {
      job.requiredSkills.forEach(skill => {
        if (!userSkills.includes(skill)) {
          missingSkills.add(skill);
        }
      });
    });
    setSuggestedSkills(Array.from(missingSkills));
  }, [jobs, userSkills]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="font-bold text-lg md:text-xl">Job Match Dashboard</h1>
          </div>
          
          {/* Desktop controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Select defaultValue="all" onValueChange={setFilterLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote Only</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="on-site">On-site</SelectItem>
              </SelectContent>
            </Select>
            
            {/* User profile/login button */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        {mockUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{mockUser.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{mockUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={toggleLogin}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={toggleLogin} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Log in</span>
              </Button>
            )}
            
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Add mobile login/user button */}
            {isLoggedIn ? (
              <Avatar className="h-8 w-8" onClick={() => {
                // For simplicity, just log out on mobile when tapping the avatar
                toggleLogin();
              }}>
                <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                  {mockUser.avatar}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Button variant="ghost" size="sm" onClick={toggleLogin}>
                <User className="h-4 w-4" />
              </Button>
            )}
            
            <DarkModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 
                <X className="h-5 w-5" /> : 
                <Menu className="h-5 w-5" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top">
            <div className="container mx-auto p-4 space-y-3">
              <div className="font-medium text-sm text-gray-500 dark:text-gray-400">Filter by location</div>
              <Select defaultValue="all" onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="on-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Dashboard heading */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {isLoggedIn ? 'Your Job Recommendations' : 'Job Listings'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isLoggedIn 
              ? 'Personalized job matches based on your skills and preferences' 
              : 'Log in to see personalized job recommendations'}
          </p>
        </div>

        {/* Your Skills section - only show when logged in */}
        {isLoggedIn && (
          <Card className="mb-6">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Your Skills</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAddingSkill(true)}
              >
                Manage Skills
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userSkills.length > 0 ? (
                  userSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No skills added yet. Add skills to improve your job matches.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Login prompt if not logged in */}
        {!isLoggedIn && (
          <Card className="mb-6 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Get Personalized Job Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Log in to see job recommendations tailored to your skills and preferences.
              </p>
              <Button onClick={toggleLogin} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Log in</span>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading job listings...</p>
          </div>
        ) : (
          /* Job Listings */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`overflow-hidden hover:shadow-md transition-shadow border ${
                    recentlyQualifiedJobs.includes(job.id)
                      ? "border-green-400 dark:border-green-600 shadow-lg animate-pulse"
                      : job.matchScore === 100 
                        ? "border-blue-300 dark:border-blue-700 shadow-md"
                        : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {job.title}
                          {appliedJobs.includes(job.id) && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Applied
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building2 className="h-4 w-4 mr-1" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={`${getScoreTextColorClass(job.matchScore)} bg-opacity-15 px-3 py-1 font-semibold`}
                      >
                        {job.matchScore}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{job.salaryRange}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                      
                      {/* Match Score Visualization */}
                      <div className="pt-1">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Match Score</span>
                          <span className={`font-medium ${getScoreTextColorClass(job.matchScore)}`}>
                            {job.matchScore}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreColorClass(job.matchScore)} rounded-full`} 
                            style={{ width: `${job.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4 pb-4">
                    <Button 
                      variant={appliedJobs.includes(job.id) ? "secondary" : "outline"}
                      onClick={() => isLoggedIn ? handleApplyForJob(job) : toggleLogin()}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {!isLoggedIn 
                        ? "Log in to Apply" 
                        : appliedJobs.includes(job.id) 
                          ? "Applied" 
                          : "Apply Now"}
                    </Button>
                    <Button onClick={() => openJobDetails(job)}>View Details</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No job listings found matching your filters.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Job Match Dashboard. All job listings are for demonstration purposes only.</p>
        </div>
      </footer>

      {/* Job Details Modal */}
      {selectedJob && (
        <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                  {/* Company info outside DialogDescription to avoid nesting div in p */}
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-base mt-1">
                    <Building2 className="h-4 w-4 mr-1 inline" />
                    {selectedJob.company}
                  </div>
                </div>
                <Badge 
                  className={`${getScoreTextColorClass(selectedJob.matchScore)} bg-opacity-15 px-3 py-1 font-semibold`}
                >
                  {selectedJob.matchScore}% Match
                </Badge>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 my-2">
              {/* Basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{selectedJob.salaryRange}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Posted {selectedJob.postedDate}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{selectedJob.companySize}</span>
                </div>
              </div>
              
              {/* Job description */}
              <div>
                <h3 className="text-lg font-medium mb-2">Job Description</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedJob.description}
                </p>
              </div>
              
              {/* Required Skills section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((skill, index) => {
                    const hasSkill = userSkills.includes(skill);
                    return (
                      <div 
                        key={index}
                        className={`flex items-center px-3 py-2 rounded-md ${
                          hasSkill 
                            ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {hasSkill ? (
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                        ) : (
                          <BookOpen className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                        )}
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Company perks */}
              <div>
                <h3 className="text-lg font-medium mb-3">Company Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.perks.map((perk, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-2 rounded-md"
                    >
                      <Star className="h-4 w-4 mr-2 text-blue-500" />
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skill match alert */}
              {showSkillAlert && (
                <Alert variant="destructive" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">Missing Required Skills</AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    <p>You're missing some required skills for this position:</p>
                    <ul className="list-disc list-inside mt-2">
                      {selectedJob.requiredSkills
                        .filter(skill => !userSkills.includes(skill))
                        .map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    <p className="mt-2">Consider upskilling in these areas to improve your match.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            <DialogFooter className="mt-6 gap-2">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button 
                onClick={isLoggedIn ? handleApplyNow : toggleLogin}
                disabled={isLoggedIn && selectedJob ? appliedJobs.includes(selectedJob.id) : false}
              >
                {!isLoggedIn 
                  ? "Log in to Apply" 
                  : selectedJob && appliedJobs.includes(selectedJob.id) 
                    ? "Applied" 
                    : "Apply Now"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Skill Management Dialog */}
      <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Your Skills</DialogTitle>
            <DialogDescription>
              Add new skills to improve your job match scores and qualify for more positions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter a new skill..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button onClick={handleAddSkill} type="submit">Add</Button>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Your Current Skills</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {userSkills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-3 py-1 flex items-center gap-1"
                >
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => {
                      const updatedSkills = userSkills.filter(s => s !== skill);
                      setUserSkills(updatedSkills);
                    }}
                  />
                </Badge>
              ))}
            </div>
            
            {suggestedSkills.length > 0 && (
              <>
                <h4 className="text-sm font-medium mb-2 mt-4">Suggested Skills for Job Matches</h4>
                <p className="text-xs text-gray-500 mb-2">
                  Adding these skills could help you qualify for more jobs
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-3 py-1 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => setNewSkill(skill)}
                    >
                      + {skill}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}