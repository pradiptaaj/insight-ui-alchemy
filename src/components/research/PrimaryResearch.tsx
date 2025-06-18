
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, ArrowRight, Users } from 'lucide-react';
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
      location: newLocation
    };

    setData([...data, quote]);
    setNewQuote('');
    setNewSourceName('');
    setNewLocation('');
    toast({ title: "Primary research entry added!" });
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-emerald-500" />
          Primary Research
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Collect firsthand insights through customer interviews, surveys, and direct observations.
        </p>
      </div>

      {/* Add New Quote Form */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Add Customer Insight</CardTitle>
          <CardDescription>Record quotes and feedback from your customer interviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter customer quote or key insight..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Source Name (e.g., Sarah M.)"
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
            />
            <select
              value={newBusinessType}
              onChange={(e) => setNewBusinessType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white"
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
            />
          </div>
          <Button onClick={addQuote} className="w-full bg-emerald-500 hover:bg-emerald-600">
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
              <Card key={item.id} className="hover:shadow-md transition-shadow bg-white border border-gray-200">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-gray-800 mb-4 leading-relaxed">
                    "💬 {item.quote}"
                  </blockquote>
                  <div className="flex justify-between items-center text-sm border-t pt-4">
                    <span className="text-gray-600 font-medium">— {item.sourceName}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getBusinessTypeLabel(item.businessType)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.location}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        
        {data.length > 0 && (
          <Button onClick={onNext} className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2">
            View Research Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PrimaryResearch;
