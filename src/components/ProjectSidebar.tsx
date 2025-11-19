import { Shield, Home, Search, Upload, Settings, FolderOpen } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ScrollArea } from "@/components/ui/scroll-area";

const projects = [
  { id: "1", name: "web-app", language: "TypeScript" },
  { id: "2", name: "api-server", language: "Python" },
  { id: "3", name: "mobile-app", language: "JavaScript" },
  { id: "4", name: "payment-service", language: "Go" },
];

export const ProjectSidebar = () => {
  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">SecureCode AI</span>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        <NavLink
          to="/"
          end
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
          activeClassName="bg-sidebar-accent text-primary font-medium"
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/findings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
          activeClassName="bg-sidebar-accent text-primary font-medium"
        >
          <Search className="h-4 w-4" />
          <span>Findings</span>
        </NavLink>
        <NavLink
          to="/scan"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
          activeClassName="bg-sidebar-accent text-primary font-medium"
        >
          <Upload className="h-4 w-4" />
          <span>New Scan</span>
        </NavLink>
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
          activeClassName="bg-sidebar-accent text-primary font-medium"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="flex-1 overflow-hidden">
        <div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Recent Projects
        </div>
        <ScrollArea className="h-full">
          <div className="px-4 space-y-1 pb-4">
            {projects.map((project) => (
              <button
                key={project.id}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
              >
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-muted-foreground">{project.language}</div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};
