
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, BrainCircuit, Heart, Info, Shield, UserSearch } from "lucide-react";

// Sample data for visualization
const riskData = [
  { name: "Diabetes", risk: 75, max: 100 },
  { name: "Heart Disease", risk: 45, max: 100 },
  { name: "Stroke", risk: 30, max: 100 },
  { name: "Hypertension", risk: 60, max: 100 },
  { name: "Obesity", risk: 40, max: 100 },
];

const modelAccuracyData = [
  { name: "Diabetes", value: 92 },
  { name: "Heart Disease", value: 88 },
  { name: "Stroke", value: 85 },
  { name: "Hypertension", value: 91 },
  { name: "Obesity", value: 89 },
];

const COLORS = ['#0EA5E9', '#10B981', '#F97316', '#9333EA', '#EC4899'];

const AIPredictor = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Health Predictor</h1>
        <p className="text-muted-foreground">
          Analyze patient data with privacy-preserving AI to predict health risks
        </p>
      </div>
      
      <Alert className="bg-healthblue-50 border-healthblue-200">
        <Shield className="h-4 w-4 text-healthblue-500" />
        <AlertTitle className="text-healthblue-700">Privacy-Preserving Analysis</AlertTitle>
        <AlertDescription className="text-healthblue-600">
          All AI predictions use Zero-Knowledge Proofs to analyze patient data without exposing sensitive information.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Patient Risk Analysis</CardTitle>
            <CardDescription>
              Select a patient to analyze their health data and predict risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-2/3">
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Johnson (PAT-8762)</SelectItem>
                    <SelectItem value="maria">Maria Garcia (PAT-5439)</SelectItem>
                    <SelectItem value="robert">Robert Chen (PAT-3217)</SelectItem>
                    <SelectItem value="sophia">Sophia Williams (PAT-7891)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full md:w-1/3">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Run AI Analysis
              </Button>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={riskData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}% Risk`, 'Risk Score']}
                    labelStyle={{ color: '#1A1F2C' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar
                    dataKey="risk"
                    fill="#0EA5E9"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {selectedPatient && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-healthblue-500" />
                  AI Recommendations
                </h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-healthblue-100 text-healthblue-700 p-1 rounded-full mr-2 mt-0.5">
                      <Info className="h-3 w-3" />
                    </span>
                    <span>
                      <strong>Diabetes Risk (75%):</strong> Schedule HbA1c test and consider nutrition counseling
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-healthblue-100 text-healthblue-700 p-1 rounded-full mr-2 mt-0.5">
                      <Info className="h-3 w-3" />
                    </span>
                    <span>
                      <strong>Hypertension Risk (60%):</strong> Monitor blood pressure weekly and reduce sodium intake
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-healthblue-100 text-healthblue-700 p-1 rounded-full mr-2 mt-0.5">
                      <Info className="h-3 w-3" />
                    </span>
                    <span>
                      <strong>General:</strong> Increase physical activity to 150 minutes per week
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
            <CardDescription>
              Accuracy metrics for the prediction models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelAccuracyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {modelAccuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                    labelStyle={{ color: '#1A1F2C' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                <span>Average Model Accuracy</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-healthblue-500 rounded-full"
                  style={{ width: "89%" }}
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Federated Learning Update: Last trained 3 days ago with data from 152 anonymized patient records.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="patient">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="patient">Patient Analysis</TabsTrigger>
          <TabsTrigger value="population">Population Health</TabsTrigger>
          <TabsTrigger value="trends">Health Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="patient" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserSearch className="mr-2 h-5 w-5 text-healthblue-500" />
                Patient-Specific Analysis
              </CardTitle>
              <CardDescription>
                Generate detailed health predictions for individual patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient ID</label>
                    <Input placeholder="Enter patient ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Analysis Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select analysis type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        <SelectItem value="cardiac">Cardiac Risk</SelectItem>
                        <SelectItem value="metabolic">Metabolic</SelectItem>
                        <SelectItem value="neurological">Neurological</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Frame</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time frame" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="5year">5 Years</SelectItem>
                        <SelectItem value="10year">10 Years</SelectItem>
                        <SelectItem value="lifetime">Lifetime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  <Heart className="mr-2 h-4 w-4" />
                  Generate Health Prediction
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="population" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Population Health Analytics</CardTitle>
              <CardDescription>
                Analyze aggregated anonymous data for population health insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Population health analytics use anonymized data with zero-knowledge proofs to protect individual privacy while providing valuable insights.
              </p>
              {/* Population health analytics content would go here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends Analysis</CardTitle>
              <CardDescription>
                View emerging health trends and predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Health trends provide insights into emerging patterns while maintaining patient confidentiality.
              </p>
              {/* Health trends content would go here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPredictor;
