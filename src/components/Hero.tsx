
import React from 'react';
import { Link } from 'react-router-dom';
import { ScanFace, Brain, ArrowLeft } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-picto-blue-light/30 to-white dark:from-picto-red-dark/30 dark:to-black"></div>
        <div className="absolute top-40 left-1/4 w-72 h-72 rounded-full bg-picto-green-light/40 dark:bg-picto-green-dark/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/5 w-96 h-96 rounded-full bg-picto-blue-light/50 dark:bg-picto-red-light/50 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-picto-gray-dark dark:text-white mb-2 leading-tight">
            PictoMed
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-picto-gray-dark dark:text-white mb-6 leading-tight">
            AI-Powered Healthcare <br className="hidden md:block" />
            <span className="text-picto-blue-dark dark:text-picto-red-medium">At Your Fingertips</span>
          </h2>
          <p className="text-xl text-picto-gray-dark dark:text-gray-300 max-w-3xl mb-10">
            PictoMed combines advanced AI technology with medical expertise to provide accurate skin and eye disease detection, along with compassionate mental health support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/scan" className="btn-primary flex items-center justify-center dark:bg-picto-red-medium dark:hover:bg-picto-red-dark">
              <ScanFace className="mr-2 h-5 w-5" />
              Start Scanning
            </Link>
            <Link to="/chat" className="btn-secondary flex items-center justify-center dark:bg-picto-green-dark dark:hover:bg-picto-green-darker">
              <Brain className="mr-2 h-5 w-5" />
              Mental Health Support
            </Link>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="max-w-5xl mx-auto relative">
          <div className="glass-card overflow-hidden rounded-3xl shadow-xl">
            <div className="relative aspect-video bg-gradient-to-r from-picto-blue-light to-picto-green-light flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="text-center p-8 text-white z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Healthcare Reimagined</h2>
                <p className="text-lg max-w-2xl">Cutting-edge AI meets human-centered design for a healthcare experience that's both powerful and compassionate.</p>
              </div>
            </div>
          </div>
          
          {/* Floating cards */}
          <div className="absolute -bottom-10 -left-5 w-64 glass-card p-4 shadow-lg animate-float">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-picto-blue-medium flex items-center justify-center">
                <ScanFace className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-picto-gray-dark">Disease Detection</h3>
                <p className="text-sm text-picto-gray-medium">99.2% accuracy rate</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-5 w-64 glass-card p-4 shadow-lg animate-float" style={{animationDelay: "0.5s"}}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-picto-green-medium flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-picto-gray-dark">Mental Health</h3>
                <p className="text-sm text-picto-gray-medium">24/7 AI support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
