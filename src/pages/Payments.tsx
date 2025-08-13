import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTransactions } from '@/data/mockData';

const Payments = () => {
  const { user, isAuthenticated } = useAuth();
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isFreelancer = user?.role === 'freelancer';

  // Calculate stats
  const totalEarnings = mockTransactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingPayments = mockTransactions
    .filter(t => t.type === 'payment' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = mockTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const availableBalance = totalEarnings - totalWithdrawals;

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesStatus = !filterStatus || transaction.status === filterStatus;
    const matchesType = !filterType || transaction.type === filterType;
    const matchesSearch = !searchTerm || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTransactionIcon = (type: string) => {
    return type === 'payment' ? ArrowDownLeft : ArrowUpRight;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isFreelancer ? 'Earnings & Payments' : 'Payment History'}
          </h1>
          <p className="text-muted-foreground">
            {isFreelancer 
              ? 'Track your earnings and manage withdrawals'
              : 'View your payment history and manage billing'
            }
          </p>
        </div>
        {isFreelancer && (
          <Button className="bg-gradient-hero mt-4 md:mt-0">
            <Download className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-card hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isFreelancer ? 'Available Balance' : 'Total Spent'}
                </p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(isFreelancer ? availableBalance : totalEarnings)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 text-success">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isFreelancer ? 'Total Earnings' : 'This Month'}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalEarnings)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold text-warning">
                  {formatCurrency(pendingPayments)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 text-warning">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isFreelancer ? 'Withdrawals' : 'Avg. Payment'}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalWithdrawals)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Transactions */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          {isFreelancer && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5" />
                Filter Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('');
                    setFilterStatus('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const Icon = getTransactionIcon(transaction.type);
                    const isPositive = transaction.amount > 0;
                    
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            isPositive ? 'bg-success/10 text-success' : 'bg-muted/50 text-muted-foreground'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{transaction.description}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {transaction.client && (
                                <>
                                  <span>{transaction.client}</span>
                                  <span>•</span>
                                </>
                              )}
                              <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            isPositive ? 'text-success' : 'text-foreground'
                          }`}>
                            {isPositive ? '+' : ''}{formatCurrency(transaction.amount)}
                          </p>
                          <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="mx-auto h-12 w-12 mb-4" />
                    <p>No transactions found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <Card className="bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button variant="outline" size="sm">
                Add Method
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mock payment methods */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Bank Account</p>
                      <p className="text-sm text-muted-foreground">GTBank •••• 1234</p>
                    </div>
                  </div>
                  <Badge>Primary</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10 text-success">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Mobile Money</p>
                      <p className="text-sm text-muted-foreground">MTN •••• 5678</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab (Freelancers only) */}
        {isFreelancer && (
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Earnings Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="mx-auto h-12 w-12 mb-4" />
                  <p>Analytics charts will be displayed here.</p>
                  <p className="text-sm">Track your earnings over time, popular skills, and more.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Payments;