import { ProjectSidebar } from "@/components/ProjectSidebar";
import { StatusPill } from "@/components/StatusPill";
import { OllamaBadge } from "@/components/OllamaBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, CheckCircle, XCircle, HelpCircle, Copy, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const codeSnippet = `// auth.ts - Line 42
function authenticateUser(username, password) {
  // Vulnerable: Direct DOM manipulation with user input
  document.getElementById("welcome").innerHTML = 
    "<h1>Welcome, " + username + "!</h1>";
  
  // This allows XSS attacks if username contains malicious code
  const query = "SELECT * FROM users WHERE name='" + username + "'";
  return database.execute(query);
}`;

const FindingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFeedback = (type: string) => {
    setFeedback(type);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ProjectSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/findings")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Findings
            </Button>
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Cross-Site Scripting (XSS) Vulnerability</h1>
                <StatusPill severity="critical" />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono">CWE-79</span>
                <span>•</span>
                <span className="font-mono">auth.ts:42</span>
                <span>•</span>
                <span>Confidence: 95%</span>
              </div>
            </div>
            <OllamaBadge />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Code Viewer */}
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Vulnerable Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <ScrollArea className="h-[400px]">
                      <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
                        <code className="text-foreground">
                          {codeSnippet.split('\n').map((line, i) => (
                            <div 
                              key={i} 
                              className={i === 3 || i === 4 ? "bg-critical/20 border-l-4 border-critical px-2 -mx-2" : ""}
                            >
                              <span className="text-muted-foreground select-none mr-4">{i + 1}</span>
                              {line}
                            </div>
                          ))}
                        </code>
                      </pre>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">CVSS Score</div>
                      <div className="text-2xl font-bold text-critical">9.8</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Attack Vector</div>
                      <div className="text-sm font-semibold">Network</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">CWE Categories</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">CWE-79: XSS</Badge>
                      <Badge variant="outline">CWE-116: Encoding</Badge>
                      <Badge variant="outline">OWASP A03:2021</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: AI Analysis */}
            <div className="space-y-6">
              <Card className="card-elevated border-primary/50 glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Vulnerability Explanation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This code is vulnerable to Cross-Site Scripting (XSS) attacks. The application directly 
                      inserts user-supplied data (username) into the DOM using innerHTML without proper 
                      sanitization or encoding. An attacker can inject malicious JavaScript code through 
                      the username parameter, which will be executed in the victim's browser.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Attack Scenario</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      An attacker could set username to: <code className="bg-muted px-1 rounded">
                      &lt;img src=x onerror=alert('XSS')&gt;</code> which would execute arbitrary JavaScript 
                      in the context of your application, potentially stealing session tokens, credentials, 
                      or performing actions on behalf of the user.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Recommended Fix</h4>
                    <ScrollArea className="h-[200px]">
                      <pre className="text-sm bg-success/10 border border-success/30 p-4 rounded-lg">
                        <code className="text-foreground">
{`// Use textContent instead of innerHTML
function authenticateUser(username, password) {
  const element = document.getElementById("welcome");
  const heading = document.createElement("h1");
  heading.textContent = "Welcome, " + username + "!";
  element.appendChild(heading);
  
  // Use parameterized queries
  const query = "SELECT * FROM users WHERE name=?";
  return database.execute(query, [username]);
}`}
                        </code>
                      </pre>
                    </ScrollArea>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button className="w-full gap-2 glow-primary">
                      <CheckCircle className="h-4 w-4" />
                      Apply Fix Automatically
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Developer Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Help improve our AI by marking this finding:
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant={feedback === "tp" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => handleFeedback("tp")}
                    >
                      <CheckCircle className="h-4 w-4" />
                      True Positive
                    </Button>
                    <Button
                      variant={feedback === "fp" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => handleFeedback("fp")}
                    >
                      <XCircle className="h-4 w-4" />
                      False Positive
                    </Button>
                    <Button
                      variant={feedback === "unsure" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => handleFeedback("unsure")}
                    >
                      <HelpCircle className="h-4 w-4" />
                      Not Sure
                    </Button>
                  </div>
                  {feedback && (
                    <p className="text-sm text-success mt-3">
                      ✓ Thank you for your feedback!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindingDetail;
