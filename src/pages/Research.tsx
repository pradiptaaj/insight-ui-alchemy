
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Upload, Users, BarChart3, FileText, Lightbulb, Target, TrendingUp, MessageSquare, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QualitativeData {
  quote: string;
  source: string;
  businessType: string;
  location: string;
}

interface QuantitativeData {
  question: string;
  responses: { label: string; value: number; }[];
}

interface SecondaryData {
  insight: string;
  source: string;
  type: 'statistic' | 'trend' | 'competitor';
}

const Research = () => {
  const { toast } = useToast();
  const [objective, setObjective] = useState("We want to understand how small businesses personalize customer offers and what tools they currently use.");
  const [qualitativeData, setQualitativeData] = useState<QualitativeData[]>([
    {
      quote: "I use WhatsApp to tell my regulars about offers, but I don't know who visits often.",
      source: "Sarah M.",
      businessType: "Local Café",
      location: "Downtown"
    }
  ]);
  const [quantitativeData, setQuantitativeData] = useState<QuantitativeData[]>([
    {
      question: "How often do you offer discounts?",
      responses: [
        { label: "Daily", value: 15 },
        { label: "Weekly", value: 35 },
        { label: "Monthly", value: 30 },
        { label: "Rarely", value: 20 }
      ]
    }
  ]);
  const [secondaryData, setSecondaryData] = useState<SecondaryData[]>([
    {
      insight: "Churn rate for local businesses averages 32% without personalization.",
      source: "McKinsey",
      type: "statistic"
    },
    {
      insight: "Customers are 80% more likely to buy when they get personalized offers.",
      source: "Accenture",
      type: "trend"
    }
  ]);

  const [newQualitative, setNewQualitative] = useState<QualitativeData>({
    quote: '', source: '', businessType: '', location: ''
  });
  const [newQuantitative, setNewQuantitative] = useState<QuantitativeData>({
    question: '', responses: []
  });
  const [newSecondary, setNewSecondary] = useState<SecondaryData>({
    insight: '', source: '', type: 'statistic'
  });

  const pieColors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  const addQualitativeData = () => {
    if (newQualitative.quote && newQualitative.source) {
      setQualitativeData([...qualitativeData, newQualitative]);
      setNewQualitative({ quote: '', source: '', businessType: '', location: '' });
      toast({ title: "Qualitative data added successfully!" });
    }
  };

  const addSecondaryData = () => {
    if (newSecondary.insight && newSecondary.source) {
      setSecondaryData([...secondaryData, newSecondary]);
      setNewSecondary({ insight: '', source: '', type: 'statistic' });
      toast({ title: "Secondary research data added successfully!" });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'statistic': return <BarChart3 className="w-4 h-4" />;
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      case 'competitor': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'statistic': return 'bg-blue-100 text-blue-800';
      case 'trend': return 'bg-green-100 text-green-800';
      case 'competitor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🧩 Market Research Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conduct comprehensive primary and secondary market research to drive data-informed decisions
          </p>
        </div>

        {/* Research Objective */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              🟡 Research Objective
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="min-h-[100px] text-lg"
              placeholder="What are you trying to solve and why?"
            />
          </CardContent>
        </Card>

        {/* Primary Research */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              🔵 Primary Research
            </CardTitle>
            <CardDescription className="text-blue-100">
              Data collected firsthand: surveys, interviews, observations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="qualitative" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qualitative" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Qualitative Data
                </TabsTrigger>
                <TabsTrigger value="quantitative" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Quantitative Data
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qualitative" className="space-y-6">
                {/* Add Qualitative Data */}
                <Card className="border-dashed border-2 border-blue-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Add Qualitative Insight</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Enter customer quote or insight..."
                      value={newQualitative.quote}
                      onChange={(e) => setNewQualitative({...newQualitative, quote: e.target.value})}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        placeholder="Source (e.g., John D.)"
                        value={newQualitative.source}
                        onChange={(e) => setNewQualitative({...newQualitative, source: e.target.value})}
                      />
                      <Input
                        placeholder="Business Type"
                        value={newQualitative.businessType}
                        onChange={(e) => setNewQualitative({...newQualitative, businessType: e.target.value})}
                      />
                      <Input
                        placeholder="Location"
                        value={newQualitative.location}
                        onChange={(e) => setNewQualitative({...newQualitative, location: e.target.value})}
                      />
                    </div>
                    <Button onClick={addQualitativeData} className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Qualitative Data
                    </Button>
                  </CardContent>
                </Card>

                {/* Display Qualitative Data */}
                <div className="grid gap-4 md:grid-cols-2">
                  {qualitativeData.map((data, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <blockquote className="text-lg italic mb-4">
                          "📍 {data.quote}"
                        </blockquote>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>—{data.source}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline">{data.businessType}</Badge>
                            <Badge variant="outline">{data.location}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="quantitative" className="space-y-6">
                {/* Display Quantitative Data */}
                {quantitativeData.map((data, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">{data.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.responses}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="label" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="value" fill="#3B82F6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={data.responses}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({label, value}) => `${label}: ${value}%`}
                              >
                                {data.responses.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Secondary Research */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              🔴 Secondary Research
            </CardTitle>
            <CardDescription className="text-red-100">
              Insights from reports, articles, and competitor analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Add Secondary Data */}
            <Card className="border-dashed border-2 border-red-300">
              <CardHeader>
                <CardTitle className="text-lg">Add Secondary Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter research insight or statistic..."
                  value={newSecondary.insight}
                  onChange={(e) => setNewSecondary({...newSecondary, insight: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Source (e.g., McKinsey, Gartner)"
                    value={newSecondary.source}
                    onChange={(e) => setNewSecondary({...newSecondary, source: e.target.value})}
                  />
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={newSecondary.type}
                    onChange={(e) => setNewSecondary({...newSecondary, type: e.target.value as 'statistic' | 'trend' | 'competitor'})}
                  >
                    <option value="statistic">Statistic</option>
                    <option value="trend">Trend</option>
                    <option value="competitor">Competitor Analysis</option>
                  </select>
                </div>
                <Button onClick={addSecondaryData} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Add Secondary Research
                </Button>
              </CardContent>
            </Card>

            {/* Display Secondary Data */}
            <div className="grid gap-4 md:grid-cols-2">
              {secondaryData.map((data, index) => (
                <Card key={index} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      {getTypeIcon(data.type)}
                      <div className="flex-1">
                        <p className="text-lg">📉 {data.insight}</p>
                        <p className="text-sm text-muted-foreground mt-2">— {data.source}</p>
                      </div>
                    </div>
                    <Badge className={getTypeColor(data.type)}>
                      {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Takeaways */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              🟢 Key Insights & Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-semibold mb-2">Automation Need</h3>
                <p className="text-sm text-muted-foreground">
                  Small businesses want automation, not complexity
                </p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="text-3xl mb-3">🕒</div>
                <h3 className="font-semibold mb-2">Tracking Gap</h3>
                <p className="text-sm text-muted-foreground">
                  They don't track who's visiting or spending patterns
                </p>
              </Card>
              <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Generic Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Most use generic discounts instead of smart targeting
                </p>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Solution Mapping */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              🟣 Research-Driven Solutions
            </CardTitle>
            <CardDescription className="text-purple-100">
              How insights influenced our product decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {[
                {
                  problem: "Owners don't know who visits often",
                  solution: "Auto visit-tracker & QR login system"
                },
                {
                  problem: "Too busy to manually send offers",
                  solution: "Auto-scheduled personalized SMS campaigns"
                },
                {
                  problem: "Lack of data for decisions",
                  solution: "Analytics dashboard with customer segments"
                }
              ].map((item, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-600">Research Insight</h4>
                    <p className="text-gray-700">{item.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600">Our Solution</h4>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Research;
