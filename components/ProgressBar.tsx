import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const ProgressBar = ({ progress }: { progress: number }) => {
  const theme = useTheme();
  const anim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Animate progress
    Animated.timing(anim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Add a subtle scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [progress]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getProgressColor = () => {
    if (progress >= 1) return theme.colors.success;
    if (progress >= 0.7) return theme.colors.primary;
    if (progress >= 0.4) return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.outlineVariant }]}>
      <Animated.View
        style={[
          styles.progressWrapper,
          {
            transform: [{ scaleY: scaleAnim }],
          }
        ]}
      >
        <Animated.View style={[styles.fill, { width, backgroundColor: getProgressColor() }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressWrapper: {
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 15,
  },
});
