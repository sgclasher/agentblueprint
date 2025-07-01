import { mockAIOpportunities } from "@/lib/mock-data";
import { AIOpportunity } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Zap, Target } from "lucide-react";

export function AIOpportunitiesTab() {
  const opportunities = mockAIOpportunities;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: AIOpportunity }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
        <Badge variant="secondary" className="w-fit">{opportunity.category}</Badge>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-muted-foreground text-sm">{opportunity.description}</p>
        
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>ROI: {opportunity.estimatedROI}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{opportunity.timeToImplement}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Complexity: <Badge variant="outline">{opportunity.complexityLevel}</Badge></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-purple-500" />
                <span>Pattern: <Badge variant="outline">{opportunity.recommendedPattern}</Badge></span>
            </div>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full">View Blueprint</Button>
      </div>
    </Card>
  );
} 