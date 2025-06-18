
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, ArrowRight, Users, Upload, FileText, Mic } from 'lucide-react';
import { PrimaryData } from '@/pages/Research';
import { useToast } from '@/hooks/use-toast';

interface PrimaryResearchProps {
  data: PrimaryData[];
  setData: (data: PrimaryData[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const PrimaryResearch: React.FC<PrimaryResearchProps> = ({ data, setData, onNext, onBack }) => {
  const { toast } = useToast();
  const [newQuote, setNewQuote] = useState('');
  const [newSourceName, setNewSourceName] = useState('');
  const [newBusinessType, setNewBusinessType] = useState('restaurant');
  const [newLocation, setNewLocation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const businessTypes = [
    'restaurant',
    'retail_store',
    'coffee_shop',
    'salon_spa',
    'fitness_gym',
    'consulting',
    'other'
  ];

  const addQuote = () => {
    if (!newQuote.trim() || !newSourceName.trim() || !newLocation.trim()) {
      toast({ title: "Please fill in all required fields" });
      return;
    }

    const quote: PrimaryData = {
      id: Date.now().toString(),
      quote: newQuote,
      sourceName: newSourceName,
      businessType: newBusinessType,
      location: newLocation,
      files: uploadedFiles.map(f => f.name)
    };

    setData([...data, quote]);
    setNewQuote('');
    setNewSourceName('');
    setNewLocation('');
    setUploadedFiles([]);
    toast({ title: "Primary research entry added!" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'txt', 'mp3', 'wav'].includes(extension || '');
    });
    
    if (validFiles.length !== files.length) {
      toast({ title: "Only PDF, TXT, MP3, and WAV files are allowed" });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getBusinessTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      restaurant: 'Restaurant',
      retail_store: 'Retail Store',
      coffee_shop: 'Coffee Shop',
      salon_spa: 'Salon/Spa',
      fitness_gym: 'Fitness/Gym',
      consulting: 'Consulting',
      other: 'Other'
    };
    return labels[type] || type;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'mp3' || extension === 'wav') {
      return <Mic className="w-3 h-3 text-purple-400" />;
    }
    return <FileText className="w-3 h-3 text-purple-400" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-purple-500" />
          Primary Research
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Collect qualitative insights through customer interviews, surveys, and direct observations.
        </p>
      </div>

      {/* Add New Quote Form */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Add Customer Insight</CardTitle>
          <CardDescription>Record quotes and feedback from your customer interviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter customer quote or key insight..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="min-h-[100px] border-purple-200 focus:border-purple-400"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Source Name (e.g., Sarah M.)"
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              className="border-purple-200 focus:border-purple-400"
            />
            <select
              value={newBusinessType}
              onChange={(e) => setNewBusinessType(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-md bg-white focus:border-purple-400 focus:outline-none"
            >
              {businessTypes.map(type => (
                <option key={type} value={type}>
                  {getBusinessTypeLabel(type)}
                </option>
              ))}
            </select>
            <Input
              placeholder="Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="border-purple-200 focus:border-purple-400"
            />
          </div>
          
          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Upload Notes or Audio</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.mp3,.wav"
                onChange={handleFileUpload}
                className="hidden"
                id="interview-files"
              />
              <label htmlFor="interview-files" className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-200 rounded-md cursor-pointer hover:bg-purple-50 transition-colors">
                <Upload className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700">Upload Files (PDF, TXT, MP3, WAV)</span>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-purple-100">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.name)}
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
          
          <Button onClick={addQuote} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer Insight
          </Button>
        </CardContent>
      </Card>

      {/* Display Quotes */}
      {data.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Customer Insights ({data.length})</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow bg-white border-gray-100">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-gray-800 mb-4 leading-relaxed">
                    "💬 {item.quote}"
                  </blockquote>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-t pt-4">
                      <span className="text-gray-600 font-medium">— {item.sourceName}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {getBusinessTypeLabel(item.businessType)}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {item.location}
                        </Badge>
                      </div>
                    </div>
                    {item.files && item.files.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400">Attached files:</p>
                        {item.files.map((fileName, index) => (
                          <div key={index} className="flex items-center gap-1">
                            {getFileIcon(fileName)}
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
            View Research Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PrimaryResearch;
