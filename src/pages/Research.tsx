
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, FileSearch, Users, Target } from 'lucide-react';
import SecondaryResearch from '@/components/research/SecondaryResearch';
import PrimaryResearch from '@/components/research/PrimaryResearch';
import ResearchReport from '@/components/research/ResearchReport';

export interface SecondaryData {
  id: string;
  insight: string;
  source: string;
  type: 'tracking' | 'automation' | 'personalization';
}

export interface PrimaryData {
  id: string;
  quote: string;
  sourceName: string;
  businessType: string;
  location: string;
}

type Step = 'home' | 'secondary' | 'primary' | 'report';

const Research = () => {
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [secondaryData, setSecondaryData] = useState<SecondaryData[]>([]);
  const [primaryData, setPrimaryData] = useState<PrimaryData[]>([]);

  const getStepProgress = () => {
    switch (currentStep) {
      case 'home': return 0;
      case 'secondary': return 25;
      case 'primary': return 50;
      case 'report': return 100;
      default: return 0;
    }
  };

  const canStartPrimary = secondaryData.length > 0;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          secondaryData.length > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {secondaryData.length > 0 ? '✓' : '1'}
        </div>
        <span className={secondaryData.length > 0 ? 'text-emerald-600' : 'text-gray-400'}>
          Secondary Research
        </span>
      </div>
      
      <div className="w-12 h-0.5 bg-gray-200">
        <div className={`h-full transition-all duration-300 ${
          canStartPrimary ? 'bg-emerald-400' : 'bg-gray-200'
        }`} style={{ width: canStartPrimary ? '100%' : '0%' }} />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          primaryData.length > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {primaryData.length > 0 ? '✓' : '2'}
        </div>
        <span className={primaryData.length > 0 ? 'text-emerald-600' : 'text-gray-400'}>
          Primary Research
        </span>
      </div>
      
      <div className="w-12 h-0.5 bg-gray-200">
        <div className={`h-full transition-all duration-300 ${
          primaryData.length > 0 ? 'bg-emerald-400' : 'bg-gray-200'
        }`} style={{ width: primaryData.length > 0 ? '100%' : '0%' }} />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep === 'report' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {currentStep === 'report' ? '✓' : '3'}
        </div>
        <span className={currentStep === 'report' ? 'text-emerald-600' : 'text-gray-400'}>
          Report
        </span>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">📊 Market Research Tool</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conduct comprehensive market research in two phases: secondary research from existing sources, 
          followed by primary research with direct customer insights.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl text-gray-800">Secondary Research</CardTitle>
            <CardDescription className="text-gray-600">
              Gather insights from existing reports, studies, and industry data
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => setCurrentStep('secondary')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start Secondary Research ✅
            </Button>
          </CardContent>
        </Card>

        <Card className={`transition-all border-0 ${
          canStartPrimary 
            ? 'hover:shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100' 
            : 'bg-gray-50 opacity-60'
        }`}>
          <CardHeader className="text-center pb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              canStartPrimary ? 'bg-emerald-500' : 'bg-gray-400'
            }`}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={`text-xl ${canStartPrimary ? 'text-gray-800' : 'text-gray-500'}`}>
              Primary Research
            </CardTitle>
            <CardDescription className={canStartPrimary ? 'text-gray-600' : 'text-gray-400'}>
              Collect firsthand data through surveys, interviews, and observations
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => setCurrentStep('primary')}
              disabled={!canStartPrimary}
              className={`w-full ${
                canStartPrimary 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canStartPrimary ? 'Start Primary Research ✅' : 'Start Primary Research 🚫'}
            </Button>
            {!canStartPrimary && (
              <p className="text-sm text-gray-400 mt-2">
                Complete secondary research first
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {(secondaryData.length > 0 || primaryData.length > 0) && (
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
              <Target className="w-6 h-6" />
              Research Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{secondaryData.length}</div>
                <div className="text-sm text-gray-600">Secondary Insights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{primaryData.length}</div>
                <div className="text-sm text-gray-600">Primary Insights</div>
              </div>
            </div>
            {primaryData.length > 0 && (
              <Button 
                onClick={() => setCurrentStep('report')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Research Report
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {renderStepIndicator()}
        
        <Progress value={getStepProgress()} className="mb-8 max-w-2xl mx-auto h-2" />

        {currentStep === 'home' && renderHome()}
        
        {currentStep === 'secondary' && (
          <SecondaryResearch 
            data={secondaryData}
            setData={setSecondaryData}
            onNext={() => setCurrentStep('primary')}
            onBack={() => setCurrentStep('home')}
          />
        )}
        
        {currentStep === 'primary' && (
          <PrimaryResearch 
            data={primaryData}
            setData={setPrimaryData}
            onNext={() => setCurrentStep('report')}
            onBack={() => setCurrentStep('home')}
          />
        )}
        
        {currentStep === 'report' && (
          <ResearchReport 
            secondaryData={secondaryData}
            primaryData={primaryData}
            onBack={() => setCurrentStep('home')}
          />
        )}
      </div>
    </div>
  );
};

export default Research;
