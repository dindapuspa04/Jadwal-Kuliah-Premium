// src/screens/SummaryScreen.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { MATA_KULIAH, JADWAL_SECTIONS, TUGAS_AWAL } from '../data/scheduleData';
import { useTheme } from '../theme/ThemeContext';
import { getNextClass, formatCountdown, getSapaan, getTotalSKS } from '../utils/scheduleHelpers';
import NextClassCard from '../components/NextClassCard';
import DetailSheet from '../components/DetailSheet';

export default function SummaryScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());

  // Perbarui countdown setiap menit agar selalu akurat
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const nextClass = useMemo(() => getNextClass(JADWAL_SECTIONS), [now]);
  const countdown = useMemo(() => formatCountdown(nextClass), [nextClass, now]);
  const totalSKS = useMemo(() => getTotalSKS(MATA_KULIAH), []);
  const tugasAktif = useMemo(() => TUGAS_AWAL.filter((t) => !t.selesai).length, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const progressSemester = 65;

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />
        }
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <View style={[styles.avatarMini, { borderColor: colors.primary, backgroundColor: colors.surfaceAlt }]}>
              <Text style={[styles.avatarInitial, { color: colors.primary }]}>D</Text>
            </View>
            <View>
              <Text style={[styles.topBarLogo, { color: colors.textDark }]}>Dinda Puspa Partiwi</Text>
              <Text style={[styles.topBarSub, { color: colors.textSub }]}>NPM 233510549</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={toggleTheme}
          >
            <Feather name={isDark ? 'sun' : 'moon'} size={17} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={[styles.pageTitle, { color: colors.textDark }]}>{getSapaan()}, Dinda </Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
          Teknik Informatika • Semester Genap 6 • Universitas Islam Riau
        </Text>

        {/* Kartu Kelas Berikutnya */}
        <NextClassCard nextClass={nextClass} countdown={countdown} />

        {/* Banner Statistik Info SKS */}
        <View style={[styles.blueInfoBanner, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={[styles.blueIconContainer, { backgroundColor: colors.primary }]}>
                <Ionicons name="book" size={16} color="#fff" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.infoMiniText, { color: colors.primary }]}>Total Studi</Text>
                <Text style={[styles.infoMainText, { color: colors.textDark }]}>{totalSKS} SKS</Text>
              </View>
            </View>

            <View style={[styles.statItem, { marginTop: 14 }]}>
              <View style={[styles.blueIconContainer, { backgroundColor: colors.success }]}>
                <Ionicons name="school" size={16} color="#fff" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.infoMiniText, { color: colors.success }]}>Total Mata Kuliah</Text>
                <Text style={[styles.infoMainText, { color: colors.textDark }]}>{MATA_KULIAH.length} Diambil</Text>
              </View>
            </View>

            <View style={[styles.statItem, { marginTop: 14 }]}>
              <View style={[styles.blueIconContainer, { backgroundColor: colors.accent }]}>
                <Feather name="check-square" size={15} color="#fff" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.infoMiniText, { color: colors.accent }]}>Tugas Aktif</Text>
                <Text style={[styles.infoMainText, { color: colors.textDark }]}>{tugasAktif} Belum Selesai</Text>
              </View>
            </View>
          </View>

          <View style={[styles.progressSection, { borderTopColor: colors.border }]}>
            <View style={styles.progressLabelRow}>
              <Text style={[styles.progressLabel, { color: colors.primary }]}>Progress Semester</Text>
              <Text style={[styles.progressLabel, { color: colors.primary }]}>{progressSemester}%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
              <View style={[styles.progressBarFill, { width: `${progressSemester}%`, backgroundColor: colors.primary }]} />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.textDark }]}>Mata Kuliah Semester Ini</Text>

        {/* Loop List .map() dengan Interaktivitas Click */}
        {MATA_KULIAH.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.matkulCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
            onPress={() => setSelected(item)}
          >
            <View style={[styles.sideIndicator, { backgroundColor: item.warna }]} />
            <View style={styles.matkulBody}>
              <View style={styles.matkulHeaderRow}>
                <View style={[styles.codeTag, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.codeTagText, { color: colors.primary }]}>{item.kode}</Text>
                </View>
                <View style={[styles.sksTag, { backgroundColor: colors.surfaceAlt }]}>
                  <Text style={[styles.sksTagText, { color: colors.sky }]}>{item.sks} SKS</Text>
                </View>
              </View>
              <Text style={[styles.matkulTitle, { color: colors.textDark }]}>{item.nama}</Text>
              <View style={styles.dosenRow}>
                <Feather name="user" size={12} color={colors.textSub} />
                <Text style={[styles.dosenText, { color: colors.textSub }]} numberOfLines={1}>{item.dosen}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={16} color={colors.textSub} style={{ marginRight: 14 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <DetailSheet
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.nama}
        subtitle={selected ? `${selected.kode} • Status Lunas` : ''}
        accentColor={selected?.warna}
        icon="book-open"
        rows={
          selected
            ? [
                { icon: 'user', label: 'Dosen Pengampu', value: selected.dosen },
                { icon: 'award', label: 'Bobot SKS', value: `${selected.sks} SKS` },
                { icon: 'users', label: 'Kelas', value: selected.kode },
                { icon: 'check-circle', label: 'Status Pembayaran', value: 'LUNAS' },
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
  avatarMini: { width: 38, height: 38, borderRadius: 50, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontSize: 15, fontWeight: '800' },
  topBarLogo: { fontSize: 14, fontWeight: '800' },
  topBarSub: { fontSize: 11, fontWeight: '500' },
  iconButton: { padding: 10, borderRadius: 12, borderWidth: 1 },
  pageTitle: { fontSize: 23, fontWeight: '800', marginTop: 5 },
  pageSubtitle: { fontSize: 12, marginTop: 5, lineHeight: 18, marginBottom: 18 },
  blueInfoBanner: { borderRadius: 18, padding: 18, marginBottom: 24, borderWidth: 1 },
  statsGrid: {},
  statItem: { flexDirection: 'row', alignItems: 'center' },
  blueIconContainer: { width: 34, height: 34, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  infoMiniText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  infoMainText: { fontSize: 17, fontWeight: '800' },
  progressSection: { marginTop: 16, borderTopWidth: 1, paddingTop: 12 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 11, fontWeight: '700' },
  progressBarBg: { height: 7, borderRadius: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 10 },
  sectionLabel: { fontSize: 14, fontWeight: '800', marginBottom: 12 },
  matkulCard: { borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderWidth: 1 },
  sideIndicator: { width: 4, alignSelf: 'stretch' },
  matkulBody: { flex: 1, padding: 16 },
  matkulHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  codeTagText: { fontSize: 10, fontWeight: '700' },
  sksTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  sksTagText: { fontSize: 10, fontWeight: '700' },
  matkulTitle: { fontSize: 15, fontWeight: '700', marginTop: 10 },
  dosenRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 6 },
  dosenText: { fontSize: 11, fontWeight: '500', flex: 1 },
});
