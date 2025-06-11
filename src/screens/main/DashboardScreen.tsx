import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { theme } from '../../theme/theme';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Active Projects</Title>
            <Paragraph style={styles.statsNumber}>12</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Pending Tasks</Title>
            <Paragraph style={styles.statsNumber}>45</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Workers On Site</Title>
            <Paragraph style={styles.statsNumber}>78</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Safety Incidents</Title>
            <Paragraph style={styles.statsNumber}>0</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <Card style={styles.activityCard}>
          <Card.Content>
            <Title>Material Delivery</Title>
            <Paragraph>500 bags of cement delivered to Site A</Paragraph>
            <Text style={styles.timestamp}>2 hours ago</Text>
          </Card.Content>
        </Card>

        <Card style={styles.activityCard}>
          <Card.Content>
            <Title>Task Completed</Title>
            <Paragraph>Foundation work completed at Site B</Paragraph>
            <Text style={styles.timestamp}>4 hours ago</Text>
          </Card.Content>
        </Card>

        <Card style={styles.activityCard}>
          <Card.Content>
            <Title>Safety Inspection</Title>
            <Paragraph>Monthly safety inspection completed</Paragraph>
            <Text style={styles.timestamp}>Yesterday</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
        <Card style={styles.deadlineCard}>
          <Card.Content>
            <Title>Project A</Title>
            <Paragraph>Phase 1 completion</Paragraph>
            <Text style={styles.deadlineDate}>Due in 5 days</Text>
          </Card.Content>
        </Card>

        <Card style={styles.deadlineCard}>
          <Card.Content>
            <Title>Project B</Title>
            <Paragraph>Material procurement</Paragraph>
            <Text style={styles.deadlineDate}>Due in 7 days</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.background,
    opacity: 0.8,
    marginTop: theme.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  statsCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
  },
  statsNumber: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  activityCard: {
    marginBottom: theme.spacing.md,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.disabled,
    marginTop: theme.spacing.xs,
  },
  deadlineCard: {
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
  },
  deadlineDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.warning,
    marginTop: theme.spacing.xs,
  },
});

export default DashboardScreen; 