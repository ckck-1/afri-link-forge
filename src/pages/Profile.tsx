import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Star, 
  Briefcase, 
  Edit3, 
  Plus,
  Camera,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: user?.skills?.join(', ') || ''
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isFreelancer = user?.role === 'freelancer';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      skills: skillsArray
    });

    setIsEditing(false);
    toast({
      title: 'Profile updated successfully!',
      description: 'Your changes have been saved.',
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      skills: user?.skills?.join(', ') || ''
    });
    setIsEditing(false);
  };

  // Mock portfolio items and work history
  const portfolioItems = [
    {
      id: '1',
      title: 'E-commerce Website Design',
      description: 'Modern responsive design for African fashion brand',
      image: '/placeholder.svg',
      technologies: ['React', 'Tailwind CSS', 'Node.js']
    },
    {
      id: '2', 
      title: 'Mobile Banking App',
      description: 'UI/UX design for rural banking solution',
      image: '/placeholder.svg',
      technologies: ['Figma', 'UI/UX', 'Mobile Design']
    }
  ];

  const workHistory = [
    {
      id: '1',
      title: 'Full-Stack Developer',
      client: 'Tech Startup Lagos',
      duration: '6 months',
      rating: 5.0,
      feedback: 'Excellent work! Delivered on time and exceeded expectations.'
    },
    {
      id: '2',
      title: 'WordPress Website',
      client: 'Local NGO',
      duration: '2 months', 
      rating: 4.8,
      feedback: 'Great communication and professional results.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarFallback className="bg-gradient-hero text-white text-2xl font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-primary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    {isFreelancer && (
                      <div>
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="React, Node.js, UI/UX Design"
                          className="mt-1"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="bg-gradient-hero">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                          {user?.name}
                        </h1>
                        <p className="text-muted-foreground mb-4 capitalize">
                          {user?.role}
                        </p>
                      </div>
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">
                      {user?.bio || 'No bio added yet.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user?.location}</span>
                      </div>
                      {isFreelancer && (
                        <>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span>{user?.rating || 0}</span>
                            <span>({user?.completedJobs || 0} jobs)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{user?.completedJobs || 0} projects completed</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Skills */}
                    {isFreelancer && user?.skills && user.skills.length > 0 && (
                      <div>
                        <h3 className="font-medium text-foreground mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue={isFreelancer ? "portfolio" : "jobs"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            {isFreelancer ? (
              <>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="work-history">Work History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Portfolio Tab (Freelancers) */}
          {isFreelancer && (
            <TabsContent value="portfolio" className="space-y-6">
              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Portfolio</CardTitle>
                  <Button size="sm" className="bg-gradient-hero">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {portfolioItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-medium transition-smooth">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Project Image</span>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Work History Tab (Freelancers) */}
          {isFreelancer && (
            <TabsContent value="work-history" className="space-y-6">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>Work History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {workHistory.map((work) => (
                    <div key={work.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{work.title}</h4>
                          <p className="text-sm text-muted-foreground">{work.client}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{work.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{work.duration}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{work.feedback}"</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Posted Jobs Tab (Clients) */}
          {!isFreelancer && (
            <TabsContent value="jobs" className="space-y-6">
              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Posted Jobs</CardTitle>
                  <Button size="sm" className="bg-gradient-hero">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="mx-auto h-12 w-12 mb-4" />
                    <p>No jobs posted yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Reviews Tab (Clients) */}
          {!isFreelancer && (
            <TabsContent value="reviews" className="space-y-6">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="mx-auto h-12 w-12 mb-4" />
                    <p>No reviews yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={user?.email}
                      disabled
                      className="mt-1 bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>
                  <Button className="bg-gradient-hero">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;