
import { Search, Filter, Plus, ChevronDown, User, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PatientRecords = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
        <p className="text-muted-foreground">
          Securely manage and access patient health records on the blockchain
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients by name, ID, or condition..."
            className="pl-8 w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Patients</DropdownMenuItem>
              <DropdownMenuItem>Recent Activity</DropdownMenuItem>
              <DropdownMenuItem>Access Granted</DropdownMenuItem>
              <DropdownMenuItem>High Risk Patients</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared With Me</TabsTrigger>
          <TabsTrigger value="flagged">AI Flagged</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader className="px-6 pt-6 pb-4">
              <CardTitle>Patient Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 border-b bg-muted/50 text-sm font-medium">
                  <div className="col-span-2">Patient</div>
                  <div>Patient ID</div>
                  <div>Records</div>
                  <div>Last Updated</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      name: "Alex Johnson",
                      avatar: "AJ",
                      id: "PAT-8762",
                      records: 24,
                      lastUpdated: "Today",
                      status: "Active",
                    },
                    {
                      name: "Maria Garcia",
                      avatar: "MG",
                      id: "PAT-5439",
                      records: 18,
                      lastUpdated: "Yesterday",
                      status: "Active",
                    },
                    {
                      name: "Robert Chen",
                      avatar: "RC",
                      id: "PAT-3217",
                      records: 32,
                      lastUpdated: "3 days ago",
                      status: "Pending",
                    },
                    {
                      name: "Sophia Williams",
                      avatar: "SW",
                      id: "PAT-7891",
                      records: 12,
                      lastUpdated: "1 week ago",
                      status: "Active",
                    },
                    {
                      name: "James Wilson",
                      avatar: "JW",
                      id: "PAT-4562",
                      records: 8,
                      lastUpdated: "2 weeks ago",
                      status: "Inactive",
                    },
                    {
                      name: "Emily Taylor",
                      avatar: "ET",
                      id: "PAT-6374",
                      records: 15,
                      lastUpdated: "3 days ago",
                      status: "Active",
                    },
                    {
                      name: "David Moore",
                      avatar: "DM",
                      id: "PAT-2193",
                      records: 27,
                      lastUpdated: "Yesterday",
                      status: "Active",
                    },
                    {
                      name: "Isabella Lopez",
                      avatar: "IL",
                      id: "PAT-8419",
                      records: 5,
                      lastUpdated: "Today",
                      status: "New",
                    },
                  ].map((patient, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 p-4 text-sm items-center"
                    >
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-healthblue-100 text-healthblue-700">
                            {patient.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.status}
                          </p>
                        </div>
                      </div>
                      <div className="font-mono text-sm">{patient.id}</div>
                      <div>{patient.records} records</div>
                      <div>{patient.lastUpdated}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Displaying patients you've accessed in the last 7 days
              </p>
              {/* Recently accessed patients would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Patients who have granted you access to their records
              </p>
              {/* Shared patients would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flagged" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Flagged Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Patients flagged by the AI for potential health risks
              </p>
              {/* Flagged patients would go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecords;
