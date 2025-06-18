
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, ArrowRight, FileSearch } from 'lucide-react';
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

  const addInsight = () => {
    if (!newInsight.trim() || !newSource.trim()) {
      toast({ title: "Please fill in both insight and source fields" });
      return;
    }

    const insight: SecondaryData = {
      id: Date.now().toString(),
      insight: newInsight,
      source: newSource,
      type: newType
    };

    setData([...data, insight]);
    setNewInsight('');
    setNewSource('');
    toast({ title: "Secondary research insight added!" });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tracking': return 'bg-blue-100 text-blue-800';
      case 'automation': return 'bg-emerald-100 text-emerald-800';
      case 'personalization': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FileSearch className="w-8 h-8 text-blue-500" />
          Secondary Research
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gather insights from existing reports, studies, and industry data to build your research foundation.
        </p>
      </div>

      {/* Add New Insight Form */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Add Research Insight</CardTitle>
          <CardDescription>Enter statistics, trends, or insights from trusted sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your research insight or statistic..."
            value={newInsight}
            onChange={(e) => setNewInsight(e.target.value)}
            className="min-h-[100px]"
          />
          <Input
            placeholder="Source (e.g., McKinsey, Gartner, Industry Report)"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Research Category</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as 'tracking' | 'automation' | 'personalization')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="tracking">Customer Tracking Issues</option>
              <option value="automation">Automation Needs</option>
              <option value="personalization">Personalization Trends</option>
            </select>
          </div>
          <Button onClick={addInsight} className="w-full bg-blue-500 hover:bg-blue-600">
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
              <Card key={item.id} className="hover:shadow-md transition-shadow bg-white border border-gray-200">
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
