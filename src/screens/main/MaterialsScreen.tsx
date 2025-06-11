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
  Divider,
} from 'react-native-paper';
import { theme } from '../../theme/theme';

type Material = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  supplier: string;
  lastOrdered: string;
};

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Cement',
    category: 'Construction',
    quantity: 500,
    unit: 'bags',
    minQuantity: 100,
    supplier: 'ABC Suppliers',
    lastOrdered: '2024-03-01',
  },
  {
    id: '2',
    name: 'Steel Bars',
    category: 'Construction',
    quantity: 2000,
    unit: 'kg',
    minQuantity: 500,
    supplier: 'XYZ Steel',
    lastOrdered: '2024-03-05',
  },
  {
    id: '3',
    name: 'Bricks',
    category: 'Construction',
    quantity: 10000,
    unit: 'pieces',
    minQuantity: 2000,
    supplier: 'Local Brick Factory',
    lastOrdered: '2024-03-10',
  },
];

const MaterialsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getQuantityStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= minQuantity) {
      return { color: theme.colors.error, text: 'Low Stock' };
    } else if (quantity <= minQuantity * 1.5) {
      return { color: theme.colors.warning, text: 'Medium Stock' };
    }
    return { color: theme.colors.success, text: 'Good Stock' };
  };

  const renderMaterialCard = (material: Material) => {
    const status = getQuantityStatus(material.quantity, material.minQuantity);

    return (
      <Card key={material.id} style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>{material.name}</Title>
            <Chip
              mode="outlined"
              style={[styles.statusChip, { borderColor: status.color }]}
              textStyle={{ color: status.color }}
            >
              {status.text}
            </Chip>
          </View>
          <Paragraph style={styles.category}>{material.category}</Paragraph>
          <View style={styles.quantityContainer}>
            <Paragraph style={styles.quantity}>
              {material.quantity} {material.unit}
            </Paragraph>
            <Paragraph style={styles.minQuantity}>
              Min: {material.minQuantity} {material.unit}
            </Paragraph>
          </View>
          <Divider style={styles.divider} />
          <List.Item
            title="Supplier"
            description={material.supplier}
            left={props => <List.Icon {...props} icon="truck" />}
          />
          <List.Item
            title="Last Ordered"
            description={new Date(material.lastOrdered).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search materials"
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
          selected={selectedCategory === null}
          onPress={() => setSelectedCategory(null)}
          style={styles.filterChip}
        >
          All
        </Chip>
        <Chip
          selected={selectedCategory === 'Construction'}
          onPress={() => setSelectedCategory('Construction')}
          style={styles.filterChip}
        >
          Construction
        </Chip>
        <Chip
          selected={selectedCategory === 'Electrical'}
          onPress={() => setSelectedCategory('Electrical')}
          style={styles.filterChip}
        >
          Electrical
        </Chip>
        <Chip
          selected={selectedCategory === 'Plumbing'}
          onPress={() => setSelectedCategory('Plumbing')}
          style={styles.filterChip}
        >
          Plumbing
        </Chip>
      </ScrollView>

      <ScrollView style={styles.listContainer}>
        {mockMaterials.map(renderMaterialCard)}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Implement new material addition
          console.log('Add new material');
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
    marginBottom: theme.spacing.xs,
  },
  category: {
    color: theme.colors.disabled,
    marginBottom: theme.spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  quantity: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  minQuantity: {
    color: theme.colors.disabled,
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default MaterialsScreen; 