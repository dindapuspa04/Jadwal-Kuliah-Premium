// App.js
import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import SummaryScreen from './src/screens/SummaryScreen';
import MeetingsScreen from './src/screens/MeetingsScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import TugasScreen from './src/screens/TugasScreen';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

const Tab = createBottomTabNavigator();

function TabIcon({ name, color, focused, tint }) {
  return (
    <View style={[styles.iconWrap, focused && { backgroundColor: tint + '1F' }]}>
      <Feather name={name} size={focused ? 20 : 19} color={color} />
    </View>
  );
}

function RootNavigator() {
  const { colors, isDark } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.surface,
      border: colors.border,
      primary: colors.primary,
      text: colors.textDark,
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
      />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSub,
            tabBarStyle: {
              height: Platform.OS === 'ios' ? 88 : 68,
              paddingBottom: Platform.OS === 'ios' ? 28 : 10,
              paddingTop: 8,
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            },
            tabBarLabelStyle: { fontSize: 10.5, fontWeight: '700', marginTop: 2 },
            tabBarIcon: ({ color, focused }) => {
              let iconName;
              if (route.name === 'Ringkasan') iconName = 'grid';
              else if (route.name === 'Pertemuan') iconName = 'file-text';
              else if (route.name === 'Jadwal') iconName = 'calendar';
              else if (route.name === 'Tugas') iconName = 'check-square';
              return <TabIcon name={iconName} color={color} focused={focused} tint={colors.primary} />;
            },
          })}
        >
          <Tab.Screen name="Ringkasan" component={SummaryScreen} />
          <Tab.Screen name="Jadwal" component={ScheduleScreen} />
          <Tab.Screen name="Tugas" component={TugasScreen} />
          <Tab.Screen name="Pertemuan" component={MeetingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  iconWrap: {
    width: 38,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
