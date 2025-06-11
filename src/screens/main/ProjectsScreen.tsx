import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Card, Title, Paragraph, FAB, Searchbar, Chip } from 'react-native-paper';
import { theme } from '../../theme/theme';

type Project = {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
};

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Residential Complex A',
    location: 'Mumbai, Maharashtra',
    status: 'active',
    progress: 65,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    name: 'Commercial Tower B',
    location: 'Delhi, NCR',
    status: 'active',
    progress: 35,
    startDate: '2024-02-15',
    endDate: '2025-06-30',
  },
  {
    id: '3',
    name: 'Hospital Extension',
    location: 'Bangalore, Karnataka',
    status: 'on-hold',
    progress: 20,
    startDate: '2024-03-01',
    endDate: '2025-03-31',
  },
];

const ProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'completed':
        return theme.colors.primary;
      case 'on-hold':
        return theme.colors.warning;
      default:
        return theme.colors.disabled;
    }
  };

  const renderProjectCard = ({ item }: { item: Project }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph style={styles.location}>{item.location}</Paragraph>
        <View style={styles.statusContainer}>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
            textStyle={{ color: getStatusColor(item.status) }}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Chip>
          <Paragraph style={styles.progress}>
            Progress: {item.progress}%
          </Paragraph>
        </View>
        <View style={styles.datesContainer}>
          <Paragraph style={styles.date}>
            Start: {new Date(item.startDate).toLocaleDateString()}
          </Paragraph>
          <Paragraph style={styles.date}>
            End: {new Date(item.endDate).toLocaleDateString()}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search projects"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={selectedStatus === null}
            onPress={() => setSelectedStatus(null)}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={selectedStatus === 'active'}
            onPress={() => setSelectedStatus('active')}
            style={styles.filterChip}
          >
            Active
          </Chip>
          <Chip
            selected={selectedStatus === 'completed'}
            onPress={() => setSelectedStatus('completed')}
            style={styles.filterChip}
          >
            Completed
          </Chip>
          <Chip
            selected={selectedStatus === 'on-hold'}
            onPress={() => setSelectedStatus('on-hold')}
            style={styles.filterChip}
          >
            On Hold
          </Chip>
        </ScrollView>
      </View>

      <FlatList
        data={mockProjects}
        renderItem={renderProjectCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Implement new project creation
          console.log('Create new project');
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
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  location: {
    color: theme.colors.disabled,
    marginBottom: theme.spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  progress: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.disabled,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default ProjectsScreen; 