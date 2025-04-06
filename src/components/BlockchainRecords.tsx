import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const BlockchainRecords = () => {
  const [networkStatus, setNetworkStatus] = useState({
    peers: 12,
    latency: 142,
    syncStatus: 98.7
  });

  const [records] = useState([
    {
      txHash: '0x4a3b...c82d',
      block: 123456,
      timestamp: '2023-10-15 14:30:22',
      type: 'Health Record',
      status: 'Confirmed',
      gasUsed: '42,000',
      size: '1.2 KB'
    },
    {
      txHash: '0x8f2e...d91a',
      block: 123452,
      timestamp: '2023-10-15 11:15:07',
      type: 'Access Grant',
      status: 'Confirmed',
      gasUsed: '38,500',
      size: '0.9 KB'
    },
    {
      txHash: '0x1b7c...e34f',
      block: 123449,
      timestamp: '2023-10-14 09:45:33',
      type: 'Identity Verification',
      status: 'Pending',
      gasUsed: '35,200',
      size: '1.1 KB'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(prev => ({
        peers: Math.max(8, Math.min(15, prev.peers + (Math.random() > 0.5 ? 1 : -1))),
        latency: Math.max(100, Math.min(200, prev.latency + (Math.random() > 0.5 ? 10 : -10))),
        syncStatus: Math.max(95, Math.min(100, prev.syncStatus + (Math.random() > 0.5 ? 0.5 : -0.5)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Blockchain Records</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Monitoring</CardTitle>
            <CardDescription>Real-time blockchain network status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Connected Peers</span>
                <span>{networkStatus.peers}</span>
              </div>
              <Progress value={(networkStatus.peers / 15) * 100} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Network Latency</span>
                <span>{networkStatus.latency} ms</span>
              </div>
              <div className="relative">
                <Progress 
                  value={100 - ((networkStatus.latency - 100) / 100) * 100}
                />
                <div 
                  className={`absolute top-0 h-full ${
                    networkStatus.latency < 120 ? 'bg-green-500' :
                    networkStatus.latency < 160 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${100 - ((networkStatus.latency - 100) / 100) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Sync Status</span>
                <span>{networkStatus.syncStatus.toFixed(1)}%</span>
              </div>
              <Progress value={networkStatus.syncStatus} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Blockchain Analytics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Block</p>
              <p className="text-2xl font-bold">123,456</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Block Time</p>
              <p className="text-2xl font-bold">5.2s</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Network Health</p>
              <p className="text-2xl font-bold text-green-600">98%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent blockchain transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Hash</TableHead>
                <TableHead>Block</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Gas Used</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{record.txHash}</TableCell>
                  <TableCell>{record.block}</TableCell>
                  <TableCell>{record.timestamp}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.size}</TableCell>
                  <TableCell>{record.gasUsed}</TableCell>
                  <TableCell>
                    <Badge variant={
                      record.status === 'Confirmed' ? 'default' :
                      record.status === 'Pending' ? 'secondary' :
                      'destructive'
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainRecords;
