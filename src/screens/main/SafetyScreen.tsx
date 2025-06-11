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
  IconButton,
} from 'react-native-paper';
import { theme } from '../../theme/theme';

type SafetyInspection = {
  id: string;
  date: string;
  inspector: string;
  location: string;
  status: 'passed' | 'failed' | 'pending';
  findings: string[];
  correctiveActions?: string[];
};

type SafetyIncident = {
  id: string;
  date: string;
  type: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  reportedBy: string;
};

const mockInspections: SafetyInspection[] = [
  {
    id: '1',
    date: '2024-03-15',
    inspector: 'John Doe',
    location: 'Site A - Building 1',
    status: 'passed',
    findings: ['All safety equipment in place', 'Proper signage displayed'],
  },
  {
    id: '2',
    date: '2024-03-14',
    inspector: 'Jane Smith',
    location: 'Site B - Foundation',
    status: 'failed',
    findings: ['Missing safety harnesses', 'Inadequate lighting'],
    correctiveActions: ['Provide additional safety equipment', 'Install temporary lighting'],
  },
  {
    id: '3',
    date: '2024-03-13',
    inspector: 'Mike Johnson',
    location: 'Site C - Roof',
    status: 'pending',
    findings: ['Scheduled for inspection'],
  },
];

const mockIncidents: SafetyIncident[] = [
  {
    id: '1',
    date: '2024-03-15',
    type: 'Fall Hazard',
    location: 'Site A - Scaffolding',
    severity: 'high',
    description: 'Unstable scaffolding structure identified',
    status: 'investigating',
    reportedBy: 'Rajesh Kumar',
  },
  {
    id: '2',
    date: '2024-03-14',
    type: 'Electrical',
    location: 'Site B - Generator Room',
    severity: 'medium',
    description: 'Exposed wiring found',
    status: 'open',
    reportedBy: 'Amit Singh',
  },
];

const SafetyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'inspections' | 'incidents'>('inspections');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'resolved':
        return theme.colors.success;
      case 'failed':
      case 'high':
        return theme.colors.error;
      case 'pending':
      case 'investigating':
        return theme.colors.warning;
      case 'open':
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.info;
      default:
        return theme.colors.disabled;
    }
  };

  const renderInspectionCard = (inspection: SafetyInspection) => (
    <Card key={inspection.id} style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title>{inspection.location}</Title>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: getStatusColor(inspection.status) }]}
            textStyle={{ color: getStatusColor(inspection.status) }}
          >
            {inspection.status.toUpperCase()}
          </Chip>
        </View>

        <List.Item
          title="Inspector"
          description={inspection.inspector}
          left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Date"
          description={new Date(inspection.date).toLocaleDateString()}
          left={props => <List.Icon {...props} icon="calendar" />}
        />

        <View style={styles.findingsContainer}>
          <Title style={styles.sectionTitle}>Findings</Title>
          {inspection.findings.map((finding, index) => (
            <View key={index} style={styles.findingItem}>
              <IconButton icon="check-circle" size={20} />
              <Paragraph>{finding}</Paragraph>
            </View>
          ))}
        </View>

        {inspection.correctiveActions && (
          <View style={styles.actionsContainer}>
            <Title style={styles.sectionTitle}>Corrective Actions</Title>
            {inspection.correctiveActions.map((action, index) => (
              <View key={index} style={styles.actionItem}>
                <IconButton icon="alert-circle" size={20} />
                <Paragraph>{action}</Paragraph>
              </View>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const renderIncidentCard = (incident: SafetyIncident) => (
    <Card key={incident.id} style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title>{incident.type}</Title>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: getStatusColor(incident.severity) }]}
            textStyle={{ color: getStatusColor(incident.severity) }}
          >
            {incident.severity.toUpperCase()}
          </Chip>
        </View>

        <List.Item
          title="Location"
          description={incident.location}
          left={props => <List.Icon {...props} icon="map-marker" />}
        />
        <List.Item
          title="Reported By"
          description={incident.reportedBy}
          left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Date"
          description={new Date(incident.date).toLocaleDateString()}
          left={props => <List.Icon {...props} icon="calendar" />}
        />

        <View style={styles.descriptionContainer}>
          <Title style={styles.sectionTitle}>Description</Title>
          <Paragraph>{incident.description}</Paragraph>
        </View>

        <View style={styles.statusContainer}>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: getStatusColor(incident.status) }]}
            textStyle={{ color: getStatusColor(incident.status) }}
          >
            {incident.status.toUpperCase()}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search safety records"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.tabContainer}>
        <Button
          mode={activeTab === 'inspections' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('inspections')}
          style={styles.tabButton}
        >
          Inspections
        </Button>
        <Button
          mode={activeTab === 'incidents' ? 'contained' : 'outlined'}
          onPress={() => setActiveTab('incidents')}
          style={styles.tabButton}
        >
          Incidents
        </Button>
      </View>

      <ScrollView style={styles.listContainer}>
        {activeTab === 'inspections'
          ? mockInspections.map(renderInspectionCard)
          : mockIncidents.map(renderIncidentCard)}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Implement new safety record addition
          console.log('Add new safety record');
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
  findingsContainer: {
    marginTop: theme.spacing.md,
  },
  actionsContainer: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    marginBottom: theme.spacing.sm,
  },
  findingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  descriptionContainer: {
    marginTop: theme.spacing.md,
  },
  statusContainer: {
    marginTop: theme.spacing.md,
    alignItems: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default SafetyScreen; 