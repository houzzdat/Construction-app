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
  Avatar,
  Button,
} from 'react-native-paper';
import { theme } from '../../theme/theme';

type Worker = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  attendance: {
    present: boolean;
    checkIn?: string;
    checkOut?: string;
  };
  contact: string;
  salary: number;
  joiningDate: string;
};

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Mason',
    skills: ['Brick Laying', 'Plastering'],
    attendance: {
      present: true,
      checkIn: '2024-03-15T08:00:00',
    },
    contact: '+91 9876543210',
    salary: 15000,
    joiningDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'Suresh Patel',
    role: 'Carpenter',
    skills: ['Woodwork', 'Furniture'],
    attendance: {
      present: false,
    },
    contact: '+91 9876543211',
    salary: 18000,
    joiningDate: '2024-01-15',
  },
  {
    id: '3',
    name: 'Amit Singh',
    role: 'Electrician',
    skills: ['Wiring', 'Installation'],
    attendance: {
      present: true,
      checkIn: '2024-03-15T07:45:00',
    },
    contact: '+91 9876543212',
    salary: 20000,
    joiningDate: '2024-02-01',
  },
];

const LaborScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const getAttendanceStatus = (attendance: Worker['attendance']) => {
    if (!attendance.present) {
      return { color: theme.colors.error, text: 'Absent' };
    }
    if (!attendance.checkOut) {
      return { color: theme.colors.success, text: 'Present' };
    }
    return { color: theme.colors.primary, text: 'Completed' };
  };

  const renderWorkerCard = (worker: Worker) => {
    const status = getAttendanceStatus(worker.attendance);

    return (
      <Card key={worker.id} style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.workerInfo}>
              <Avatar.Text
                size={40}
                label={worker.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              />
              <View style={styles.nameContainer}>
                <Title>{worker.name}</Title>
                <Paragraph style={styles.role}>{worker.role}</Paragraph>
              </View>
            </View>
            <Chip
              mode="outlined"
              style={[styles.statusChip, { borderColor: status.color }]}
              textStyle={{ color: status.color }}
            >
              {status.text}
            </Chip>
          </View>

          <View style={styles.skillsContainer}>
            {worker.skills.map((skill, index) => (
              <Chip key={index} style={styles.skillChip}>
                {skill}
              </Chip>
            ))}
          </View>

          <List.Item
            title="Contact"
            description={worker.contact}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title="Salary"
            description={`₹${worker.salary.toLocaleString()}/month`}
            left={props => <List.Icon {...props} icon="currency-inr" />}
          />
          <List.Item
            title="Joining Date"
            description={new Date(worker.joiningDate).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />

          {worker.attendance.present && !worker.attendance.checkOut && (
            <Button
              mode="contained"
              onPress={() => {
                // TODO: Implement check-out functionality
                console.log('Check out worker:', worker.id);
              }}
              style={styles.checkOutButton}
            >
              Check Out
            </Button>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search workers"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <Chip
          selected={selectedRole === null}
          onPress={() => setSelectedRole(null)}
          style={styles.filterChip}
        >
          All
        </Chip>
        <Chip
          selected={selectedRole === 'Mason'}
          onPress={() => setSelectedRole('Mason')}
          style={styles.filterChip}
        >
          Mason
        </Chip>
        <Chip
          selected={selectedRole === 'Carpenter'}
          onPress={() => setSelectedRole('Carpenter')}
          style={styles.filterChip}
        >
          Carpenter
        </Chip>
        <Chip
          selected={selectedRole === 'Electrician'}
          onPress={() => setSelectedRole('Electrician')}
          style={styles.filterChip}
        >
          Electrician
        </Chip>
      </ScrollView>

      <ScrollView style={styles.listContainer}>
        {mockWorkers.map(renderWorkerCard)}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Implement new worker addition
          console.log('Add new worker');
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
  filterContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    marginRight: theme.spacing.sm,
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
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: theme.spacing.sm,
  },
  role: {
    color: theme.colors.disabled,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
  },
  skillChip: {
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  checkOutButton: {
    marginTop: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default LaborScreen; 