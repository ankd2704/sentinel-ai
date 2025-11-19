import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ScanCard } from "@/components/ScanCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusPill } from "@/components/StatusPill";
import { Play, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentScans = [
  { id: "1", project: "web-app", date: "2024-01-15 14:23", findings: 12, critical: 2, high: 5, medium: 3, low: 2 },
  { id: "2", project: "api-server", date: "2024-01-15 11:45", findings: 8, critical: 1, high: 3, medium: 2, low: 2 },
  { id: "3", project: "mobile-app", date: "2024-01-14 18:30", findings: 15, critical: 3, high: 6, medium: 4, low: 2 },
  { id: "4", project: "payment-service", date: "2024-01-14 09:12", findings: 5, critical: 0, high: 2, medium: 2, low: 1 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <ProjectSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-2">Security scan overview and project insights</p>
            </div>
            <Button 
              size="lg" 
              className="gap-2 glow-primary hover:scale-105 transition-smooth"
              onClick={() => navigate("/scan")}
            >
              <Play className="h-4 w-4" />
              Start New Scan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScanCard severity="critical" count={6} title="Critical Issues" />
            <ScanCard severity="high" count={16} title="High Severity" />
            <ScanCard severity="medium" count={11} title="Medium Severity" />
            <ScanCard severity="low" count={7} title="Low Severity" />
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Total Findings</TableHead>
                    <TableHead className="text-center">Critical</TableHead>
                    <TableHead className="text-center">High</TableHead>
                    <TableHead className="text-center">Medium</TableHead>
                    <TableHead className="text-center">Low</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentScans.map((scan) => (
                    <TableRow key={scan.id} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell className="font-medium">{scan.project}</TableCell>
                      <TableCell className="text-muted-foreground">{scan.date}</TableCell>
                      <TableCell className="text-center font-semibold">{scan.findings}</TableCell>
                      <TableCell className="text-center">
                        {scan.critical > 0 && <span className="text-critical font-semibold">{scan.critical}</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {scan.high > 0 && <span className="text-destructive font-semibold">{scan.high}</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {scan.medium > 0 && <span className="text-warning font-semibold">{scan.medium}</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {scan.low > 0 && <span className="text-secondary font-semibold">{scan.low}</span>}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate("/findings")}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
