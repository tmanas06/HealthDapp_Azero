import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useContext, createContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Laptop, ShieldCheck, KeyRound, LogOut, RefreshCw, Settings } from "lucide-react";

const SecurityContext = createContext(null);

export default function SecuritySettingsPage() {
  const { toast } = useToast();
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [antiPhishingEnabled, setAntiPhishingEnabled] = useState(false);
  const [antiPhishingCode, setAntiPhishingCode] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [sessions, setSessions] = useState([]);

  // Get device info
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return {
      device: `${platform} (${userAgent.split(')')[0].split('(')[1] || 'Unknown OS'})`,
      language,
      timezone
    };
  };

  // Generate anti-phishing code
  const generateAntiPhishingCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Load sessions and security settings
  useEffect(() => {
    // Load current session
    const deviceInfo = getDeviceInfo();
    const currentSession = {
      id: Date.now(),
      device: deviceInfo.device,
      location: deviceInfo.timezone,
      ip: "192.168.1.1", // Would be fetched from API in production
      status: "Online",
      active: true,
      lastActive: new Date().toISOString()
    };

    // Load other sessions from storage
    const storedSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    setSessions([currentSession, ...storedSessions]);

    // Load security settings
    const storedCode = localStorage.getItem('antiPhishingCode');
    if (storedCode) {
      setAntiPhishingCode(storedCode);
      setAntiPhishingEnabled(true);
    } else {
      const newCode = generateAntiPhishingCode();
      setAntiPhishingCode(newCode);
      localStorage.setItem('antiPhishingCode', newCode);
    }

    const storedQuestion = localStorage.getItem('securityQuestion');
    if (storedQuestion) setSecurityQuestion(storedQuestion);
    
    const storedAnswer = localStorage.getItem('securityAnswer');
    if (storedAnswer) setSecurityAnswer(storedAnswer);
  }, []);

  return (
    <SecurityContext.Provider value={{ twoFAEnabled, antiPhishingEnabled, sessions }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6 max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-blue-500" /> 🔐 Security & Settings
        </h1>

        <Card className="shadow-xl">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Google Authenticator</h2>
                <p className="text-sm text-muted-foreground">
                  Two-Factor Authentication is {twoFAEnabled ? "enabled" : "disabled"}.
                </p>
              </div>
              <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">🛡️ Anti-phishing Code</h2>
                <p className="text-sm text-muted-foreground">
                  {antiPhishingEnabled 
                    ? `Your code: ${antiPhishingCode} - include this in all official emails`
                    : "Prevents phishing attempts from fake emails."}
                </p>
              </div>
              <Switch 
                checked={antiPhishingEnabled} 
                onCheckedChange={(checked) => {
                  setAntiPhishingEnabled(checked);
                  if (checked) {
                    toast({
                      title: "Anti-Phishing Enabled",
                      description: `Your security code is: ${antiPhishingCode}`,
                    });
                  }
                }} 
              />
            </div>

            {antiPhishingEnabled && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Security Question</h3>
                <Input 
                  placeholder="Set a security question"
                  value={securityQuestion}
                  onChange={(e) => {
                    setSecurityQuestion(e.target.value);
                    localStorage.setItem('securityQuestion', e.target.value);
                  }}
                />
                <Input 
                  placeholder="Set the answer"
                  type="password"
                  value={securityAnswer}
                  onChange={(e) => {
                    setSecurityAnswer(e.target.value);
                    localStorage.setItem('securityAnswer', e.target.value);
                  }}
                />
              </div>
            )}

            <div className="flex justify-between items-center opacity-50">
              <div>
                <h2 className="text-lg font-semibold">📃 Whitelist (Coming Soon</h2>
                <p className="text-sm text-muted-foreground">
                  Manage withdrawal addresses with memos.
                </p>
              </div>
              <Badge variant="outline">In Development</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">🖥️ Session Management</h2>
            <div className="space-y-4">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: session.id * 0.1 }}
                  className={`p-4 rounded-xl border ${session.active ? "border-green-500 bg-green-50" : "border-gray-300"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <Laptop className="text-blue-500" />
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">{session.location} – {session.ip}</p>
                      </div>
                    </div>
                    <Badge variant={session.active ? "default" : "outline"}>{session.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">🧠 Backup & Recovery Guide</h2>
            <p className="text-muted-foreground">
              Keep your recovery phrase secure! Never share it. Store it in a physical, offline location.
            </p>
            <Button variant="outline">Learn How to Backup 🔐</Button>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem('sessions');
              setSessions(sessions.filter(s => s.active));
              toast({
                title: "Logged out other devices",
                description: "All other sessions have been terminated",
              });
            }}
          >
            <LogOut size={16} /> Terminate Other Sessions
          </Button>
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={() => {
              const newCode = generateAntiPhishingCode();
              setAntiPhishingCode(newCode);
              localStorage.setItem('antiPhishingCode', newCode);
              toast({
                title: "Security Code Regenerated",
                description: `Your new code is: ${newCode}`,
              });
            }}
          >
            <RefreshCw size={16} /> Regenerate Code
          </Button>
        </div>
      </motion.div>
    </SecurityContext.Provider>
  );
}
