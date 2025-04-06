import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

const IdentityManagement = () => {
  const [identities, setIdentities] = useState([
    { id: 1, name: 'Primary Identity', type: 'Patient', status: 'Verified' },
    { id: 2, name: 'Doctor Identity', type: 'Provider', status: 'Pending' }
  ]);
  const [newIdentity, setNewIdentity] = useState('');

  const handleAddIdentity = () => {
    if (newIdentity.trim()) {
      setIdentities([...identities, {
        id: identities.length + 1,
        name: newIdentity,
        type: 'Custom',
        status: 'Unverified'
      }]);
      setNewIdentity('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Identity & Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Identities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input 
              value={newIdentity}
              onChange={(e) => setNewIdentity(e.target.value)}
              placeholder="New identity name"
            />
            <Button onClick={handleAddIdentity}>Add Identity</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {identities.map((identity) => (
                <TableRow key={identity.id}>
                  <TableCell>{identity.id}</TableCell>
                  <TableCell>{identity.name}</TableCell>
                  <TableCell>{identity.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      identity.status === 'Verified' ? 'bg-green-100 text-green-800' :
                      identity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {identity.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {identities.length} identities registered
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IdentityManagement;
