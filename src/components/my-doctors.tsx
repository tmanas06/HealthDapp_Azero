import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BadgeCheck, 
  Clock, 
  FileText, 
  Star, 
  Shield, 
  Download, 
  Printer, 
  X, 
  CalendarDays, 
  Hospital, 
  Clock8,
  Eye, 
  EyeOff,
  FileSignature,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DoctorProfile {
  id: string;
  name: string;
  specialization: string;
  verified: boolean;
  walletAddress: string;
  profileImage: string;
  qualifications: string[];
  experience: number;
  hospital: string;
  contactInfo: string;
  rating: number;
  reviewCount: number;
}

interface AccessLog {
  id: string;
  date: string;
  dataAccessed: string;
  timestamp: string;
  action: 'viewed' | 'added' | 'modified';
}

interface Permission {
  type: string;
  granted: boolean;
  grantedDate: string;
  expiryDate: string;
}

interface Prescription {
  id: string;
  date: string;
  title: string;
  description: string;
  medications: { name: string; dosage: string; frequency: string }[];
  notes: string;
}

const MyDoctorPage: React.FC = () => {
  // Mock data
  const [doctor, setDoctor] = useState<DoctorProfile>({
    id: '0x1234',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    verified: true,
    walletAddress: '0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71',
    profileImage: '/api/placeholder/150/150',
    qualifications: ['MD, Harvard Medical School', 'Board Certified in Cardiology', 'Fellow, American College of Cardiology'],
    experience: 12,
    hospital: 'MetaHealth Hospital',
    contactInfo: 'Available via secure messaging only',
    rating: 4.8,
    reviewCount: 142,
  });

  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      date: '2025-04-03',
      dataAccessed: 'Medical History, Blood Tests',
      timestamp: '10:32 AM',
      action: 'viewed',
    },
    {
      id: '2',
      date: '2025-04-03',
      dataAccessed: 'Prescription',
      timestamp: '10:45 AM',
      action: 'added',
    },
    {
      id: '3',
      date: '2025-03-15',
      dataAccessed: 'Blood Pressure Records',
      timestamp: '02:15 PM',
      action: 'viewed',
    },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      type: 'View Medical History',
      granted: true,
      grantedDate: '2025-01-15',
      expiryDate: '2025-07-15',
    },
    {
      type: 'Add New Data',
      granted: true,
      grantedDate: '2025-01-15',
      expiryDate: '2025-07-15',
    },
    {
      type: 'Share Data with Specialists',
      granted: false,
      grantedDate: '',
      expiryDate: '',
    },
    {
      type: 'Access Emergency Information',
      granted: true,
      grantedDate: '2025-01-15',
      expiryDate: '2025-07-15',
    },
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 'rx-1',
      date: '2025-04-03',
      title: 'Treatment for Hypertension',
      description: 'Based on your latest blood pressure readings, I recommend starting treatment.',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Hydrochlorothiazide', dosage: '12.5mg', frequency: 'Once daily' }
      ],
      notes: 'Take in the morning with food. Monitor blood pressure daily and report any readings above 160/100.'
    },
    {
      id: 'rx-2',
      date: '2025-03-15',
      title: 'Follow-up Recommendations',
      description: 'Your cardiovascular health check showed good improvement.',
      medications: [
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' }
      ],
      notes: 'Continue with your exercise regimen. Schedule a follow-up appointment in 3 months.'
    }
  ]);

  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const updatePermission = (type: string, newStatus: boolean) => {
    setPermissions(permissions.map(permission => 
      permission.type === type ? { ...permission, granted: newStatus } : permission
    ));
  };

  const handleRevokeAllAccess = () => {
    setPermissions(permissions.map(permission => ({ ...permission, granted: false })));
  };

  const submitReview = () => {
    // In a real app, this would send the review to the blockchain or backend
    setDoctor({
      ...doctor,
      rating: ((doctor.rating * doctor.reviewCount) + reviewRating) / (doctor.reviewCount + 1),
      reviewCount: doctor.reviewCount + 1
    });
    setIsReviewDialogOpen(false);
    setReviewRating(0);
    setReviewText('');
  };

  const handleDownload = (prescription: Prescription) => {
    const prescriptionText = `
      Prescription Title: ${prescription.title}
      Date: ${prescription.date}
      Description: ${prescription.description}
      Medications:
      ${prescription.medications
        .map((med) => `- ${med.name}: ${med.dosage}, ${med.frequency}`)
        .join("\n")}
      Notes: ${prescription.notes}
    `;
  
    const blob = new Blob([prescriptionText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${prescription.title.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        {/* Header with back button */}
        <motion.div variants={itemAnimation} className="mb-6 flex items-center">
          <Button variant="ghost" className="mr-2">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Back to Doctors
          </Button>
          <h1 className="text-2xl font-bold flex-1 text-center md:text-left">My Doctor</h1>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Doctor Profile */}
          <div className="md:col-span-1">
            <motion.div variants={itemAnimation}>
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative pb-24">
                  <div className="absolute right-4 top-4">
                    {doctor.verified && (
                      <Badge className="bg-white text-blue-600 hover:bg-white">
                        <BadgeCheck className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-medium mb-0">{doctor.name}</CardTitle>
                  <CardDescription className="text-blue-100">{doctor.specialization}</CardDescription>
                </CardHeader>
                <div className="relative">
                  <Avatar className="w-24 h-24 absolute -top-12 left-6 border-4 border-white shadow-md">
                    <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardContent className="pt-16">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <Shield className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-500">Wallet Address</div>
                      <div className="text-sm font-medium">{truncateAddress(doctor.walletAddress)}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Qualifications</h3>
                      <ul className="text-sm space-y-1">
                        {doctor.qualifications.map((qualification, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-1 h-1 rounded-full bg-blue-500 mt-2 mr-2"></div>
                            {qualification}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center text-blue-700">
                          <Clock8 className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">Experience</span>
                        </div>
                        <p className="mt-1 text-lg font-semibold">{doctor.experience} Years</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center text-purple-700">
                          <Hospital className="w-4 h-4 mr-2" />
                          <span className="text-xs font-medium">Hospital</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold">{doctor.hospital}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Contact</h3>
                      <p className="text-sm">{doctor.contactInfo}</p>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(doctor.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : star <= doctor.rating
                                  ? 'text-yellow-400 fill-yellow-400 opacity-50'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">{doctor.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setIsReviewDialogOpen(true)}
                  >
                    <Star className="w-4 h-4 mr-2" /> Leave a Review
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Tabs and Data */}
          <div className="md:col-span-2">
            <motion.div variants={itemAnimation}>
              <Tabs defaultValue="prescriptions" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="prescriptions" className="text-sm">
                    <FileText className="w-4 h-4 mr-2" /> Prescriptions
                  </TabsTrigger>
                  <TabsTrigger value="access" className="text-sm">
                    <Clock className="w-4 h-4 mr-2" /> Access Logs
                  </TabsTrigger>
                  <TabsTrigger value="permissions" className="text-sm">
                    <Shield className="w-4 h-4 mr-2" /> Permissions
                  </TabsTrigger>
                </TabsList>

                {/* Prescriptions Tab */}
                <TabsContent value="prescriptions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Doctor's Notes & Prescriptions</CardTitle>
                      <CardDescription>
                        View diagnoses and prescriptions from your doctor
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="space-y-4"
                        variants={containerAnimation}
                        initial="hidden"
                        animate="show"
                      >
                        {prescriptions.length > 0 ? (
                          prescriptions.map((prescription) => (
                            <motion.div 
                              key={prescription.id}
                              variants={itemAnimation}
                              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                              onClick={() => setSelectedPrescription(prescription)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{prescription.title}</h3>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <CalendarDays className="w-3 h-3 mr-1" />
                                    {prescription.date}
                                  </div>
                                </div>
                                <Badge variant={prescription.id === 'rx-1' ? 'default' : 'outline'}>
                                  {prescription.id === 'rx-1' ? 'New' : 'Past'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                {prescription.description}
                              </p>
                              <div className="flex mt-3">
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <Eye className="w-3 h-3 mr-1" /> View Details
                                </Button>
                                <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleDownload(prescription)}>
                                  <Download className="w-3 h-3 mr-1" /> Download
                                </Button>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <Printer className="w-3 h-3 mr-1" /> Print
                                </Button>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No prescriptions available
                          </div>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>

                  {/* Prescription Details Dialog */}
                  {selectedPrescription && (
                    <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{selectedPrescription.title}</DialogTitle>
                          <DialogDescription>
                            Prescribed on {selectedPrescription.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Description</h4>
                            <p className="mt-1">{selectedPrescription.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Medications</h4>
                            <div className="mt-2 space-y-2">
                              {selectedPrescription.medications.map((med, idx) => (
                                <div key={idx} className="bg-blue-50 p-3 rounded-md">
                                  <div className="font-medium">{med.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {med.dosage} · {med.frequency}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Doctor's Notes</h4>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                              {selectedPrescription.notes}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <BadgeCheck className="w-4 h-4 mr-1 text-green-500" />
                              Verified on Blockchain
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleDownload(selectedPrescription)}>
                                <Download className="w-3 h-3 mr-1" /> Download
                              </Button>
                              <Button size="sm">
                                <Printer className="w-3 h-3 mr-1" /> Print
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TabsContent>

                {/* Access Logs Tab */}
                <TabsContent value="access">
                  <Card>
                    <CardHeader>
                      <CardTitle>Access History</CardTitle>
                      <CardDescription>
                        See when and what data your doctor accessed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="space-y-4"
                        variants={containerAnimation}
                        initial="hidden"
                        animate="show"
                      >
                        {accessLogs.map((log) => (
                          <motion.div 
                            key={log.id}
                            variants={itemAnimation}
                            className="border-l-4 pl-4 py-2"
                            style={{ 
                              borderColor: log.action === 'viewed' 
                                ? '#3b82f6' 
                                : log.action === 'added' 
                                ? '#10b981' 
                                : '#f59e0b' 
                            }}
                          >
                            <div className="flex justify-between">
                              <h3 className="font-medium">{log.dataAccessed}</h3>
                              <Badge 
                                variant="outline"
                                className={
                                  log.action === 'viewed' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : log.action === 'added' 
                                    ? 'text-green-600 bg-green-50' 
                                    : 'text-amber-600 bg-amber-50'
                                }
                              >
                                {log.action === 'viewed' && <Eye className="w-3 h-3 mr-1" />}
                                {log.action === 'added' && <FileSignature className="w-3 h-3 mr-1" />}
                                {log.action === 'modified' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <CalendarDays className="w-3 h-3 mr-1" />
                              {log.date} at {log.timestamp}
                            </div>
                            <div className="mt-2 flex justify-end">
                              <Button variant="ghost" size="sm" className="text-xs">
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Permissions Tab */}
                <TabsContent value="permissions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Granted Permissions</CardTitle>
                      <CardDescription>
                        Manage what data this doctor can access
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important Information</AlertTitle>
                        <AlertDescription>
                          Revoking access may impact your healthcare experience. This doctor will no longer be able to access your medical records or provide diagnoses based on your history.
                        </AlertDescription>
                      </Alert>

                      <motion.div 
                        className="space-y-4"
                        variants={containerAnimation}
                        initial="hidden"
                        animate="show"
                      >
                        {permissions.map((permission) => (
                          <motion.div 
                            key={permission.type}
                            variants={itemAnimation}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center">
                              {permission.granted ? (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                  <Eye className="w-4 h-4 text-green-600" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                  <EyeOff className="w-4 h-4 text-gray-600" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{permission.type}</p>
                                {permission.granted && (
                                  <p className="text-xs text-gray-500">
                                    Expires: {permission.expiryDate}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Switch 
                              checked={permission.granted}
                              onCheckedChange={(checked) => updatePermission(permission.type, checked)}
                            />
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
                        <h3 className="font-medium text-red-800 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Danger Zone
                        </h3>
                        <p className="mt-2 text-sm text-red-700">
                          Revoking all access will immediately prevent this doctor from accessing any of your medical records.
                        </p>
                        <div className="mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <X className="w-3 h-3 mr-1" /> Revoke All Access
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Revoke All Access</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to revoke all access for Dr. {doctor.name}? This will prevent them from accessing any of your medical records and may impact your ongoing treatment.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={handleRevokeAllAccess}>
                                  Revoke All Access
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review for Dr. {doctor.name}</DialogTitle>
            <DialogDescription>
              Your feedback helps other patients make informed decisions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-all duration-300"
                  onClick={() => setReviewRating(star)}
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= reviewRating 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    } transition-colors duration-300`}
                  />
                </button>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                placeholder="Share your experience with Dr. Johnson..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitReview}
              disabled={reviewRating === 0}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyDoctorPage;