import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Searchbar,
  Chip,
  List,
  Button,
  ProgressBar,
} from 'react-native-paper';
import { theme } from '../../theme/theme';

type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  status: 'under' | 'over' | 'on-track';
};

type Expense = {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
};

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Materials',
    allocated: 1000000,
    spent: 750000,
    remaining: 250000,
    status: 'on-track',
  },
  {
    id: '2',
    category: 'Labor',
    allocated: 500000,
    spent: 450000,
    remaining: 50000,
    status: 'over',
  },
  {
    id: '3',
    category: 'Equipment',
    allocated: 300000,
    spent: 150000,
    remaining: 150000,
    status: 'under',
  },
];

const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2024-03-15',
    category: 'Materials',
    amount: 50000,
    description: 'Cement purchase for Site A',
    status: 'approved',
    approvedBy: 'John Doe',
  },
  {
    id: '2',
    date: '2024-03-14',
    category: 'Labor',
    amount: 25000,
    description: 'Worker overtime payment',
    status: 'pending',
  },
  {
    id: '3',
    date: '2024-03-13',
    category: 'Equipment',
    amount: 15000,
    description: 'Generator maintenance',
    status: 'rejected',
    approvedBy: 'Jane Smith',
  },
];

const FinanceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'budget' | 'expenses'>('budget');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under':
      case 'approved':
        return theme.colors.success;
      case 'over':
      case 'rejected':
        return theme.colors.error;
      case 'on-track':
      case 'pending':
        return theme.colors.warning;
      default:
        return theme.colors.disabled;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderBudgetCard = (budget: Budget) => {
    const progress = budget.spent / budget.allocated;
    const statusColor = getStatusColor(budget.status);

    return (
      <Card key={budget.id} style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>{budget.category}</Title>
            <Chip
              mode="outlined"
              style={[styles.statusChip, { borderColor: statusColor }]}
              textStyle={{ color: statusColor }}
            >
              {budget.status.toUpperCase()}
            </Chip>
          </View>

          <View style={styles.budgetContainer}>
            <View style={styles.budgetRow}>
              <Paragraph>Allocated</Paragraph>
              <Paragraph style={styles.amount}>{formatCurrency(budget.allocated)}</Paragraph>
            </View>
            <View style={styles.budgetRow}>
              <Paragraph>Spent</Paragraph>
              <Paragraph style={styles.amount}>{formatCurrency(budget.spent)}</Paragraph>
            </View>
            <View style={styles.budgetRow}>
              <Paragraph>Remaining</Paragraph>
              <Paragraph style={styles.amount}>{formatCurrency(budget.remaining)}</Paragraph>
            </View>
          </View>

          <ProgressBar
            progress={progress}
            color={statusColor}
            style={styles.progressBar}
          />
        </Card.Content>
      </Card>
    );
  };

  const renderExpenseCard = (expense: Expense) => {
    const statusColor = getStatusColor(expense.status);

    return (
      <Card key={expense.id} style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>{expense.category}</Title>
            <Chip
              mode="outlined"
              style={[styles.statusChip, { borderColor: statusColor }]}
              textStyle={{ color: statusColor }}
            >
              {expense.status.toUpperCase()}
            </Chip>
          </View>

          <List.Item
            title="Amount"
            description={formatCurrency(expense.amount)}
            left={props => <List.Icon {...props} icon="currency-inr" />}
          />
          <List.Item
            title="Date"
            description={new Date(expense.date).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <List.Item
            title="Description"
            description={expense.description}
            left={props => <List.Icon {...props} icon="text" />}
          />
          {expense.approvedBy && (
            <List.Item
              title="Approved By"
              description={expense.approvedBy}
              left={props => <List.Icon {...props} icon="account-check" />}
            />
          )}

          {expense.status === 'pending' && (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => {
                  // TODO: Implement approve functionality
                  console.log('Approve expense:', expense.id);
                }}
                style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
              >
                Approve
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  // TODO: Implement reject functionality
                  console.log('Reject expense:', expense.id);
                }}
                style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
              >
                Reject
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search financial records"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.tabContainer}>
        <Button
          mode={activeTab === 'budget' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('budget')}
          style={styles.tabButton}
        >
          Budget
        </Button>
        <Button
          mode={activeTab === 'expenses' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('expenses')}
          style={styles.tabButton}
        >
          Expenses
        </Button>
      </View>

      <ScrollView style={styles.listContainer}>
        {activeTab === 'budget'
          ? mockBudgets.map(renderBudgetCard)
          : mockExpenses.map(renderExpenseCard)}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Implement new financial record addition
          console.log('Add new financial record');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    margin: theme.spacing.md,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  listContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  budgetContainer: {
    marginBottom: theme.spacing.md,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  amount: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default FinanceScreen; 