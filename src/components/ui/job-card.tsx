import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Star, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  skills: string[];
  client: {
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
  };
  postedAt: string;
  proposals: number;
  duration: string;
  experienceLevel: 'entry' | 'intermediate' | 'expert';
}

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showApplyButton = true }) => {
  const formatBudget = (amount: number, type: 'fixed' | 'hourly') => {
    return type === 'fixed' 
      ? `$${amount.toLocaleString()}` 
      : `$${amount}/hr`;
  };

  const getExperienceBadgeVariant = (level: string) => {
    switch (level) {
      case 'entry': return 'secondary';
      case 'intermediate': return 'outline';
      case 'expert': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Card className="hover:shadow-medium transition-smooth cursor-pointer border-border bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <Link to={`/jobs/${job.id}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-smooth line-clamp-2">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {formatBudget(job.budget, job.budgetType)}
                </span>
              </div>
              <Badge variant={getExperienceBadgeVariant(job.experienceLevel)} className="text-xs">
                {job.experienceLevel}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {job.client.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{job.client.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span>{job.client.rating}</span>
                  <span>({job.client.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.client.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Stats */}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{job.proposals} proposals</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{job.postedAt}</span>
            </div>
          </div>
          
          {showApplyButton && (
            <Link to={`/jobs/${job.id}`}>
              <Button size="sm" variant="outline" className="text-xs">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;