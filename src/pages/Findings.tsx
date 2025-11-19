import { ProjectSidebar } from "@/components/ProjectSidebar";
import { StatusPill } from "@/components/StatusPill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FileCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const findings = [
  { id: "1", cwe: "CWE-79", severity: "critical", file: "auth.ts", line: 42, confidence: 95, status: "open", title: "XSS Vulnerability" },
  { id: "2", cwe: "CWE-89", severity: "high", file: "db.ts", line: 128, confidence: 92, status: "open", title: "SQL Injection" },
  { id: "3", cwe: "CWE-352", severity: "high", file: "api.ts", line: 67, confidence: 88, status: "reviewing", title: "CSRF Token Missing" },
  { id: "4", cwe: "CWE-200", severity: "medium", file: "logger.ts", line: 34, confidence: 76, status: "open", title: "Information Exposure" },
  { id: "5", cwe: "CWE-798", severity: "critical", file: "config.ts", line: 12, confidence: 98, status: "open", title: "Hardcoded Credentials" },
  { id: "6", cwe: "CWE-522", severity: "high", file: "auth.ts", line: 89, confidence: 85, status: "fixed", title: "Weak Password Storage" },
  { id: "7", cwe: "CWE-327", severity: "medium", file: "crypto.ts", line: 23, confidence: 80, status: "open", title: "Weak Encryption" },
  { id: "8", cwe: "CWE-601", severity: "medium", file: "redirect.ts", line: 56, confidence: 72, status: "reviewing", title: "Open Redirect" },
];

type Severity = "critical" | "high" | "medium" | "low" | "info";

const Findings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <ProjectSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">Security Findings</h1>
            <p className="text-muted-foreground mt-2">Review and manage detected vulnerabilities</p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search findings..." 
                    className="pl-10"
                  />
                </div>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All CWEs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All CWEs</SelectItem>
                    <SelectItem value="cwe-79">CWE-79 (XSS)</SelectItem>
                    <SelectItem value="cwe-89">CWE-89 (SQLi)</SelectItem>
                    <SelectItem value="cwe-352">CWE-352 (CSRF)</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Confidence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Confidence</SelectItem>
                    <SelectItem value="high">High (90%+)</SelectItem>
                    <SelectItem value="medium">Medium (70-89%)</SelectItem>
                    <SelectItem value="low">Low (&lt;70%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                All Findings ({findings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CWE</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead className="text-center">Confidence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {findings.map((finding) => (
                    <TableRow 
                      key={finding.id} 
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => navigate(`/findings/${finding.id}`)}
                    >
                      <TableCell className="font-mono text-sm">{finding.cwe}</TableCell>
                      <TableCell>
                        <StatusPill severity={finding.severity as Severity} />
                      </TableCell>
                      <TableCell className="font-medium">{finding.title}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {finding.file}:{finding.line}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 max-w-[60px]">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${finding.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{finding.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          finding.status === "open" ? "bg-critical/20 text-critical" :
                          finding.status === "reviewing" ? "bg-warning/20 text-warning" :
                          "bg-success/20 text-success"
                        }`}>
                          {finding.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
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

export default Findings;
