import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Badge } from './ui/badge';

const KeyManagement = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: 'Main Encryption Key', type: 'AES-256', status: 'Active', expiry: '2024-12-31' },
    { id: 2, name: 'Backup Key', type: 'RSA-2048', status: 'Inactive', expiry: '2023-12-31' },
    { id: 3, name: 'Session Key', type: 'ECDSA', status: 'Expired', expiry: '2022-06-30' }
  ]);

  const handleRotateKey = (id: number) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, status: 'Active', expiry: '2024-12-31' } : key
    ));
  };

  const handleRevokeKey = (id: number) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, status: 'Revoked' } : key
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Key Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Encryption Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>{key.type}</TableCell>
                  <TableCell>
                    <Badge variant={
                      key.status === 'Active' ? 'default' :
                      key.status === 'Inactive' ? 'secondary' :
                      'destructive'
                    }>
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{key.expiry}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRotateKey(key.id)}
                        disabled={key.status === 'Active'}
                      >
                        Rotate
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRevokeKey(key.id)}
                        disabled={key.status === 'Revoked'}
                      >
                        Revoke
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="default">Generate New Key</Button>
          <p className="text-sm text-muted-foreground">
            {keys.filter(k => k.status === 'Active').length} active keys
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default KeyManagement;
