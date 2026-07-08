// src/screens/ScheduleScreen.js
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { JADWAL_SECTIONS } from '../data/scheduleData';
import { useTheme } from '../theme/ThemeContext';
import { getHariIni } from '../utils/scheduleHelpers';
import EmptyState from '../components/EmptyState';
import DetailSheet from '../components/DetailSheet';

export default function ScheduleScreen() {
  const { colors } = useTheme();
  const [hariAktif, setHariAktif] = useState('Semua');
  const [selected, setSelected] = useState(null);
  const hariIni = getHariIni();

  const daftarHari = useMemo(() => ['Semua', ...JADWAL_SECTIONS.map((s) => s.title)], []);

  const sections = useMemo(() => {
    if (hariAktif === 'Semua') return JADWAL_SECTIONS;
    return JADWAL_SECTIONS.filter((s) => s.title === hariAktif);
  }, [hariAktif]);

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.bg }]} edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<EmptyState icon="calendar" text="Tidak ada jadwal kuliah pada hari ini." />}
        ListHeaderComponent={() => (
          <View>
            {/* Top Header */}
            <View style={styles.topBar}>
              <View style={styles.topBarLeft}>
                <View style={[styles.avatarMini, { borderColor: colors.primary, backgroundColor: colors.surfaceAlt }]} />
                <View>
                  <Text style={[styles.topBarLogo, { color: colors.textDark }]}>Agenda Kuliah</Text>
                  <Text style={[styles.topBarDate, { color: colors.textSub }]}>Tahun Ajaran 2026/2027</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.pageTitle, { color: colors.textDark }]}>Jadwal Kuliah Mingguan</Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
              Hari ini: <Text style={{ fontWeight: '800', color: colors.primary }}>{hariIni}</Text>
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 6 }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {daftarHari.map((h) => {
                  const aktif = hariAktif === h;
                  return (
                    <TouchableOpacity
                      key={h}
                      onPress={() => setHariAktif(h)}
                      style={[
                        styles.filterChip,
                        { backgroundColor: aktif ? colors.primary : colors.surface, borderColor: colors.border },
                      ]}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '700', color: aktif ? '#fff' : colors.textSub }}>
                        {h}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
        renderSectionHeader={({ section: { title, warnaHari, data } }) => (
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.dayPill, { backgroundColor: warnaHari }]}>
              <Feather name="calendar" size={12} color="#fff" />
              <Text style={styles.dayText}>{title}</Text>
              {title === hariIni && (
                <View style={styles.liveDot}>
                  <Text style={styles.liveDotText}>●</Text>
                </View>
              )}
            </View>
            <View style={[styles.countPill, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[styles.countText, { color: colors.primary }]}>{data.length} Matkul</Text>
            </View>
          </View>
        )}
        renderItem={({ item, section }) => (
          <TouchableOpacity
            style={[styles.schedCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setSelected({ ...item, hari: section.title })}
          >
            <View style={[styles.borderBarLeft, { backgroundColor: section.warnaHari }]} />
            <View style={styles.schedContent}>
              <View style={styles.schedTopRow}>
                <Text style={[styles.className, { color: colors.textDark }]} numberOfLines={1}>{item.nama}</Text>
                <View style={[styles.sksBadge, { backgroundColor: colors.surfaceAlt }]}>
                  <Text style={[styles.sksBadgeText, { color: colors.sky }]}>{item.sks} SKS</Text>
                </View>
              </View>
              <View style={styles.metaRow}>
                <Feather name="map-pin" size={12} color={colors.textSub} />
                <Text style={[styles.metaText, { color: colors.textSub }]}>{item.ruangan}</Text>
                <Feather name="clock" size={12} color={colors.textSub} style={{ marginLeft: 12 }} />
                <Text style={[styles.metaText, { color: colors.textSub }]}>{item.jam}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <DetailSheet
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.nama}
        subtitle={selected ? `${selected.hari} • ${selected.jam}` : ''}
        icon="map-pin"
        rows={
          selected
            ? [
                { icon: 'map-pin', label: 'Ruangan', value: selected.ruangan },
                { icon: 'clock', label: 'Jam', value: selected.jam },
                { icon: 'award', label: 'SKS', value: `${selected.sks} SKS` },
                { icon: 'calendar', label: 'Hari', value: selected.hari },
              ]
            : []
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: 20, paddingBottom: 40, maxWidth: 480, alignSelf: 'center', width: '100%' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarMini: { width: 36, height: 36, borderRadius: 50, borderWidth: 1.5 },
  topBarLogo: { fontSize: 13, fontWeight: '800' },
  topBarDate: { fontSize: 10, fontWeight: '600' },
  pageTitle: { fontSize: 20, fontWeight: '800' },
  pageSubtitle: { fontSize: 12, marginTop: 4, marginBottom: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 10 },
  dayPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 },
  dayText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  liveDot: { marginLeft: 2 },
  liveDotText: { color: '#4ADE80', fontSize: 9 },
  countPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  countText: { fontSize: 10, fontWeight: '700' },
  schedCard: { borderRadius: 14, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, marginBottom: 6 },
  borderBarLeft: { width: 4 },
  schedContent: { flex: 1, padding: 16 },
  schedTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  className: { fontSize: 14, fontWeight: '700', flex: 1, marginRight: 10 },
  sksBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  sksBadgeText: { fontSize: 10, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  metaText: { fontSize: 12, marginLeft: 4, fontWeight: '500' },
});
