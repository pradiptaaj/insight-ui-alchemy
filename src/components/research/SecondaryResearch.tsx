
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, ArrowRight, FileSearch, Upload, FileText } from 'lucide-react';
import { SecondaryData } from '@/pages/Research';
import { useToast } from '@/hooks/use-toast';

interface SecondaryResearchProps {
  data: SecondaryData[];
  setData: (data: SecondaryData[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const SecondaryResearch: React.FC<SecondaryResearchProps> = ({ data, setData, onNext, onBack }) => {
  const { toast } = useToast();
  const [newInsight, setNewInsight] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newType, setNewType] = useState<'tracking' | 'automation' | 'personalization'>('tracking');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const addInsight = () => {
    if (!newInsight.trim() || !newSource.trim()) {
      toast({ title: "Please fill in both insight and source fields" });
      return;
    }

    const insight: SecondaryData = {
      id: Date.now().toString(),
      insight: newInsight,
      source: newSource,
      type: newType,
      files: uploadedFiles.map(f => f.name)
    };

    setData([...data, insight]);
    setNewInsight('');
    setNewSource('');
    setUploadedFiles([]);
    toast({ title: "Secondary research insight added!" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'docx', 'csv'].includes(extension || '');
    });
    
    if (validFiles.length !== files.length) {
      toast({ title: "Only PDF, DOCX, and CSV files are allowed" });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tracking': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'automation': return 'bg-mint-100 text-emerald-700 border-emerald-200';
      case 'personalization': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FileSearch className="w-8 h-8 text-sky-500" />
          Secondary Research
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gather quantitative insights from existing reports, studies, and industry data to build your research foundation.
        </p>
      </div>

      {/* Add New Insight Form */}
      <Card className="bg-gradient-to-br from-sky-50 to-mint-50 border-sky-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Add Research Insight</CardTitle>
          <CardDescription>Enter statistics, trends, or insights from trusted sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your research insight or statistic..."
            value={newInsight}
            onChange={(e) => setNewInsight(e.target.value)}
            className="min-h-[100px] border-sky-200 focus:border-sky-400"
          />
          <Input
            placeholder="Source (e.g., McKinsey, Gartner, Industry Report)"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            className="border-sky-200 focus:border-sky-400"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Research Category</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'tracking' | 'automation' | 'personalization')}
              className="w-full px-3 py-2 border border-sky-200 rounded-md bg-white focus:border-sky-400 focus:outline-none"
            >
              <option value="tracking">Customer Tracking Issues</option>
              <option value="automation">Automation Needs</option>
              <option value="personalization">Personalization Trends</option>
            </select>
          </div>
          
          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Upload Research Files</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="research-files"
              />
              <label htmlFor="research-files" className="flex items-center gap-2 px-4 py-2 bg-white border border-sky-200 rounded-md cursor-pointer hover:bg-sky-50 transition-colors">
                <Upload className="w-4 h-4 text-sky-500" />
                <span className="text-sm text-gray-700">Upload Files (PDF, DOCX, CSV)</span>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-sky-100">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Button onClick={addInsight} className="w-full bg-sky-500 hover:bg-sky-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Insight
          </Button>
        </CardContent>
      </Card>

      {/* Display Insights */}
      {data.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Research Insights ({data.length})</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow bg-white border-gray-100">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                    <p className="text-gray-800 text-lg leading-relaxed">
                      📊 {item.insight}
                    </p>
                    <p className="text-sm text-gray-500 border-t pt-3">
                      — {item.source}
                    </p>
                    {item.files && item.files.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400">Attached files:</p>
                        {item.files.map((fileName, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <FileText className="w-3 h-3 text-sky-400" />
                            <span className="text-xs text-gray-500">{fileName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        
        {data.length > 0 && (
          <Button onClick={onNext} className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2">
            Continue to Primary Research
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SecondaryResearch;
