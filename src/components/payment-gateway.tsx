import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Search,
  Receipt,
  Calendar,
  DollarSign,
  FileText,
  Building2,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Payment {
  id: string;
  type: 'property-tax' | 'water-bill' | 'electricity-bill' | 'application-fee' | 'other';
  typeLabel: string;
  typeLabelMl: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  transactionId?: string;
  paidDate?: string;
  paymentMethod?: 'upi' | 'card' | 'netbanking' | 'wallet';
  receiptUrl?: string;
}

interface PaymentHistory {
  id: string;
  type: string;
  typeMl: string;
  amount: number;
  transactionId: string;
  paidDate: string;
  paymentMethod: string;
  receiptUrl: string;
  status: 'success' | 'failed' | 'pending';
}

const mockPayments: Payment[] = [
  {
    id: 'pay1',
    type: 'property-tax',
    typeLabel: 'Property Tax',
    typeLabelMl: 'സ്വത്ത് നികുതി',
    amount: 2500,
    dueDate: '2024-02-28',
    status: 'pending'
  },
  {
    id: 'pay2',
    type: 'water-bill',
    typeLabel: 'Water Bill',
    typeLabelMl: 'ജല ബില്ല്',
    amount: 450,
    dueDate: '2024-02-25',
    status: 'pending'
  },
  {
    id: 'pay3',
    type: 'electricity-bill',
    typeLabel: 'Electricity Bill',
    typeLabelMl: 'വൈദ്യുതി ബില്ല്',
    amount: 1200,
    dueDate: '2024-02-20',
    status: 'overdue'
  },
  {
    id: 'pay4',
    type: 'application-fee',
    typeLabel: 'Certificate Application Fee',
    typeLabelMl: 'സർട്ടിഫിക്കറ്റ് അപേക്ഷ ഫീസ്',
    amount: 100,
    dueDate: '2024-02-15',
    status: 'paid',
    transactionId: 'TXN123456789',
    paidDate: '2024-02-10',
    paymentMethod: 'upi',
    receiptUrl: '/receipts/receipt-123456789.pdf'
  }
];

const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'hist1',
    type: 'Property Tax',
    typeMl: 'സ്വത്ത് നികുതി',
    amount: 2500,
    transactionId: 'TXN987654321',
    paidDate: '2024-01-15',
    paymentMethod: 'UPI',
    receiptUrl: '/receipts/receipt-987654321.pdf',
    status: 'success'
  },
  {
    id: 'hist2',
    type: 'Water Bill',
    typeMl: 'ജല ബില്ല്',
    amount: 450,
    transactionId: 'TXN987654322',
    paidDate: '2024-01-10',
    paymentMethod: 'Card',
    receiptUrl: '/receipts/receipt-987654322.pdf',
    status: 'success'
  }
];

export function PaymentGateway() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');

  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentDialog(true);
  };

  const handleProcessPayment = () => {
    if (!selectedPayment) return;

    // In a real app, this would process the payment
    console.log('Processing payment:', {
      payment: selectedPayment,
      method: paymentMethod
    });

    // Simulate payment processing
    setTimeout(() => {
      alert('Payment processed successfully!');
      setShowPaymentDialog(false);
      setSelectedPayment(null);
    }, 1000);
  };

  const handleDownloadReceipt = (receiptUrl: string) => {
    // In a real app, this would download the receipt
    console.log('Downloading receipt:', receiptUrl);
    const link = document.createElement('a');
    link.href = receiptUrl;
    link.download = `receipt-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPayments = mockPayments.filter(payment =>
    payment.typeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.typeLabelMl.includes(searchQuery)
  );

  const filteredHistory = mockPaymentHistory.filter(payment =>
    payment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.typeMl.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-8 h-8" />
            <div>
              <h2>Online Payments</h2>
              <p className="text-white/90 mt-1">ഓൺലൈൻ പേയ്‌മെന്റുകൾ</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold mt-1">₹4,150</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold mt-1">₹1,200</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold mt-1">₹2,950</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        {/* Pending Payments Tab */}
        <TabsContent value="pending" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Payments</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments... / പേയ്‌മെന്റുകൾ തിരയുക..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPayments.filter(p => p.status !== 'paid').map((payment) => (
                  <Card key={payment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-[#2D7A4F]" />
                            <h4 className="font-semibold text-lg">{payment.typeLabel}</h4>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{payment.typeLabelMl}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Amount:</span>
                              <span className="font-semibold text-lg">₹{payment.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Due Date:</span>
                              <span>{payment.dueDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                          onClick={() => handlePayNow(payment)}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payment History</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search history... / ചരിത്രം തിരയുക..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHistory.map((payment) => (
                  <Card key={payment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Receipt className="w-5 h-5 text-[#2D7A4F]" />
                            <h4 className="font-semibold">{payment.type}</h4>
                            <Badge className="bg-green-100 text-green-700">
                              {payment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{payment.typeMl}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Amount:</span>
                              <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Transaction ID:</span>
                              <span className="font-mono text-xs">{payment.transactionId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Paid Date:</span>
                              <span>{payment.paidDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Method:</span>
                              <span>{payment.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3 border-t">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDownloadReceipt(payment.receiptUrl)}
                        >
                          <Receipt className="w-4 h-4 mr-2" />
                          Download Receipt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>Complete your payment securely</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Payment For:</span>
                  <span className="font-semibold">{selectedPayment.typeLabel}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-lg">₹{selectedPayment.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span>{selectedPayment.dueDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === 'upi' && (
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <Input placeholder="yourname@upi" />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" type="password" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleProcessPayment}
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ₹{selectedPayment.amount.toLocaleString()}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

