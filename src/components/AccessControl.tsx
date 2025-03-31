
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertTriangle, 
  Calendar, 
  Check, 
  ClipboardList, 
  Clock, 
  Eye, 
  FileLock, 
  FileText, 
  Lock, 
  Shield, 
  Trash2, 
  User, 
  X 
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Sample data for access permissions
const accessRequests = [
  {
    id: "REQ-001",
    requester: "Dr. Emily Taylor",
    role: "Cardiologist",
    requestedAt: "2 hours ago",
    status: "pending",
    accessLevel: "Full Medical History",
    duration: "7 days",
  },
  {
    id: "REQ-002",
    requester: "Dr. Michael Wong",
    role: "Neurologist",
    requestedAt: "1 day ago",
    status: "approved",
    accessLevel: "Neurological Records",
    duration: "30 days",
  },
  {
    id: "REQ-003",
    requester: "Dr. Sarah Johnson",
    role: "Primary Care",
    requestedAt: "3 days ago",
    status: "approved",
    accessLevel: "Full Medical History",
    duration: "1 year",
  },
  {
    id: "REQ-004",
    requester: "Research Study #752",
    role: "Medical Research",
    requestedAt: "1 week ago",
    status: "rejected",
    accessLevel: "Anonymized Data",
    duration: "One-time",
  },
];

const activePermissions = [
  {
    id: "PERM-001",
    grantedTo: "Dr. Michael Wong",
    role: "Neurologist",
    grantedAt: "1 day ago",
    expiration: "29 days remaining",
    accessLevel: "Neurological Records",
    lastAccessed: "2 hours ago",
  },
  {
    id: "PERM-002",
    grantedTo: "Dr. Sarah Johnson",
    role: "Primary Care",
    grantedAt: "3 days ago",
    expiration: "362 days remaining",
    accessLevel: "Full Medical History",
    lastAccessed: "Yesterday",
  },
  {
    id: "PERM-003",
    grantedTo: "Dr. Robert Chen",
    role: "Endocrinologist",
    grantedAt: "2 weeks ago",
    expiration: "14 days remaining",
    accessLevel: "Metabolic Records",
    lastAccessed: "5 days ago",
  },
];

const AccessControl = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
        <p className="text-muted-foreground">
          Manage permissions for who can access your healthcare records
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="mr-2 h-5 w-5 text-healthblue-500" />
              Access Requests
            </CardTitle>
            <CardDescription>
              Review and manage requests to access your health data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {accessRequests.filter(req => req.status === "pending").length > 0 ? (
              <Alert className="mb-4 bg-healthorange-50 border-healthorange-200">
                <AlertTriangle className="h-4 w-4 text-healthorange-500" />
                <AlertTitle className="text-healthorange-700">Pending Requests</AlertTitle>
                <AlertDescription className="text-healthorange-600">
                  You have {accessRequests.filter(req => req.status === "pending").length} pending access requests that require your attention.
                </AlertDescription>
              </Alert>
            ) : null}
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requester</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessRequests.map((request) => (
                    <TableRow key={request.id} 
                      className={request.status === "pending" ? "bg-healthorange-50" : ""}
                      onClick={() => setSelectedRequestId(request.id === selectedRequestId ? null : request.id)}
                    >
                      <TableCell>
                        <div className="font-medium">{request.requester}</div>
                        <div className="text-xs text-muted-foreground">{request.role}</div>
                      </TableCell>
                      <TableCell>
                        <div>{request.accessLevel}</div>
                        <div className="text-xs text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {request.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            request.status === "approved" ? "bg-healthgreen-100 text-healthgreen-800 hover:bg-healthgreen-100" :
                            request.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                            "bg-healthorange-100 text-healthorange-800 hover:bg-healthorange-100"
                          }
                        >
                          {request.status === "approved" ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : request.status === "rejected" ? (
                            <X className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === "pending" ? (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                              <Check className="mr-1 h-3 w-3 text-healthgreen-500" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                              <X className="mr-1 h-3 w-3 text-red-500" />
                              Deny
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" className="h-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {selectedRequestId && (
              <div className="mt-4 p-4 rounded-lg border bg-muted/50">
                <h4 className="font-medium mb-2">Request Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Request ID:</div>
                  <div className="font-mono">{selectedRequestId}</div>
                  <div className="text-muted-foreground">Requested At:</div>
                  <div>{accessRequests.find(r => r.id === selectedRequestId)?.requestedAt}</div>
                  <div className="text-muted-foreground">Purpose:</div>
                  <div>Treatment and diagnosis</div>
                  <div className="text-muted-foreground">Blockchain Verification:</div>
                  <div className="flex items-center">
                    <Shield className="text-healthgreen-500 h-3 w-3 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-healthblue-500" />
              Create Access Permission
            </CardTitle>
            <CardDescription>
              Grant access to your health records with custom permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grant Access To</label>
                <Input placeholder="Doctor or institution ID" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Access Level</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start h-auto py-2">
                    <FileLock className="h-4 w-4 mr-2 text-healthblue-500" />
                    <div className="text-left">
                      <div className="font-medium">Full Access</div>
                      <div className="text-xs text-muted-foreground">Complete medical history</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-2">
                    <FileText className="h-4 w-4 mr-2 text-healthblue-500" />
                    <div className="text-left">
                      <div className="font-medium">Partial Access</div>
                      <div className="text-xs text-muted-foreground">Specific records only</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start h-auto py-2">
                    <Calendar className="h-4 w-4 mr-2 text-healthblue-500" />
                    <div className="text-left">
                      <div className="font-medium">Time Limited</div>
                      <div className="text-xs text-muted-foreground">Set expiration date</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-2">
                    <User className="h-4 w-4 mr-2 text-healthblue-500" />
                    <div className="text-left">
                      <div className="font-medium">Conditional</div>
                      <div className="text-xs text-muted-foreground">Based on conditions</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <Button className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Create Secure Access Permission
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                All permissions are recorded on the blockchain and can be revoked at any time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-healthblue-500" />
            Active Access Permissions
          </CardTitle>
          <CardDescription>
            Currently active permissions for your health records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Granted To</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Last Accessed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div className="font-medium">{permission.grantedTo}</div>
                      <div className="text-xs text-muted-foreground">{permission.role}</div>
                    </TableCell>
                    <TableCell>
                      <div>{permission.accessLevel}</div>
                      <div className="text-xs text-muted-foreground">
                        Granted {permission.grantedAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-healthblue-50 text-healthblue-800 hover:bg-healthblue-50">
                        <Clock className="mr-1 h-3 w-3" />
                        {permission.expiration}
                      </Badge>
                    </TableCell>
                    <TableCell>{permission.lastAccessed}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium flex items-center">
              <Shield className="mr-2 h-4 w-4 text-healthblue-500" />
              Access Audit Log
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              All access events are securely logged on the Aleph Zero blockchain for transparency and auditability.
            </p>
            <Button variant="link" size="sm" className="px-0 h-auto">
              View complete access history
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControl;
