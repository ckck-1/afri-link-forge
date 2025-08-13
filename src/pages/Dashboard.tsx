import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { 
  DollarSign, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  MessageCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/ui/job-card';
import { mockJobs, mockTransactions } from '@/data/mockData';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isFreelancer = user?.role === 'freelancer';

  const stats = isFreelancer 
    ? [
        { icon: DollarSign, label: 'Total Earnings', value: '$12,450', color: 'text-success' },
        { icon: Briefcase, label: 'Active Projects', value: '3', color: 'text-primary' },
        { icon: TrendingUp, label: 'Success Rate', value: '98%', color: 'text-warning' },
        { icon: Users, label: 'Happy Clients', value: '24', color: 'text-blue-500' }
      ]
    : [
        { icon: Briefcase, label: 'Posted Jobs', value: '8', color: 'text-primary' },
        { icon: Users, label: 'Active Freelancers', value: '5', color: 'text-blue-500' },
        { icon: DollarSign, label: 'Total Spent', value: '$8,750', color: 'text-success' },
        { icon: Clock, label: 'Avg. Completion', value: '12 days', color: 'text-warning' }
      ];

  const recentJobs = mockJobs.slice(0, 3);
  const recentTransactions = mockTransactions.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          {isFreelancer 
            ? "Here's your freelance activity overview"
            : "Manage your projects and find the best talent"
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-smooth bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Jobs Section */}
          <Card className="bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">
                {isFreelancer ? 'Recommended Jobs' : 'Recent Job Posts'}
              </CardTitle>
              <Link to="/jobs">
                <Button variant="outline" size="sm">
                  {isFreelancer ? 'Browse All' : 'Manage Jobs'}
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} showApplyButton={isFreelancer} />
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {isFreelancer ? (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Find Jobs
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </Link>
                  <Link to="/payments">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="mr-2 h-4 w-4" />
                      View Earnings
                    </Button>
                  </Link>
                  <Link to="/chat">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button className="bg-gradient-hero justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Post a New Job
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/jobs">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        Manage Jobs
                      </Button>
                    </Link>
                    <Link to="/chat">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Messages
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.amount > 0 ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Link to="/payments">
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Transactions
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          {isFreelancer && (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion</span>
                    <span className="text-sm font-medium text-foreground">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-hero h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      Profile photo added
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      Skills listed
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                      Add portfolio items
                    </div>
                  </div>
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="w-full">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;