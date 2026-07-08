// src/screens/MeetingsScreen.js
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { DAFTAR_PERTEMUAN } from '../data/scheduleData';
import { useTheme } from '../theme/ThemeContext';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import DetailSheet from '../components/DetailSheet';

export default function MeetingsScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [kategoriAktif, setKategoriAktif] = useState('Semua');
  const [selected, setSelected] = useState(null);

  const kategoriList = useMemo(
    () => ['Semua', ...new Set(DAFTAR_PERTEMUAN.map((p) => p.kategori))],
    []
  );

  const filtered = useMemo(() => {
    return DAFTAR_PERTEMUAN.filter((item) => {
      const cocokKategori = kategoriAktif === 'Semua' || item.kategori === kategoriAktif;
      const q = query.trim().toLowerCase();
      const cocokQuery =
        q.length === 0 ||
        item.topik.toLowerCase().includes(q) ||
        item.kategori.toLowerCase().includes(q);
      return cocokKategori && cocokQuery;
    });
  }, [query, kategoriAktif]);

  const rataKehadiran = 100;

  const renderHeader = () => (
    <View>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={[styles.avatarMini, { borderColor: colors.primary, backgroundColor: colors.surfaceAlt }]} />
          <View>
            <Text style={[styles.topBarLogo, { color: colors.textDark }]}>Monitoring Perkuliahan</Text>
            <Text style={[styles.topBarSub, { color: colors.textSub }]}>Tahun Ajaran 2026/2027</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.pageTitle, { color: colors.textDark }]}>Daftar Pertemuan</Text>
      <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
        Arsip materi yang diajarkan pada setiap pertemuan tatap muka.
      </Text>

      {/* Grid Statistik */}
      <View style={styles.gridRow}>
        <View style={[styles.boxStat, { backgroundColor: colors.primary }]}>
          <Text style={styles.boxLabel}>Total Pertemuan</Text>
          <Text style={styles.boxNum}>{DAFTAR_PERTEMUAN.length} Kelas</Text>
        </View>
        <View style={[styles.boxStat, { backgroundColor: colors.surfaceAlt }]}>
          <Text style={[styles.boxLabel, { color: colors.primary }]}>Rata-rata Kehadiran</Text>
          <Text style={[styles.boxNum, { color: colors.primary }]}>{rataKehadiran}%</Text>
        </View>
      </View>

      <SearchBar value={query} onChangeText={setQuery} placeholder="Cari topik atau mata kuliah..." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {kategoriList.map((k) => {
            const aktif = kategoriAktif === k;
            return (
              <TouchableOpacity
                key={k}
                onPress={() => setKategoriAktif(k)}
                style={[
                  styles.filterChip,
                  { backgroundColor: aktif ? colors.primary : colors.surface, borderColor: colors.border },
                ]}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: '700', color: aktif ? '#fff' : colors.textSub }}
                  numberOfLines={1}
                >
                  {k}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.bg }]} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<EmptyState icon="search" text="Tidak ditemukan pertemuan yang cocok dengan pencarianmu." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.meetCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setSelected(item)}
          >
            <View style={[styles.indicatorSide, { backgroundColor: item.warna }]} />
            <View style={styles.meetBody}>
              <View style={styles.meetRowHeader}>
                <Text style={[styles.cateText, { color: item.warna }]} numberOfLines={1}>{item.kategori}</Text>
                <View style={[styles.pTag, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.pTagText, { color: colors.textSub }]}>{item.tagPertemuan}</Text>
                </View>
              </View>
              <Text style={[styles.meetTitle, { color: colors.textDark }]}>{item.topik}</Text>
              <View style={styles.meetTimeRow}>
                <Feather name="calendar" size={12} color={colors.textSub} />
                <Text style={[styles.meetTimeText, { color: colors.textSub }]}>{item.tanggal}  •  {item.jam}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={16} color={colors.textSub} style={{ marginRight: 12 }} />
          </TouchableOpacity>
        )}
      />

      <DetailSheet
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.topik}
        subtitle={selected ? `${selected.kategori} • ${selected.tagPertemuan}` : ''}
        accentColor={selected?.warna}
        icon="file-text"
        rows={
          selected
            ? [
                { icon: 'calendar', label: 'Tanggal', value: selected.tanggal },
                { icon: 'clock', label: 'Jam', value: selected.jam },
                { icon: 'check-circle', label: 'Presensi', value: 'Tercatat Hadir' },
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
  topBarLogo: { fontSize: 14, fontWeight: '800' },
  topBarSub: { fontSize: 11, fontWeight: '500' },
  pageTitle: { fontSize: 19, fontWeight: '800' },
  pageSubtitle: { fontSize: 11, marginTop: 3, marginBottom: 18, lineHeight: 16 },
  gridRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  boxStat: { flex: 1, padding: 14, borderRadius: 14 },
  boxLabel: { fontSize: 11, fontWeight: '700', color: '#fff' },
  boxNum: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 4 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  meetCard: { borderRadius: 14, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderWidth: 1 },
  indicatorSide: { width: 4, alignSelf: 'stretch' },
  meetBody: { flex: 1, padding: 14 },
  meetRowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  cateText: { fontSize: 11, fontWeight: '700', flex: 1 },
  pTag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  pTagText: { fontSize: 9, fontWeight: '700' },
  meetTitle: { fontSize: 14, fontWeight: '700', marginTop: 6 },
  meetTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 },
  meetTimeText: { fontSize: 11, fontWeight: '500' },
});
