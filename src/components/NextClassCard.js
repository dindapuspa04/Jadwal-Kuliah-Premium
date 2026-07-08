// src/components/NextClassCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function NextClassCard({ nextClass, countdown }) {
  const { colors, isDark } = useTheme();

  if (!nextClass) {
    return (
      <View style={[styles.emptyWrap, { backgroundColor: colors.successSoft, borderColor: colors.border }]}>
        <Feather name="check-circle" size={20} color={colors.success} />
        <Text style={[styles.emptyText, { color: colors.textSub }]}>
          Tidak ada jadwal kuliah dalam waktu dekat. Nikmati waktu luangmu!
        </Text>
      </View>
    );
  }

  const gradientColors = isDark ? [colors.primaryDeep, '#1E1B4B'] : [colors.primary, '#6D28D9'];
  const isLive = countdown === 'Sedang berlangsung sekarang';

  return (
    <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
      <View style={styles.rowTop}>
        <Text style={styles.eyebrow}>{isLive ? 'BERLANGSUNG SEKARANG' : 'KELAS BERIKUTNYA'}</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{nextClass.isToday ? 'Hari Ini' : nextClass.hari}</Text>
        </View>
      </View>

      <Text style={styles.className} numberOfLines={2}>{nextClass.nama}</Text>

      <View style={styles.metaRow}>
        <Feather name="map-pin" size={13} color="rgba(255,255,255,0.85)" />
        <Text style={styles.metaText}>{nextClass.ruangan}</Text>
        <Feather name="clock" size={13} color="rgba(255,255,255,0.85)" style={{ marginLeft: 14 }} />
        <Text style={styles.metaText}>{nextClass.jam}</Text>
      </View>

      <View style={[styles.countdownWrap, isLive && { backgroundColor: 'rgba(16,185,129,0.35)' }]}>
        <Feather name={isLive ? 'radio' : 'zap'} size={13} color="#FCD34D" />
        <Text style={styles.countdownText}>{countdown}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 22, padding: 20, marginBottom: 22 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  pill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pillText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  className: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 12, lineHeight: 26 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  metaText: { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600', marginLeft: 5 },
  countdownWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 16,
    gap: 7,
  },
  countdownText: { color: '#FCD34D', fontSize: 12, fontWeight: '800' },
  emptyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 18,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
  },
  emptyText: { fontSize: 12, fontWeight: '600', flex: 1, lineHeight: 17 },
});
