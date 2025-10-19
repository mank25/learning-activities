import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View, useWindowDimensions, Platform, FlatList } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { ActivityCard } from '../components/ActivityCard';
import { FilterBar } from '../components/FilterBar';
import { Header } from '../components/Header';
import { useActivities } from '../hooks/useActivities';

export default function ActivityList() {
  const { activities, setFilter } = useActivities();
  const [activeFilter, setActiveFilter] = React.useState('All');
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const completedActivities = activities.filter(a => a.status === 'Completed').length;
  const totalActivities = activities.length;

  const isDark = theme.dark;

  // Determine grid columns based on screen width
  const getNumColumns = () => {
    if (Platform.OS !== 'web') return 1;
    if (width >= 1400) return 3;
    if (width >= 1024) return 2;
    if (width >= 768) return 2;
    return 1;
  };

  const numColumns = getNumColumns();
  const isDesktop = numColumns > 1;

  const EmptyState = () => (
    <Surface
      style={[
        styles.emptyState,
        {
          backgroundColor: theme.colors.surfaceVariant,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <MaterialIcons
        name="school"
        size={56}
        color={theme.colors.outline}
        style={{ marginBottom: 16 }}
      />
      <Text
        variant="titleMedium"
        style={[
          styles.emptyTitle,
          { color: theme.colors.onSurface },
        ]}
      >
        No Activities Found
      </Text>
      <Text
        variant="bodyMedium"
        style={[
          styles.emptySubtitle,
          { color: theme.colors.onSurfaceVariant },
        ]}
      >
        Try changing your filters or check back later for new content.
      </Text>
    </Surface>
  );

  const renderActivityCard = ({ item }: { item: any }) => (
    <View
      style={{
        flex: isDesktop ? 1 / numColumns : 1,
        padding: isDesktop ? 8 : 0,
        marginBottom: isDesktop ? 0 : 12,
      }}
    >
      <ActivityCard {...item} />
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <Header title="My Learning" />

      {/* Main Content */}
      <View style={styles.innerContainer}>
        {/* Section Header */}
        <View style={[styles.sectionHeader, { paddingHorizontal: 16 }]}>
          <Text
            variant="headlineSmall"
            style={[styles.title, { color: theme.colors.onBackground }]}
          >
            Learning Activities
          </Text>
          <Text
            variant="bodyMedium"
            style={[
              styles.subtitle,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {totalActivities} total • {completedActivities} completed
          </Text>
        </View>

        {/* Filter Bar */}
        <FilterBar
          active={activeFilter}
          onChange={(val) => {
            setActiveFilter(val);
            setFilter(val);
          }}
        />

        {/* Activity List/Grid */}
        {isDesktop ? (
          // Desktop Grid View
          <FlatList
            data={activities}
            renderItem={renderActivityCard}
            keyExtractor={(item) => item.id}
            key={numColumns} // Force re-render when columns change
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { 
                paddingBottom: 80, 
                paddingHorizontal: 8,
              },
            ]}
            columnWrapperStyle={{
              marginHorizontal: 8,
            }}
            ListEmptyComponent={EmptyState}
          />
        ) : (
          // Mobile List View
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: 80, paddingHorizontal: 16 },
            ]}
          >
            {activities.length === 0 ? (
              <EmptyState />
            ) : (
              activities.map((a) => (
                <View key={a.id} style={{ marginBottom: 12 }}>
                  <ActivityCard {...a} />
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 12,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  title: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 6,
    opacity: 0.75,
  },
  scrollContent: {
    paddingTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginTop: 40,
    marginHorizontal: 16,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  emptyTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
});