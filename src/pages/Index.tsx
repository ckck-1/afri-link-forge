import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Zap, Globe, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: 'Verified Talent',
      description: 'Access skilled freelancers across Africa with verified profiles and ratings'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Protected transactions with escrow and multiple payment methods including mobile money'
    },
    {
      icon: Zap,
      title: 'Fast Matching',
      description: 'AI-powered matching connects you with the right talent for your project quickly'
    },
    {
      icon: Globe,
      title: 'Pan-African Network',
      description: 'Connect with talent and opportunities across the African continent'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Freelancers' },
    { number: '10K+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Connect with Africa's
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Best Talent</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              The premier platform connecting African freelancers with global opportunities. 
              Build your project with verified talent, secure payments, and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-hero hover:shadow-medium transition-all duration-300 text-lg px-8 py-6">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary hover:bg-primary/5">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AfriLink?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for Africa, designed for the world. Experience the future of freelancing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300 border-border bg-gradient-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to get your project started
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Post Your Project', description: 'Describe your project requirements and budget' },
                { step: '02', title: 'Get Proposals', description: 'Receive proposals from qualified African freelancers' },
                { step: '03', title: 'Hire & Collaborate', description: 'Choose the best talent and start working together' }
              ].map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-primary mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of successful projects on Africa's leading freelance platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-hero hover:shadow-medium transition-all duration-300 text-lg px-8 py-6">
                  Join as Client
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary hover:bg-primary/5">
                  Join as Freelancer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
