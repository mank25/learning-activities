import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

const filters = [
  { name: "All", icon: "view-list", count: 0 },
  { name: "Online Class", icon: "laptop", count: 1 },
  { name: "Assessment", icon: "assignment", count: 2 },
];

export const FilterBar = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (val: string) => void;
}) => {
  const theme = useTheme();
  const isDark = theme.dark;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((f) => {
          const isActive = f.name === active;

          return (
            <TouchableOpacity
              key={f.name}
              onPress={() => onChange(f.name)}
              activeOpacity={0.85}
              style={styles.filterItem}
            >
              {/* Shadow container */}
              <View
                style={[
                  styles.shadowWrapper,
                  isActive
                    ? {
                        shadowColor: theme.colors.primary,
                        shadowOpacity: 0.25,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 6,
                        elevation: 5,
                        borderRadius:50
                      }
                    : {
                        shadowColor: isDark ? "#000" : "#aaa",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 3,
                        elevation: 2,
                        borderRadius:50
                      },
                ]}
              >
                <View
                  style={[
                    styles.filterButton,
                    { backgroundColor: isActive ? theme.colors.primary : theme.colors.surfaceVariant },
                    !isActive && {
                      borderColor: theme.colors.outline,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <MaterialIcons
                    name={f.icon as any}
                    size={18}
                    color={isActive ? "#fff" : theme.colors.onSurfaceVariant}
                    style={styles.filterIcon}
                  />
                  <Text
                    variant="labelMedium"
                    style={{
                      color: isActive ? "#fff" : theme.colors.onSurfaceVariant,
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {f.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterItem: {
    marginRight: 10,
  },
  shadowWrapper: {
    borderRadius: 22,
    overflow: Platform.OS === "android" ? "visible" : "visible",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    justifyContent: "center",
    minWidth: 110,
  },
  filterIcon: {
    marginRight: 6,
  },
});
