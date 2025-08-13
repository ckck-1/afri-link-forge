import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
      <div className="max-w-md w-full">
        <Card className="text-center shadow-medium bg-gradient-card">
          <CardContent className="pt-12 pb-8">
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-gradient-hero hover:shadow-medium transition-all duration-300">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-primary hover:bg-primary/5"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground">
              Lost? Try searching from our{" "}
              <Link to="/jobs" className="text-primary hover:underline font-medium">
                jobs page
              </Link>{" "}
              or{" "}
              <Link to="/dashboard" className="text-primary hover:underline font-medium">
                dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
