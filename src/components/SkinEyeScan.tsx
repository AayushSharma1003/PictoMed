
import React, { useState } from 'react';
import { Upload, Camera, X, Info, ArrowRight, Home, Eye, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const SkinEyeScan = () => {
  const [skinFile, setSkinFile] = useState<File | null>(null);
  const [eyeFile, setEyeFile] = useState<File | null>(null);
  const [skinPreview, setSkinPreview] = useState<string | null>(null);
  const [eyePreview, setEyePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    condition: string;
    confidence: number;
    description: string;
    recommendations: string[];
  }>(null);
  const [scanType, setScanType] = useState<'skin' | 'eye'>('skin');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (scanType === 'skin') {
        handleSkinFile(e.dataTransfer.files[0]);
      } else {
        handleEyeFile(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (scanType === 'skin') {
        handleSkinFile(e.target.files[0]);
      } else {
        handleEyeFile(e.target.files[0]);
      }
    }
  };

  const handleSkinFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    setSkinFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setSkinPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEyeFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    setEyeFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setEyePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    if (scanType === 'skin') {
      setSkinFile(null);
      setSkinPreview(null);
    } else {
      setEyeFile(null);
      setEyePreview(null);
    }
    setResult(null);
  };

  const analyzeImage = () => {
    const preview = scanType === 'skin' ? skinPreview : eyePreview;
    if (!preview) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      if (scanType === 'skin') {
        setResult({
          condition: "Eczema (Atopic Dermatitis)",
          confidence: 92,
          description: "Eczema is a condition that makes your skin red and itchy. It's common in children but can occur at any age. Atopic dermatitis is the most common type of eczema.",
          recommendations: [
            "Apply moisturizers consistently",
            "Avoid known triggers like specific soaps or fabrics",
            "Consider over-the-counter hydrocortisone for mild symptoms",
            "Consult a dermatologist for prescription treatments if severe"
          ]
        });
      } else {
        setResult({
          condition: "Conjunctivitis (Pink Eye)",
          confidence: 89,
          description: "Conjunctivitis is an inflammation or infection of the transparent membrane that lines your eyelid and covers the white part of your eyeball.",
          recommendations: [
            "Apply warm compresses to relieve discomfort",
            "Use artificial tears for relief",
            "Stop wearing contact lenses until symptoms resolve",
            "Consult an ophthalmologist if symptoms persist or worsen"
          ]
        });
      }
    }, 3000);
  };

  const getActivePreview = () => scanType === 'skin' ? skinPreview : eyePreview;

  return (
    <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-picto-blue-light/30 to-white dark:from-picto-red-dark/20 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-picto-blue-medium dark:text-picto-red-medium hover:underline">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </div>
          
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-picto-gray-dark dark:text-white mb-4">
              AI <span className="text-picto-blue-dark dark:text-picto-red-medium">Disease Detection</span>
            </h1>
            <p className="text-xl text-picto-gray-dark dark:text-gray-300 max-w-2xl mx-auto">
              Upload an image for AI-powered analysis and recommendations.
            </p>
          </div>
          
          <div className="glass-card p-8 md:p-10 animate-fade-in dark:bg-gray-800/50 dark:border-gray-700">
            <Tabs defaultValue="skin" className="mb-8" onValueChange={(value) => setScanType(value as 'skin' | 'eye')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="skin" className="flex items-center gap-2">
                  <Scan className="h-4 w-4" />
                  Skin Detection
                </TabsTrigger>
                <TabsTrigger value="eye" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Eye Detection
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="skin">
                {!skinPreview ? (
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      isDragging ? 'border-picto-blue-medium bg-picto-blue-light/20 dark:border-picto-red-medium dark:bg-picto-red-light/10' : 'border-picto-gray-medium bg-picto-gray-lightest dark:border-gray-600 dark:bg-gray-800/30'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('skin-file-upload')?.click()}
                  >
                    <input 
                      type="file" 
                      id="skin-file-upload" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileInput}
                    />
                    <Upload className="h-16 w-16 mx-auto mb-4 text-picto-gray-medium dark:text-gray-400" />
                    <h3 className="text-xl font-medium text-picto-gray-dark dark:text-white mb-2">
                      Drag and drop your skin image here
                    </h3>
                    <p className="text-picto-gray-medium dark:text-gray-400 mb-6">
                      Or click to browse your files
                    </p>
                    <p className="text-sm text-picto-gray-medium dark:text-gray-500">
                      Supports JPG, PNG (max. 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="relative">
                      <img 
                        src={skinPreview} 
                        alt="Uploaded skin image" 
                        className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                      />
                      <button 
                        className="absolute top-3 right-3 p-2 bg-picto-gray-dark/80 text-white rounded-full hover:bg-picto-gray-dark transition-colors dark:bg-gray-900/80 dark:hover:bg-gray-900"
                        onClick={clearImage}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {!isAnalyzing && !result ? (
                      <div className="flex justify-center">
                        <button 
                          className="btn-primary flex items-center dark:bg-picto-red-medium dark:hover:bg-picto-red-dark" 
                          onClick={analyzeImage}
                        >
                          <span>Analyze Skin Image</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="eye">
                {!eyePreview ? (
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      isDragging ? 'border-picto-green-medium bg-picto-green-light/20 dark:border-picto-green-medium dark:bg-picto-green-dark/10' : 'border-picto-gray-medium bg-picto-gray-lightest dark:border-gray-600 dark:bg-gray-800/30'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('eye-file-upload')?.click()}
                  >
                    <input 
                      type="file" 
                      id="eye-file-upload" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileInput}
                    />
                    <Upload className="h-16 w-16 mx-auto mb-4 text-picto-gray-medium dark:text-gray-400" />
                    <h3 className="text-xl font-medium text-picto-gray-dark dark:text-white mb-2">
                      Drag and drop your eye image here
                    </h3>
                    <p className="text-picto-gray-medium dark:text-gray-400 mb-6">
                      Or click to browse your files
                    </p>
                    <p className="text-sm text-picto-gray-medium dark:text-gray-500">
                      Supports JPG, PNG (max. 10MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="relative">
                      <img 
                        src={eyePreview} 
                        alt="Uploaded eye image" 
                        className="w-full h-auto max-h-[500px] object-contain rounded-xl"
                      />
                      <button 
                        className="absolute top-3 right-3 p-2 bg-picto-gray-dark/80 text-white rounded-full hover:bg-picto-gray-dark transition-colors dark:bg-gray-900/80 dark:hover:bg-gray-900"
                        onClick={clearImage}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {!isAnalyzing && !result ? (
                      <div className="flex justify-center">
                        <button 
                          className="btn-secondary flex items-center dark:bg-picto-green-dark dark:hover:bg-picto-green-darker" 
                          onClick={analyzeImage}
                        >
                          <span>Analyze Eye Image</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-picto-blue-medium border-t-transparent dark:border-picto-red-medium"></div>
                <p className="mt-4 text-lg text-picto-gray-dark dark:text-white">
                  Analyzing your image...
                </p>
                <p className="text-picto-gray-medium dark:text-gray-400">
                  This may take a few moments
                </p>
              </div>
            ) : null}
            
            {result ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-picto-gray-light dark:border-gray-700 shadow-md animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-picto-gray-dark dark:text-white">
                    {result.condition}
                  </h3>
                  <div className={`px-3 py-1 ${scanType === 'skin' ? 'bg-picto-blue-light text-picto-blue-dark dark:bg-picto-red-dark dark:text-white' : 'bg-picto-green-light text-picto-green-dark dark:bg-picto-green-dark dark:text-white'} rounded-full text-sm font-medium`}>
                    {result.confidence}% confidence
                  </div>
                </div>
                
                <p className="text-picto-gray-medium dark:text-gray-400 mb-6">
                  {result.description}
                </p>
                
                <div className="border-t border-picto-gray-light dark:border-gray-700 pt-4">
                  <h4 className="flex items-center text-lg font-medium text-picto-gray-dark dark:text-white mb-3">
                    <Info className={`mr-2 h-5 w-5 ${scanType === 'skin' ? 'text-picto-blue-medium dark:text-picto-red-medium' : 'text-picto-green-medium'}`} />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`inline-flex h-6 w-6 min-w-6 items-center justify-center rounded-full ${scanType === 'skin' ? 'bg-picto-blue-light text-picto-blue-dark dark:bg-picto-red-dark dark:text-white' : 'bg-picto-green-light text-picto-green-dark dark:bg-picto-green-dark dark:text-white'} text-sm mr-3`}>
                          {index + 1}
                        </span>
                        <span className="text-picto-gray-medium dark:text-gray-400">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className={scanType === 'skin' ? 'btn-primary dark:bg-picto-red-medium dark:hover:bg-picto-red-dark' : 'btn-secondary dark:bg-picto-green-dark dark:hover:bg-picto-green-darker'}>
                    Book Consultation
                  </button>
                  <button className={`btn-outline ${scanType === 'skin' ? 'border-picto-blue-medium text-picto-blue-medium hover:bg-picto-blue-light dark:border-picto-red-medium dark:text-picto-red-medium dark:hover:bg-picto-red-dark/20' : 'border-picto-green-medium text-picto-green-medium hover:bg-picto-green-light dark:border-picto-green-medium dark:text-picto-green-medium dark:hover:bg-picto-green-dark/20'}`}>
                    Save Report
                  </button>
                </div>
              </div>
            ) : null}
            
            <div className="mt-6 flex justify-center">
              <button 
                className="flex items-center text-picto-gray-medium hover:text-picto-blue-medium dark:text-gray-400 dark:hover:text-picto-red-medium transition-colors"
                onClick={() => document.getElementById(scanType === 'skin' ? 'skin-file-upload-camera' : 'eye-file-upload-camera')?.click()}
              >
                <Camera className="mr-2 h-5 w-5" />
                <span>Take a photo instead</span>
                <input 
                  type="file" 
                  id="skin-file-upload-camera" 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleFileInput}
                />
                <input 
                  type="file" 
                  id="eye-file-upload-camera" 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleFileInput}
                />
              </button>
            </div>
          </div>
          
          <div className="mt-10 p-6 rounded-xl bg-picto-blue-light/50 border border-picto-blue-light dark:bg-gray-800/50 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="flex-shrink-0 p-3 bg-picto-blue-medium dark:bg-picto-red-medium rounded-full text-white mb-4 sm:mb-0 sm:mr-6">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-picto-gray-dark dark:text-white mb-1">Important Note</h4>
                <p className="text-picto-gray-medium dark:text-gray-400">
                  This AI analysis is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinEyeScan;
