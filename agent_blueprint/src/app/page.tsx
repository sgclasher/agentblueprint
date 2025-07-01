"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  Bot, 
  FileText, 
  Server, 
  Users,
  BarChart3,
  Lightbulb,
  Target,
  CheckCircle
} from "lucide-react";
import { mockBusinessProfile, mockOverviewData } from "@/lib/mock-data";
import { AIOpportunitiesTab } from "@/components/profile_tabs/AIOpportunitiesTab";
import { AIBlueprintTab } from "@/components/profile_tabs/AIBlueprintTab";

export default function BusinessProfilePage() {
  const profile = mockBusinessProfile;
  const overview = mockOverviewData;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{profile.companyName}</h1>
              <p className="text-muted-foreground">{profile.industry} • {profile.size} • {profile.revenue}</p>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">AI Readiness</p>
                    <p className="text-2xl font-bold">{overview.quickStats.aiReadinessScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">ROI Potential</p>
                    <p className="text-2xl font-bold">{overview.quickStats.totalROIPotential}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Opportunities</p>
                    <p className="text-2xl font-bold">{overview.quickStats.systemsAnalyzed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completion</p>
                    <p className="text-2xl font-bold">{overview.summary.completionPercentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Opportunities
            </TabsTrigger>
            <TabsTrigger value="blueprint" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Blueprint
            </TabsTrigger>
            <TabsTrigger value="systems" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Systems
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{profile.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Strategic Initiatives</h4>
                    <div className="space-y-2">
                      {profile.strategicInitiatives.map((initiative) => (
                        <div key={initiative.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium">{initiative.title}</p>
                            <p className="text-sm text-muted-foreground">{initiative.timeline} • {initiative.budget}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={initiative.priority === 'High' ? 'destructive' : 'secondary'}>
                              {initiative.priority}
                            </Badge>
                            <Badge variant="outline">{initiative.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {overview.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="p-1 bg-primary/10 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {overview.progressIndicators.map((indicator, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{indicator.name}</span>
                          <Badge variant={indicator.status === 'On Track' ? 'default' : 'secondary'}>
                            {indicator.status}
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(indicator.current / indicator.target) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{indicator.current} {indicator.unit}</span>
                          <span>Target: {indicator.target} {indicator.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {overview.alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg border ${
                        alert.type === 'Success' ? 'bg-green-50 border-green-200' :
                        alert.type === 'Warning' ? 'bg-yellow-50 border-yellow-200' :
                        alert.type === 'Error' ? 'bg-red-50 border-red-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{alert.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                          <Badge variant="outline">{alert.type}</Badge>
                        </div>
                        {alert.actionRequired && (
                          <button className="mt-2 text-sm text-primary hover:underline">
                            {alert.actionText || 'Take Action'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab Content */}
          <TabsContent value="analysis" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  AI Readiness Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analysis Tab</h3>
                  <p className="text-muted-foreground">
                    Detailed AI readiness analysis, capability gaps, and recommendations will be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Opportunities Tab Content */}
          <TabsContent value="opportunities" className="mt-6">
            <AIOpportunitiesTab />
          </TabsContent>

          {/* AI Blueprint Tab Content */}
          <TabsContent value="blueprint" className="mt-6">
            <AIBlueprintTab />
          </TabsContent>

          {/* Systems Tab Content */}
          <TabsContent value="systems" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Systems Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Systems Tab</h3>
                  <p className="text-muted-foreground">
                    System inventory, integration map, and AI readiness assessment will be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab Content */}
          <TabsContent value="contacts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Contact Directory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Contacts Tab</h3>
                  <p className="text-muted-foreground">
                    Contact directory, teams, and stakeholder mapping will be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
