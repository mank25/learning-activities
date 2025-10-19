import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
  rightActions?: React.ReactNode;
};

export const Header = ({ title, showBack, onBack, subtitle, rightActions }: HeaderProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
        translucent={Platform.OS === 'android'}
      />
      <LinearGradient
        colors={['#1E88E5', '#1976D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Appbar.Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
          }}
        >
          {showBack && (
            <Appbar.Action
              icon={() => <MaterialIcons name="arrow-back" size={24} color="#fff" />}
              onPress={onBack}
              color="#fff"
              style={styles.backButton}
            />
          )}

          <Appbar.Content
            title={title}
            titleStyle={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 20,
              letterSpacing: 0.5,
            }}
            subtitle={subtitle}
            subtitleStyle={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14,
            }}
          />

          {rightActions}
        </Appbar.Header>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradient: {
    width: '100%',
    paddingBottom: 8,
  },
  backButton: {
    marginLeft: -8,
  },
});
