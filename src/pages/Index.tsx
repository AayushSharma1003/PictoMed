
import React from 'react';
import { Link } from 'react-router-dom';
import { ScanFace, Brain, HeartPulse, Upload, MessageCircle, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features section */}
      <section className="py-24 bg-picto-gray-lightest">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-picto-gray-dark mb-4">
              How PictoMed <span className="text-picto-blue-dark">Helps You</span>
            </h2>
            <p className="text-xl text-picto-gray-medium max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with medical expertise to provide you with accurate, accessible healthcare support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-fade-in">
            <FeatureCard 
              icon={ScanFace} 
              title="Skin Disease Detection" 
              description="Upload photos of skin conditions for accurate AI analysis, identification, and treatment recommendations."
              color="blue"
              delay={0.1}
            />
            <FeatureCard 
              icon={HeartPulse} 
              title="Eye Disease Screening" 
              description="Early detection of common eye conditions through advanced image processing and machine learning algorithms."
              color="green"
              delay={0.2}
            />
            <FeatureCard 
              icon={Brain} 
              title="Mental Health Support" 
              description="24/7 AI chatbot providing emotional support, coping strategies, and mental wellness guidance."
              color="blue"
              delay={0.3}
            />
            <FeatureCard 
              icon={Upload} 
              title="Easy Image Upload" 
              description="Seamlessly upload images from your device or capture them directly with your camera."
              color="green"
              delay={0.4}
            />
            <FeatureCard 
              icon={MessageCircle} 
              title="Personalized Advice" 
              description="Receive tailored recommendations based on your specific symptoms and medical history."
              color="blue"
              delay={0.5}
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Privacy Protected" 
              description="Your data is encrypted and secure, with strict privacy protocols to protect your sensitive information."
              color="green"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-24 bg-gradient-to-br from-picto-blue-light to-picto-green-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-picto-gray-dark mb-6">
              Take Control of Your Health Journey Today
            </h2>
            <p className="text-xl text-picto-gray-dark mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust PictoMed for accessible, accurate healthcare guidance and support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scan" className="btn-primary flex items-center justify-center">
                <ScanFace className="mr-2 h-5 w-5" />
                Start Scanning
              </Link>
              <Link to="/chat" className="btn-secondary flex items-center justify-center">
                <Brain className="mr-2 h-5 w-5" />
                Mental Health Support
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-picto-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-2xl font-bold text-picto-blue-dark mb-6 md:mb-0">
              <HeartPulse className="h-8 w-8 text-picto-blue-medium" />
              <span>PictoMed</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="#" className="text-picto-gray-medium hover:text-picto-blue-dark transition-colors">
                About
              </a>
              <a href="#" className="text-picto-gray-medium hover:text-picto-blue-dark transition-colors">
                Privacy
              </a>
              <a href="#" className="text-picto-gray-medium hover:text-picto-blue-dark transition-colors">
                Terms
              </a>
              <a href="#" className="text-picto-gray-medium hover:text-picto-blue-dark transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-picto-gray-light text-center text-picto-gray-medium text-sm">
            <p>© {new Date().getFullYear()} PictoMed. All rights reserved.</p>
            <p className="mt-2">
              Disclaimer: PictoMed is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
