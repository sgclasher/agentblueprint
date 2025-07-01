import { mockAIBlueprint } from "@/lib/mock-data";
import { AIBlueprint } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Briefcase, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  Flag, 
  Users, 
  Calendar, 
  CheckCircle,
  TrendingUp,
  Target,
  AlertTriangle
} from "lucide-react";

export function AIBlueprintTab() {
  const blueprint = mockAIBlueprint;

  if (!blueprint) {
    return <div>No blueprint available.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DigitalTeamCard team={blueprint.digitalTeam} />
        <ImplementationPlanCard plan={blueprint.implementation} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <ExecutiveSummaryCard summary={blueprint.executiveSummary} />
        <RiskAndSuccessCard risk={blueprint.riskAssessment} success={blueprint.successCriteria} />
      </div>
    </div>
  );
}

function ExecutiveSummaryCard({ summary }: { summary: AIBlueprint['executiveSummary'] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" /> Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{summary.overview}</p>
          <div className="space-y-3 pt-2">
            <h4 className="font-semibold">ROI Projection</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-green-500" />Annual Value: <span className="font-bold">{summary.expectedROI.annualValue}</span></div>
                <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-500" />ROI: <span className="font-bold">{summary.expectedROI.roiPercentage}%</span></div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" />Investment: <span className="font-bold">{summary.expectedROI.totalInvestment}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-500" />Payback: <span className="font-bold">{summary.expectedROI.paybackMonths} months</span></div>
            </div>
          </div>
           <div className="pt-2">
            <Button className="w-full">Download Full Business Case</Button>
           </div>
        </CardContent>
      </Card>
    );
}

function DigitalTeamCard({ team }: { team: AIBlueprint['digitalTeam'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" /> AI Digital Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="p-3 bg-muted/50 rounded-lg">
            <p className="font-semibold">{member.name} <Badge variant="secondary">{member.role}</Badge></p>
            <p className="text-sm text-muted-foreground mt-1">{member.interactionPattern}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ImplementationPlanCard({ plan }: { plan: AIBlueprint['implementation'] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" /> Implementation Plan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {plan.phases.map((phase, index) => (
                        <div key={phase.id} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">{index + 1}</div>
                                {index < plan.phases.length - 1 && <div className="w-px h-12 bg-border mt-2"></div>}
                            </div>
                            <div>
                                <p className="font-semibold">{phase.name} <span className="text-muted-foreground font-normal">({phase.durationWeeks} weeks)</span></p>
                                <p className="text-sm text-muted-foreground">{phase.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {phase.deliverables.map(d => <Badge key={d} variant="outline">{d}</Badge>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


function RiskAndSuccessCard({ risk, success }: { risk: AIBlueprint['riskAssessment'], success: AIBlueprint['successCriteria'] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Risks & Success</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> Key Risks</h4>
                <div className="space-y-2">
                    {risk.technicalRisks.map((r, i) => (
                        <p key={i} className="text-sm text-muted-foreground p-2 bg-muted/50 rounded-md">{r.description}</p>
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-green-500" /> Success Metrics</h4>
                <div className="space-y-2">
                    {success.kpis.map((kpi) => (
                       <p key={kpi.name} className="text-sm text-muted-foreground p-2 bg-muted/50 rounded-md">
                           <strong>{kpi.name}:</strong> Target {kpi.target} (from {kpi.baseline})
                       </p>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    );
} 