import { ProjectSidebar } from "@/components/ProjectSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Code, GitBranch, Play, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false);
      navigate("/findings");
    }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ProjectSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">New Security Scan</h1>
            <p className="text-muted-foreground mt-2">Upload code, paste snippets, or connect to a repository</p>
          </div>

          <div className="max-w-4xl">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Scan Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="paste" className="gap-2">
                      <Code className="h-4 w-4" />
                      Paste Code
                    </TabsTrigger>
                    <TabsTrigger value="git" className="gap-2">
                      <GitBranch className="h-4 w-4" />
                      Git Repository
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4 mt-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                      <p className="text-sm text-muted-foreground">
                        Supports .zip, .tar.gz, or individual source files
                      </p>
                      <Button variant="outline" className="mt-4">
                        Select Files
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="paste" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="code">Paste your code</Label>
                      <Textarea 
                        id="code"
                        placeholder="Paste your source code here..."
                        className="min-h-[300px] font-mono text-sm mt-2"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="git" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="git-url">Repository URL</Label>
                      <Input 
                        id="git-url"
                        placeholder="https://github.com/username/repository.git"
                        className="mt-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="branch">Branch</Label>
                        <Input 
                          id="branch"
                          placeholder="main"
                          defaultValue="main"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="token">Access Token (optional)</Label>
                        <Input 
                          id="token"
                          type="password"
                          placeholder="ghp_xxxxxxxxxxxx"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-6 border-t border-border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="language">Language (Auto-detect)</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger id="language" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto-detect</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="go">Go</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="csharp">C#</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="scan-depth">Scan Depth</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger id="scan-depth" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">Quick (Fast)</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="deep">Deep (Thorough)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full gap-2 glow-primary"
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Start Security Scan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scan;
