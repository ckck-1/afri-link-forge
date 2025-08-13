import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  ArrowLeft,
  Send,
  Heart,
  Share2,
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { mockJobs } from '@/data/mockData';

const JobDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [proposalText, setProposalText] = useState('');
  const [proposalBudget, setProposalBudget] = useState('');
  const [proposalDuration, setProposalDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const job = mockJobs.find(j => j.id === id);
  if (!job) {
    return <Navigate to="/jobs" replace />;
  }

  const isFreelancer = user?.role === 'freelancer';

  const handleSubmitProposal = async () => {
    if (!proposalText.trim() || !proposalBudget.trim() || !proposalDuration.trim()) {
      toast({
        title: 'Please fill in all fields',
        description: 'Cover letter, budget, and duration are required.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Proposal submitted successfully!',
        description: 'The client will review your proposal and get back to you.',
      });
      setProposalText('');
      setProposalBudget('');
      setProposalDuration('');
      setIsSubmitting(false);
    }, 1000);
  };

  const formatBudget = (amount: number, type: 'fixed' | 'hourly') => {
    return type === 'fixed' 
      ? `$${amount.toLocaleString()}` 
      : `$${amount}/hr`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/jobs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-smooth">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Posted {job.postedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.client.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{job.proposals} proposals</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Job Details */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed">{job.description}</p>
              </div>

              <Separator />

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Budget</h4>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="text-lg font-semibold text-success">
                      {formatBudget(job.budget, job.budgetType)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {job.budgetType} price
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Duration</h4>
                  <p className="text-lg font-semibold text-foreground">{job.duration}</p>
                  <p className="text-sm text-muted-foreground">Estimated timeline</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Experience Level</h4>
                  <Badge className="capitalize">
                    {job.experienceLevel}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-foreground mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Section for Freelancers */}
          {isFreelancer && (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Submit Your Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="proposal">Cover Letter</Label>
                  <Textarea
                    id="proposal"
                    placeholder="Describe why you're the perfect fit for this project..."
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Your Budget ({job.budgetType})</Label>
                    <Input
                      id="budget"
                      placeholder={job.budgetType === 'fixed' ? '$5,000' : '$50/hr'}
                      value={proposalBudget}
                      onChange={(e) => setProposalBudget(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Delivery Time</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 2 weeks"
                      value={proposalDuration}
                      onChange={(e) => setProposalDuration(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-hero"
                  onClick={handleSubmitProposal}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-hero text-white font-medium">
                    {job.client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">{job.client.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span>{job.client.rating}</span>
                    <span>({job.client.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">{job.client.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="text-foreground">Jan 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total spent</span>
                  <span className="text-foreground">$25,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hire rate</span>
                  <span className="text-foreground">85%</span>
                </div>
              </div>

              {!isFreelancer && (
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Contact Client
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockJobs.slice(0, 3).filter(j => j.id !== job.id).map((similarJob) => (
                <div key={similarJob.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <Link to={`/jobs/${similarJob.id}`}>
                    <h5 className="font-medium text-foreground hover:text-primary transition-smooth line-clamp-2 mb-2">
                      {similarJob.title}
                    </h5>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-success">
                      {formatBudget(similarJob.budget, similarJob.budgetType)}
                    </span>
                    <span>•</span>
                    <span>{similarJob.proposals} proposals</span>
                  </div>
                </div>
              ))}
              <Link to="/jobs">
                <Button variant="ghost" size="sm" className="w-full">
                  View More Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;