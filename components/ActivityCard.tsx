import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import '../theme/colors';
import '../theme/index'
import { ProgressBar } from './ProgressBar';

export const ActivityCard = ({
    id,
    title,
    type,
    status,
    duration,
    dueDate,
    score,
    progress,
}: any) => {
    const router = useRouter();
    const theme = useTheme();
    const isDark = theme.dark;

    const getStatusConfig = () => {
        switch (status) {
            case 'Completed':
                return {
                    color: theme.colors.success,
                    backgroundColor: isDark ? theme.colors.success + '33' : theme.colors.success + '20',
                    icon: 'check-circle',
                    buttonText: 'Review',
                    buttonMode: 'contained' as const,
                };
            case 'In Progress':
                return {
                    color: theme.colors.warning,
                    backgroundColor: isDark ? theme.colors.warning + '33' : theme.colors.warning + '20',
                    icon: 'timer-sand',
                    buttonText: 'Continue',
                    buttonMode: 'contained' as const,
                };
            default:
                return {
                    color: theme.colors.primary,
                    backgroundColor: isDark ? theme.colors.primary + '33' : theme.colors.primary + '20',
                    icon: 'play-circle-outline',
                    buttonText: 'Start',
                    buttonMode: 'outlined' as const,
                };
        }
    };

    const statusConfig = getStatusConfig();

    const getTypeIcon = () => {
        switch (type) {
            case 'Online Class':
                return 'laptop';
            case 'Assessment':
                return 'assignment';
            default:
                return 'school';
        }
    };

    return (
        <TouchableOpacity
            onPress={() => router.push({ pathname: '/activity/[id]', params: { id } })}
            activeOpacity={0.85}
        >
            <Card
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.colors.surface,
                        shadowColor: theme.colors.shadow,
                        borderColor: isDark ? theme.colors.outlineVariant : 'transparent',
                    },
                ]}
            >
                <Card.Content style={styles.content}>
                    {/* --- Header --- */}
                    <View style={styles.header}>
                        <View style={styles.titleSection}>
                            <MaterialIcons
                                name={getTypeIcon() as any}
                                size={24}
                                color={theme.colors.primary}
                                style={styles.typeIcon}
                            />
                            <View style={styles.titleText}>
                                <Text
                                    variant="titleMedium"
                                    style={[styles.title, { color: theme.colors.onSurface }]}
                                    numberOfLines={1}
                                >
                                    {title}
                                </Text>
                                <Text
                                    variant="bodyMedium"
                                    style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
                                    numberOfLines={1}
                                >
                                    {type}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={[
                                styles.statusChip,
                                {
                                    backgroundColor: statusConfig.backgroundColor,
                                },
                            ]}
                        >
                            <Text
                                variant="labelSmall"
                                style={[styles.statusText, { color: statusConfig.color }]}
                            >
                                {status}
                            </Text>
                        </View>
                    </View>

                    {/* --- Details --- */}
                    <View style={styles.details}>
                        {duration && (
                            <Text style={[styles.detailText, { color: theme.colors.onSurfaceVariant }]}>
                                ⏱ {duration}
                            </Text>
                        )}
                        {dueDate && (
                            <Text style={[styles.detailText, { color: theme.colors.onSurfaceVariant }]}>
                                📅 Due: {dueDate}
                            </Text>
                        )}
                        {score && (
                            <Text style={[styles.detailText, { color: theme.colors.success }]}>
                                🏆 {score}
                            </Text>
                        )}
                    </View>

                    {/* --- Progress --- */}
                    {progress !== undefined && (
                        <View style={styles.progressSection}>
                            <View style={styles.progressHeader}>
                                <Text
                                    variant="labelMedium"
                                    style={[styles.progressLabel, { color: theme.colors.onSurfaceVariant }]}
                                >
                                    Progress
                                </Text>
                                <Text
                                    variant="labelMedium"
                                    style={[styles.progressPercentage, { color: theme.colors.primary }]}
                                >
                                    {Math.round(progress * 100)}%
                                </Text>
                            </View>
                            <ProgressBar progress={progress} />
                        </View>
                    )}
                </Card.Content>

                {/* --- Button --- */}
                <Card.Actions style={styles.actions}>
                    <Button
                        mode={statusConfig.buttonMode}
                        onPress={() => router.push({ pathname: '/activity/[id]', params: { id } })}
                        style={[
                            styles.button,
                            statusConfig.buttonMode === 'contained' && {
                                backgroundColor: statusConfig.color,
                            },
                        ]}
                        labelStyle={[
                            styles.buttonLabel,
                            { color: statusConfig.buttonMode === 'outlined' ? statusConfig.color : '#FFF' },
                        ]}
                    >
                        {statusConfig.buttonText}
                    </Button>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 18,
        borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    typeIcon: {
        marginRight: 10,
    },
    titleText: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.75,
    },
    statusChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
    },
    statusText: {
        fontWeight: '600',
        fontSize: 12,
    },
    details: {
        marginBottom: 12,
    },
    detailText: {
        fontSize: 13,
        marginBottom: 4,
    },
    progressSection: {
        marginBottom: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabel: {
        fontWeight: '500',
    },
    progressPercentage: {
        fontWeight: '600',
    },
    actions: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    button: {
        borderRadius: 10,
        minWidth: 100,
        borderWidth: 1,
    },
    buttonLabel: {
        fontWeight: '600',
        fontSize: 14,
    },
});
