import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  DollarSign, 
  Plus, 
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Transaction {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  paymentMethod: string;
  reference?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Ward Development Fund',
    titleMl: 'വാർഡ് വികസന ഫണ്ട്',
    description: 'Monthly allocation from panchayat',
    descriptionMl: 'പഞ്ചായത്തിൽ നിന്നുള്ള മാസിക അനുവദനം',
    amount: 50000,
    type: 'income',
    category: 'Government Grant',
    date: '2024-12-01',
    paymentMethod: 'Bank Transfer',
    reference: 'GRANT-2024-12'
  },
  {
    id: '2',
    title: 'Road Repair',
    titleMl: 'റോഡ് റിപ്പയർ',
    description: 'Repair work on MG Road',
    descriptionMl: 'എംജി റോഡിലെ റിപ്പയർ പണി',
    amount: 25000,
    type: 'expense',
    category: 'Infrastructure',
    date: '2024-12-15',
    paymentMethod: 'Cheque',
    reference: 'CHQ-2024-001'
  }
];

export function FinancialManagement() {
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    description: '',
    descriptionMl: '',
    amount: '',
    type: 'expense' as Transaction['type'],
    category: '',
    date: '',
    paymentMethod: '',
    reference: ''
  });

  const filteredTransactions = transactions.filter(t => 
    typeFilter === 'all' || t.type === typeFilter
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  const handleSubmit = () => {
    if (editingId) {
      setTransactions(prev => prev.map(t => 
        t.id === editingId 
          ? { ...t, ...formData, amount: parseFloat(formData.amount) }
          : t
      ));
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount)
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      titleMl: '',
      description: '',
      descriptionMl: '',
      amount: '',
      type: 'expense',
      category: '',
      date: '',
      paymentMethod: '',
      reference: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm(t('Are you sure you want to delete this transaction?', 'ഈ ഇടപാട് ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?'))) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #2D5016 0%, #A8D5A5 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('Financial Management', 'ധനകാര്യ മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Track ward finances and transactions', 'വാർഡ് ധനകാര്യങ്ങളും ഇടപാടുകളും ട്രാക്ക് ചെയ്യുക')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t('Add Transaction', 'ഇടപാട് ചേർക്കുക')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? t('Edit Transaction', 'ഇടപാട് എഡിറ്റ് ചെയ്യുക') : t('Add Transaction', 'ഇടപാട് ചേർക്കുക')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('Type', 'തരം')}</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">{t('Income', 'വരുമാനം')}</SelectItem>
                      <SelectItem value="expense">{t('Expense', 'ചെലവ്')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('Title (English)', 'തലക്കെട്ട് (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Title (Malayalam)', 'തലക്കെട്ട് (മലയാളം)')}</Label>
                  <Input
                    value={formData.titleMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleMl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Description (English)', 'വിവരണം (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Description (Malayalam)', 'വിവരണം (മലയാളം)')}</Label>
                  <Input
                    value={formData.descriptionMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionMl: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Amount (₹)', 'തുക (₹)')}</Label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>{t('Category', 'വിഭാഗം')}</Label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Date', 'തീയതി')}</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>{t('Payment Method', 'പേയ്മെന്റ് രീതി')}</Label>
                    <Input
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>{t('Reference Number (Optional)', 'റഫറൻസ് നമ്പർ (ഓപ്ഷണൽ)')}</Label>
                  <Input
                    value={formData.reference}
                    onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('Cancel', 'റദ്ദാക്കുക')}
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#2D5016] hover:bg-[#1B3D0F]">
                    {editingId ? t('Update', 'അപ്ഡേറ്റ്') : t('Add', 'ചേർക്കുക')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('Total Income', 'ആകെ വരുമാനം')}</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('Total Expense', 'ആകെ ചെലവ്')}</p>
                <p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('Balance', 'ബാലൻസ്')}</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{balance.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t('Filters', 'ഫിൽട്ടറുകൾ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t('Filter by Type', 'തരം അനുസരിച്ച് ഫിൽട്ടർ')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('All', 'എല്ലാം')}</SelectItem>
              <SelectItem value="income">{t('Income', 'വരുമാനം')}</SelectItem>
              <SelectItem value="expense">{t('Expense', 'ചെലവ്')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Transactions', 'ഇടപാടുകൾ')} ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No transactions found', 'ഇടപാടുകളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold">{t(transaction.title, transaction.titleMl)}</h4>
                          <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                            {t(transaction.type, transaction.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t(transaction.description, transaction.descriptionMl)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{transaction.date}</span>
                          </div>
                          <span>{transaction.category}</span>
                          {transaction.reference && (
                            <span>{t('Ref', 'റഫ്')}: {transaction.reference}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(transaction.id)}
                          className="mt-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

