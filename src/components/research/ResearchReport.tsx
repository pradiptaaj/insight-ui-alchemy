
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BarChart3, PieChart, FileText, Lightbulb } from 'lucide-react';
import { SecondaryData, PrimaryData } from '@/pages/Research';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ResearchReportProps {
  secondaryData: SecondaryData[];
  primaryData: PrimaryData[];
  onBack: () => void;
}

const ResearchReport: React.FC<ResearchReportProps> = ({ secondaryData, primaryData, onBack }) => {
  // Data for research type distribution
  const researchTypeData = [
    { name: 'Secondary Research', value: secondaryData.length, fill: '#3B82F6' },
    { name: 'Primary Research', value: primaryData.length, fill: '#10B981' }
  ];

  // Data for insights by category
  const categoryData = [
    { 
      category: 'Tracking Issues', 
      count: secondaryData.filter(d => d.type === 'tracking').length,
      fill: '#3B82F6'
    },
    { 
      category: 'Automation Needs', 
      count: secondaryData.filter(d => d.type === 'automation').length,
      fill: '#10B981'
    },
    { 
      category: 'Personalization', 
      count: secondaryData.filter(d => d.type === 'personalization').length,
      fill: '#8B5CF6'
    }
  ];

  const totalInsights = secondaryData.length + primaryData.length;
  const secondaryPercentage = totalInsights > 0 ? Math.round((secondaryData.length / totalInsights) * 100) : 0;

  const getBusinessTypeCounts = () => {
    const counts: { [key: string]: number } = {};
    primaryData.forEach(item => {
      counts[item.businessType] = (counts[item.businessType] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  };

  const chartConfig = {
    secondary: { label: "Secondary", color: "#3B82F6" },
    primary: { label: "Primary", color: "#10B981" },
    tracking: { label: "Tracking", color: "#3B82F6" },
    automation: { label: "Automation", color: "#10B981" },
    personalization: { label: "Personalization", color: "#8B5CF6" }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 text-purple-500" />
          Research Report
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of your market research findings
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{secondaryData.length}</div>
            <div className="text-sm text-gray-600">Secondary Insights</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">{primaryData.length}</div>
            <div className="text-sm text-gray-600">Customer Quotes</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{totalInsights}</div>
            <div className="text-sm text-gray-600">Total Insights</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-600">{secondaryPercentage}%</div>
            <div className="text-sm text-gray-600">Secondary Research</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Research Type Distribution */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Research Distribution
            </CardTitle>
            <CardDescription>Breakdown of research methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <RechartsPie>
                <Pie
                  data={researchTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {researchTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPie>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Insights by Category */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Insights by Category
            </CardTitle>
            <CardDescription>Distribution of secondary research topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Research Balance</h3>
              <p className="text-sm text-gray-600">
                {secondaryPercentage}% secondary vs {100 - secondaryPercentage}% primary research
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Top Category</h3>
              <p className="text-sm text-gray-600">
                {categoryData.reduce((a, b) => a.count > b.count ? a : b).category}
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold mb-1">Sample Size</h3>
              <p className="text-sm text-gray-600">
                {primaryData.length} customer interviews conducted
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Research Entries */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            All Research Entries
          </CardTitle>
          <CardDescription>Complete list of insights and quotes collected</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Secondary Research */}
          {secondaryData.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Secondary Research Insights</h3>
              <div className="space-y-3">
                {secondaryData.map((item) => (
                  <div key={item.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2">📊 {item.insight}</p>
                        <p className="text-sm text-gray-600">— {item.source}</p>
                      </div>
                      <Badge className="ml-4 bg-blue-100 text-blue-800">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Research */}
          {primaryData.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-emerald-600 mb-4">Primary Research Quotes</h3>
              <div className="space-y-3">
                {primaryData.map((item) => (
                  <div key={item.id} className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <blockquote className="text-gray-800 italic mb-2">"💬 {item.quote}"</blockquote>
                        <p className="text-sm text-gray-600">— {item.sourceName}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant="outline" className="text-xs">
                          {item.businessType.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center pt-6">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ResearchReport;
