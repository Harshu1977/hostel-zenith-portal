import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  FileText,
  MessageSquare,
  QrCode,
  Bell,
  Users,
  CalendarClock,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-hostel-purple-light/30 to-hostel-purple/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-hostel-purple to-hostel-blue bg-clip-text text-transparent">
                Simplify Hostel Life with Gen
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                The comprehensive digital solution for students, hostel wardens, and mess staff to streamline hostel operations and enhance communication.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-bg hover:opacity-90">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=60"
                alt="Modern hostel building"
                className="rounded-lg shadow-xl w-full max-w-lg object-cover h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Everyone</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides tailored solutions for students, hostel administrators, and mess staff to make hostel management seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileText}
              title="Digital Outpass System"
              description="Request, approve, and track outpasses digitally with automated parent notifications."
              delay="0"
            />
            <FeatureCard
              icon={QrCode}
              title="Mess QR Attendance"
              description="Mark meal attendance via QR codes and automate attendance tracking and reporting."
              delay="100"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Digital Complaint Box"
              description="Submit and track complaints with transparency and quick resolution tracking."
              delay="200"
            />
            <FeatureCard
              icon={Bell}
              title="Announcements"
              description="Stay updated with important hostel announcements and notifications."
              delay="300"
            />
            <FeatureCard
              icon={Users}
              title="Visitor Management"
              description="Track and manage visitor entries with proper approval workflows."
              delay="400"
            />
            <FeatureCard
              icon={CalendarClock}
              title="Mess Menu Calendar"
              description="View weekly and monthly mess menus and provide feedback."
              delay="500"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Hostel Zenith?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform transforms hostel management with modern digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-6">
              <BenefitItem>Improved communication between students, wardens, and mess staff</BenefitItem>
              <BenefitItem>Reduced paperwork and administrative overhead</BenefitItem>
              <BenefitItem>Enhanced security with digital records and tracking</BenefitItem>
            </div>
            <div className="flex flex-col space-y-6">
              <BenefitItem>Real-time updates and notifications</BenefitItem>
              <BenefitItem>Data-driven insights for better hostel management</BenefitItem>
              <BenefitItem>Streamlined processes for efficient operations</BenefitItem>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hostel-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hostel Experience?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students and administrators already using Gen.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-white text-hostel-purple hover:bg-gray-100">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-hostel-purple-dark">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer with Contact Information */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Mobile: +91 9769884860</p>
              <p>Email: hostelgen@mescoe.org</p>
              <p>Address: Modern Education Society Wadia College of Engineering Pune 411001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay
}: { 
  icon: any; 
  title: string; 
  description: string;
  delay: string;
}) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover-scale"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="h-12 w-12 rounded-lg bg-hostel-purple-light/20 flex items-center justify-center mb-4">
        <Icon size={24} className="text-hostel-purple" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover-scale">
      <CheckCircle className="text-hostel-purple flex-shrink-0 mt-0.5" size={20} />
      <span className="text-gray-700">{children}</span>
    </div>
  );
};

export default Index;
