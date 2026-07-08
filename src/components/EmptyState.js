// src/components/EmptyState.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function EmptyState({ icon = 'inbox', text = 'Tidak ada data.' }) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={[styles.iconCircle, { backgroundColor: colors.surfaceAlt }]}>
        <Feather name={icon} size={22} color={colors.primary} />
      </View>
      <Text style={[styles.text, { color: colors.textSub }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  text: { fontSize: 12, fontWeight: '600', textAlign: 'center', maxWidth: 220, lineHeight: 18 },
});
