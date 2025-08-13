import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Search, Filter, MapPin, DollarSign, Plus, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from '@/components/ui/job-card';
import { mockJobs } from '@/data/mockData';

const Jobs = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isFreelancer = user?.role === 'freelancer';

  // Extract unique skills for filter
  const allSkills = Array.from(new Set(mockJobs.flatMap(job => job.skills)));

  // Filter jobs based on search criteria
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !selectedSkill || job.skills.includes(selectedSkill);
    const matchesExperience = !experienceLevel || job.experienceLevel === experienceLevel;
    
    let matchesBudget = true;
    if (budgetRange) {
      const budget = job.budget;
      switch (budgetRange) {
        case 'under-1000':
          matchesBudget = budget < 1000;
          break;
        case '1000-5000':
          matchesBudget = budget >= 1000 && budget <= 5000;
          break;
        case 'over-5000':
          matchesBudget = budget > 5000;
          break;
      }
    }

    return matchesSearch && matchesSkill && matchesExperience && matchesBudget;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isFreelancer ? 'Find Jobs' : 'Manage Jobs'}
          </h1>
          <p className="text-muted-foreground">
            {isFreelancer 
              ? 'Discover opportunities that match your skills'
              : 'Manage your job posts and applications'
            }
          </p>
        </div>
        {!isFreelancer && (
          <Button className="bg-gradient-hero mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Search Jobs
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Skills
                </label>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any skill</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Budget Range
                </label>
                <Select value={budgetRange} onValueChange={setBudgetRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any budget</SelectItem>
                    <SelectItem value="under-1000">Under $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="over-5000">Over $5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Experience Level
                </label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any level</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSkill('');
                  setBudgetRange('');
                  setExperienceLevel('');
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
              {(searchTerm || selectedSkill || budgetRange || experienceLevel) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Search: {searchTerm}
                    </Badge>
                  )}
                  {selectedSkill && (
                    <Badge variant="secondary" className="text-xs">
                      Skill: {selectedSkill}
                    </Badge>
                  )}
                  {budgetRange && (
                    <Badge variant="secondary" className="text-xs">
                      Budget: {budgetRange.replace('-', ' - $')}
                    </Badge>
                  )}
                  {experienceLevel && (
                    <Badge variant="secondary" className="text-xs">
                      Level: {experienceLevel}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-high">Highest Budget</SelectItem>
                <SelectItem value="budget-low">Lowest Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} showApplyButton={isFreelancer} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 bg-gradient-card">
              <CardContent>
                <div className="text-muted-foreground mb-4">
                  <Briefcase className="mx-auto h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                  <p>Try adjusting your search criteria or check back later for new opportunities.</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkill('');
                    setBudgetRange('');
                    setExperienceLevel('');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;