
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  CircleOff,
  Eye,
  EyeOff,
  FileCheck,
  FileLock,
  Lock,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

const ZeroKnowledge = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleVerify = () => {
    setIsVerifying(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setIsVerified(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetDemo = () => {
    setIsVerifying(false);
    setIsVerified(false);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Zero-Knowledge Proofs
        </h1>
        <p className="text-muted-foreground">
          Verify health information without revealing sensitive data
        </p>
      </div>

      <Alert className="bg-healthblue-50 border-healthblue-200">
        <Shield className="h-4 w-4 text-healthblue-500" />
        <AlertTitle className="text-healthblue-700">Privacy-First Technology</AlertTitle>
        <AlertDescription className="text-healthblue-600">
          Zero-Knowledge Proofs allow verification of health information without revealing the actual data, preserving patient privacy while enabling secure analysis.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileLock className="mr-2 h-5 w-5 text-healthblue-500" />
              How Zero-Knowledge Proofs Work
            </CardTitle>
            <CardDescription>
              Understanding the technology behind privacy-preserving verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-healthblue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Patient (Prover)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Holds the sensitive health data and wants to prove something about it without revealing the actual data.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center my-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground"
                >
                  <path
                    d="M12 5V19M12 19L19 12M12 19L5 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-healthblue-600" />
                </div>
                <div>
                  <h4 className="font-medium">ZKP Protocol</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mathematical process that creates a proof verifying a statement is true without revealing any information beyond that.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center my-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground"
                >
                  <path
                    d="M12 5V19M12 19L19 12M12 19L5 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-5 w-5 text-healthblue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Verifier</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can verify the proof is valid but gains no knowledge about the actual health data, maintaining privacy.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Key Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-healthgreen-100 flex items-center justify-center mr-2 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-healthgreen-600" />
                    </span>
                    <span>Complete privacy of sensitive health information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-healthgreen-100 flex items-center justify-center mr-2 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-healthgreen-600" />
                    </span>
                    <span>Mathematically verifiable proofs on the blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-healthgreen-100 flex items-center justify-center mr-2 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-healthgreen-600" />
                    </span>
                    <span>Enables secure data sharing with third parties</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5 text-healthblue-500" />
              Interactive Demo
            </CardTitle>
            <CardDescription>
              See zero-knowledge proofs in action with this interactive demonstration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-muted space-y-3">
                <h4 className="font-medium">Patient Health Statement</h4>
                <p className="text-sm">
                  I want to prove that my cholesterol level is within healthy range (
                  <span className="font-semibold">below 200 mg/dL</span>) without revealing my actual cholesterol number.
                </p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-healthblue-500">Patient Data</Badge>
                  <Badge variant="outline">
                    <EyeOff className="h-3 w-3 mr-1" />
                    <span className="blur-sm">178 mg/dL</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    (This value is hidden in a real system)
                  </span>
                </div>
              </div>

              <div className="border rounded-lg divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <CircleOff className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <h4 className="font-medium">1. Data Privacy</h4>
                      <p className="text-xs text-muted-foreground">
                        Exact cholesterol value remains private
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1 bg-healthgreen-50 text-healthgreen-700 border-healthgreen-200">
                    <Check />
                    Protected
                  </Badge>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <h4 className="font-medium">2. Generate ZK Proof</h4>
                      <p className="text-xs text-muted-foreground">
                        Cryptographic proof that value is below 200
                      </p>
                    </div>
                  </div>
                  {!isVerifying && !isVerified ? (
                    <Button size="sm" onClick={handleVerify}>
                      Generate Proof
                    </Button>
                  ) : isVerifying ? (
                    <div className="w-24">
                      <Progress value={progress} className="h-2" />
                    </div>
                  ) : (
                    <Badge variant="outline" className="gap-1 bg-healthgreen-50 text-healthgreen-700 border-healthgreen-200">
                      <Check />
                      Generated
                    </Badge>
                  )}
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-muted-foreground mr-2" />
                    <div>
                      <h4 className="font-medium">3. Verify Statement</h4>
                      <p className="text-xs text-muted-foreground">
                        Confirm cholesterol is in healthy range
                      </p>
                    </div>
                  </div>
                  {isVerified ? (
                    <Badge className="bg-healthgreen-500 text-white gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Waiting for proof
                    </Badge>
                  )}
                </div>
              </div>

              {isVerified && (
                <Alert className="bg-healthgreen-50 border-healthgreen-200">
                  <ShieldCheck className="h-4 w-4 text-healthgreen-500" />
                  <AlertTitle className="text-healthgreen-700">Verification Successful</AlertTitle>
                  <AlertDescription className="text-healthgreen-600">
                    Successfully verified that the patient's cholesterol is within healthy range without revealing the actual value.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  This demonstration simulates the ZKP verification process.
                </p>
                {(isVerifying || isVerified) && (
                  <Button variant="outline" size="sm" onClick={resetDemo}>
                    Reset Demo
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ZKP Use Cases in Healthcare</CardTitle>
          <CardDescription>
            Real-world applications of zero-knowledge proofs in healthcare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-healthblue-600" />
              </div>
              <h3 className="font-medium">Patient Privacy</h3>
              <p className="text-sm text-muted-foreground">
                Patients can prove eligibility for specific treatments or insurance coverage without exposing their complete medical history.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-healthblue-600" />
              </div>
              <h3 className="font-medium">Medical Research</h3>
              <p className="text-sm text-muted-foreground">
                Researchers can verify data meets criteria and analyze trends while preserving participant anonymity and confidentiality.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-healthblue-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-healthblue-600" />
              </div>
              <h3 className="font-medium">AI Training</h3>
              <p className="text-sm text-muted-foreground">
                AI models can be trained on verified health outcomes without exposing or storing the underlying sensitive patient data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZeroKnowledge;
