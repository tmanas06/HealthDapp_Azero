
import { Activity, Shield, Users, AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your healthcare blockchain system and AI predictions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value="1,284"
          description="Active patient records"
          icon={<Users className="h-5 w-5 text-healthblue-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Health Records"
          value="5,721"
          description="Securely stored on blockchain"
          icon={<Shield className="h-5 w-5 text-healthblue-500" />}
          trend={{ value: 24, isPositive: true }}
        />
        <StatsCard
          title="AI Predictions"
          value="843"
          description="Risk assessments completed"
          icon={<Activity className="h-5 w-5 text-healthblue-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Privacy Alerts"
          value="2"
          description="Pending resolution"
          icon={<AlertCircle className="h-5 w-5 text-destructive" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
            <CardDescription>
              Latest updates from patient interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  patient: "Alex Johnson",
                  action: "Medical record updated",
                  time: "10 minutes ago",
                  status: "completed",
                },
                {
                  id: 2,
                  patient: "Maria Garcia",
                  action: "Granted access to Dr. Smith",
                  time: "42 minutes ago",
                  status: "processing",
                },
                {
                  id: 3,
                  patient: "Robert Chen",
                  action: "AI risk assessment completed",
                  time: "1 hour ago",
                  status: "completed",
                },
                {
                  id: 4,
                  patient: "Sophia Williams",
                  action: "Added new medical history",
                  time: "3 hours ago",
                  status: "completed",
                },
                {
                  id: 5,
                  patient: "James Wilson",
                  action: "Revoked access from Dr. Brown",
                  time: "5 hours ago",
                  status: "completed",
                },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-2 rounded-full mr-3 ${
                        activity.status === "completed"
                          ? "bg-healthgreen-500"
                          : "bg-healthorange-500 animate-pulse"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{activity.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View all activity
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Blockchain and AI system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Blockchain Sync</span>
                  <span className="text-sm font-medium text-healthgreen-500">98%</span>
                </div>
                <Progress value={98} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Last block: #4,128,573 (2 minutes ago)
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Model Training</span>
                  <span className="text-sm font-medium text-healthblue-500">76%</span>
                </div>
                <Progress value={76} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Next update: 2 hours (Federated Learning)
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm font-medium text-healthgreen-500">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Running for 124 days without interruption
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ZKP Verification Speed</span>
                  <span className="text-sm font-medium text-healthorange-500">84%</span>
                </div>
                <Progress value={84} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Average verification time: 2.3 seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Blockchain Transactions</CardTitle>
            <CardDescription>
              The most recent transactions on Aleph Zero blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-3 border-b bg-muted/50 text-sm font-medium">
                <div>Transaction Hash</div>
                <div>Type</div>
                <div>From</div>
                <div>To</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {[
                  {
                    hash: "0x8a7d...3f2d",
                    type: "Record Update",
                    from: "0x8e23...9f5a",
                    to: "0x2b54...1e7c",
                    status: "Confirmed",
                  },
                  {
                    hash: "0x3c4e...9a8b",
                    type: "Access Grant",
                    from: "0x7c98...4d2e",
                    to: "0x6f32...8c7a",
                    status: "Confirmed",
                  },
                  {
                    hash: "0x5f9b...2e7d",
                    type: "ZKP Verification",
                    from: "0x4a3d...7e9c",
                    to: "System",
                    status: "Confirmed",
                  },
                  {
                    hash: "0x1d9e...6c3b",
                    type: "AI Analysis",
                    from: "System",
                    to: "0x9c4e...2d5f",
                    status: "Pending",
                  },
                  {
                    hash: "0x7b2c...4e8a",
                    type: "Access Revoke",
                    from: "0x3f5d...1a9e",
                    to: "0x8d2c...7f3e",
                    status: "Confirmed",
                  },
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 p-3 text-sm items-center"
                  >
                    <div className="font-mono">{tx.hash}</div>
                    <div>{tx.type}</div>
                    <div className="truncate">{tx.from}</div>
                    <div className="truncate">{tx.to}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === "Confirmed"
                            ? "bg-healthgreen-100 text-healthgreen-800"
                            : "bg-healthorange-100 text-healthorange-800"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View all transactions
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
