import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Card, Surface, Text, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Header } from '../../components/Header';
import { ProgressBar } from '../../components/ProgressBar';
import { activities } from '../../data/activities';
import '../../theme';

export default function ActivityDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.dark;

  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header title="Activity Details" showBack onBack={() => router.back()} />
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={72} color={theme.colors.error} />
          <Text
            variant="headlineSmall"
            style={[styles.errorText, { color: theme.colors.error }]}
          >
            Activity Not Found
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Go Back
          </Button>
        </View>
      </View>
    );
  }

  const getStatusConfig = () => {
    switch (activity.status) {
      case 'Completed':
        return {
          color: theme.colors.primary,
          backgroundColor: theme.colors.primary + '25',
          icon: 'check-circle',
          buttonText: 'Review Activity',
        };
      case 'In Progress':
        return {
          color: theme.colors.onError,
          backgroundColor: theme.colors.warning + '25',
          icon: 'hourglass-empty',
          buttonText: 'Continue Learning',
        };
      default:
        // Fix purple color contrast for dark mode
        const adjustedSecondary = isDark ? '#9FA8FF' : theme.colors.secondary;
        return {
          color: adjustedSecondary,
          backgroundColor: adjustedSecondary + '25',
          icon: 'play-circle-outline',
          buttonText: 'Start Now',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getTypeIcon = () => {
    switch (activity.type) {
      case 'Online Class':
        return 'laptop';
      case 'Assessment':
        return 'assignment';
      default:
        return 'school';
    }
  };

  const sanitizedProgress =
    typeof activity.progress === 'number'
      ? Math.min(Math.max(activity.progress, 0), 1)
      : 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <Header
        title="Activity Details"
        showBack
        onBack={() => router.back()}
        subtitle={activity.type}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentWrapper}>
          {/* Hero Section */}
          <Surface
            style={[
              styles.heroCard,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <View style={styles.heroContent}>
              <View style={styles.titleRow}>
                <MaterialIcons
                  name={getTypeIcon() as any}
                  size={36}
                  color={theme.colors.primary}
                  style={styles.icon}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    variant="headlineMedium"
                    style={[styles.title, { color: theme.colors.onSurface }]}
                  >
                    {activity.title}
                  </Text>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    {activity.type}
                  </Text>
                </View>
              </View>

              <View
                style={[styles.statusBadge, { backgroundColor: statusConfig.backgroundColor }]}
              >
                <MaterialIcons
                  name={statusConfig.icon as any}
                  size={18}
                  color={statusConfig.color}
                  style={{ marginRight: 6 }}
                />
                <Text
                  variant="labelLarge"
                  style={{ color: statusConfig.color, fontWeight: '600' }}
                >
                  {activity.status}
                </Text>
              </View>
            </View>
          </Surface>

          {/* Details */}
          <Card
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.shadow,
              },
            ]}
          >
            <Card.Content>
              <Text
                variant="titleLarge"
                style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
              >
                Activity Information
              </Text>
              <View style={styles.detailsList}>
                {activity.duration != null && activity.duration !== '' && (
                  <DetailItem
                    icon="schedule"
                    label="Duration"
                    value={activity.duration}
                    color={theme.colors.primary}
                  />
                )}
                {activity.dueDate != null && activity.dueDate !== '' && (
                  <DetailItem
                    icon="event"
                    label="Due Date"
                    value={activity.dueDate}
                    color={theme.colors.primary}
                  />
                )}
                {activity.score != null && (
                  <DetailItem
                    icon="emoji-events"
                    label="Score"
                    value={activity.score}
                    color={theme.colors.warning}
                  />
                )}
              </View>
            </Card.Content>
          </Card>

          {/* Progress */}
          {activity.progress != null && (
            <Card
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.surface,
                  shadowColor: theme.colors.shadow,
                },
              ]}
            >
              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                >
                  Progress
                </Text>
                <View style={styles.progressRow}>
                  <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                    Completion
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{ color: theme.colors.primary, fontWeight: '700' }}
                  >
                    {Math.round(sanitizedProgress * 100)}%
                  </Text>
                </View>
                <ProgressBar progress={sanitizedProgress} />
              </Card.Content>
            </Card>
          )}

          {/* Button (no icon) */}
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: statusConfig.color }]}
            onPress={() => {}}
            labelStyle={{ fontSize: 16, fontWeight: '600' }}
          >
            {statusConfig.buttonText}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

/* --- Subcomponent for details --- */
const DetailItem = ({ icon, label, value, color }: any) => {
  const theme = useTheme();
  return (
    <View style={styles.detailItem}>
      <MaterialIcons name={icon} size={24} color={color} />
      <View style={styles.detailText}>
        <Text
          variant="labelMedium"
          style={{ color: theme.colors.onSurfaceVariant, marginBottom: 2 }}
        >
          {label}
        </Text>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onSurface, fontWeight: '500' }}
        >
          {value != null ? value : '-'}
        </Text>
      </View>
    </View>
  );
};

/* --- Styles --- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingBottom: 80,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 768,
    paddingHorizontal: 16,
  },
  heroCard: {
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 16,
    elevation: 3,
    shadowOpacity: 0.08,
  },
  heroContent: { padding: 20 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: { marginRight: 14 },
  title: { fontWeight: '700', lineHeight: 30 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
    shadowOpacity: 0.05,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 14,
  },
  detailsList: { gap: 16 },
  detailItem: { flexDirection: 'row', alignItems: 'center' },
  detailText: { marginLeft: 14 },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    borderRadius: 16,
    marginBottom: 32,
    marginTop: 4,
    paddingVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: { marginVertical: 16, textAlign: 'center' },
  backButton: { borderRadius: 12 },
});