// src/screens/TugasScreen.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MATA_KULIAH, TUGAS_AWAL } from '../data/scheduleData';
import { useTheme } from '../theme/ThemeContext';
import EmptyState from '../components/EmptyState';

const STORAGE_KEY = '@jadwalkuliah_tugas_v1';

export default function TugasScreen() {
  const { colors } = useTheme();
  const [tugas, setTugas] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [judul, setJudul] = useState('');
  const [deadline, setDeadline] = useState('');
  const [matkulTerpilih, setMatkulTerpilih] = useState(MATA_KULIAH[0].nama);
  const [filter, setFilter] = useState('semua'); // semua | aktif | selesai

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        setTugas(saved ? JSON.parse(saved) : TUGAS_AWAL);
      } catch (e) {
        setTugas(TUGAS_AWAL);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tugas)).catch(() => {});
    }
  }, [tugas, loaded]);

  const toggleSelesai = (id) => {
    setTugas((prev) => prev.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));
  };

  const hapusTugas = (id) => {
    Alert.alert('Hapus Tugas', 'Yakin ingin menghapus tugas ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => setTugas((prev) => prev.filter((t) => t.id !== id)) },
    ]);
  };

  const tambahTugas = () => {
    if (!judul.trim()) return;
    const baru = {
      id: 't' + Date.now(),
      matkul: matkulTerpilih,
      judul: judul.trim(),
      deadline: deadline.trim() || 'Belum ditentukan',
      selesai: false,
      prioritas: 'sedang',
    };
    setTugas((prev) => [baru, ...prev]);
    setJudul('');
    setDeadline('');
    setFormVisible(false);
  };

  const filtered = useMemo(() => {
    if (filter === 'aktif') return tugas.filter((t) => !t.selesai);
    if (filter === 'selesai') return tugas.filter((t) => t.selesai);
    return tugas;
  }, [tugas, filter]);

  const totalSelesai = tugas.filter((t) => t.selesai).length;
  const progress = tugas.length ? Math.round((totalSelesai / tugas.length) * 100) : 0;

  const matkulColor = (nama) => MATA_KULIAH.find((m) => m.nama === nama)?.warna || colors.primary;

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: colors.bg }]} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View>
                <Text style={[styles.pageTitle, { color: colors.textDark }]}>Daftar Tugas</Text>
                <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
                  {totalSelesai} dari {tugas.length} tugas selesai
                </Text>
              </View>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={() => setFormVisible(true)}>
                <Feather name="plus" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
              <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: colors.success }]} />
            </View>
            <Text style={[styles.progressPercent, { color: colors.success }]}>{progress}% selesai</Text>

            <View style={styles.filterRow}>
              {['semua', 'aktif', 'selesai'].map((f) => {
                const aktif = filter === f;
                return (
                  <TouchableOpacity
                    key={f}
                    onPress={() => setFilter(f)}
                    style={[
                      styles.filterChip,
                      { backgroundColor: aktif ? colors.primary : colors.surface, borderColor: colors.border },
                    ]}
                  >
                    <Text
                      style={{
                        color: aktif ? '#fff' : colors.textSub,
                        fontSize: 11,
                        fontWeight: '700',
                        textTransform: 'capitalize',
                      }}
                    >
                      {f}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={<EmptyState icon="check-square" text="Belum ada tugas pada kategori ini." />}
        renderItem={({ item }) => (
          <View style={[styles.taskCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity
              onPress={() => toggleSelesai(item.id)}
              style={[
                styles.checkbox,
                {
                  borderColor: matkulColor(item.matkul),
                  backgroundColor: item.selesai ? matkulColor(item.matkul) : 'transparent',
                },
              ]}
            >
              {item.selesai && <Feather name="check" size={13} color="#fff" />}
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.taskMatkul, { color: matkulColor(item.matkul) }]} numberOfLines={1}>
                {item.matkul}
              </Text>
              <Text
                style={[
                  styles.taskJudul,
                  { color: colors.textDark, textDecorationLine: item.selesai ? 'line-through' : 'none' },
                ]}
                numberOfLines={2}
              >
                {item.judul}
              </Text>
              <View style={styles.deadlineRow}>
                <Feather name="calendar" size={11} color={colors.textSub} />
                <Text style={[styles.deadlineText, { color: colors.textSub }]}>{item.deadline}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => hapusTugas(item.id)} style={styles.deleteBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="trash-2" size={15} color={colors.danger} />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={formVisible} transparent animationType="slide" onRequestClose={() => setFormVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalWrap}>
          <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: colors.textDark }]}>Tugas Baru</Text>
              <TouchableOpacity onPress={() => setFormVisible(false)}>
                <Feather name="x" size={20} color={colors.textSub} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.formLabel, { color: colors.textSub }]}>Mata Kuliah</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
              <View style={styles.chipsWrap}>
                {MATA_KULIAH.map((m) => {
                  const aktif = matkulTerpilih === m.nama;
                  return (
                    <TouchableOpacity
                      key={m.id}
                      onPress={() => setMatkulTerpilih(m.nama)}
                      style={[
                        styles.matkulChip,
                        { borderColor: m.warna, backgroundColor: aktif ? m.warna : 'transparent' },
                      ]}
                    >
                      <Text
                        style={{ fontSize: 10, fontWeight: '700', color: aktif ? '#fff' : m.warna }}
                        numberOfLines={1}
                      >
                        {m.nama}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <Text style={[styles.formLabel, { color: colors.textSub }]}>Judul Tugas</Text>
            <TextInput
              value={judul}
              onChangeText={setJudul}
              placeholder="cth. Laporan Praktikum Bab III"
              placeholderTextColor={colors.textSub}
              style={[styles.input, { color: colors.textDark, borderColor: colors.border, backgroundColor: colors.bg }]}
            />

            <Text style={[styles.formLabel, { color: colors.textSub }]}>Deadline</Text>
            <TextInput
              value={deadline}
              onChangeText={setDeadline}
              placeholder="cth. 20 Jul"
              placeholderTextColor={colors.textSub}
              style={[styles.input, { color: colors.textDark, borderColor: colors.border, backgroundColor: colors.bg }]}
            />

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.primary, opacity: judul.trim() ? 1 : 0.5 }]}
              onPress={tambahTugas}
              disabled={!judul.trim()}
            >
              <Text style={styles.submitText}>Simpan Tugas</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { padding: 20, paddingBottom: 40, maxWidth: 480, alignSelf: 'center', width: '100%' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  pageTitle: { fontSize: 20, fontWeight: '800' },
  pageSubtitle: { fontSize: 12, marginTop: 4, fontWeight: '500' },
  addBtn: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  progressBarBg: { height: 8, borderRadius: 10, overflow: 'hidden', marginBottom: 6 },
  progressBarFill: { height: '100%', borderRadius: 10 },
  progressPercent: { fontSize: 11, fontWeight: '700', marginBottom: 16 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  taskCard: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 14, borderWidth: 1 },
  checkbox: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  taskMatkul: { fontSize: 10.5, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.3 },
  taskJudul: { fontSize: 14, fontWeight: '700', marginTop: 5, lineHeight: 19 },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  deadlineText: { fontSize: 11, fontWeight: '600' },
  deleteBtn: { padding: 4, marginLeft: 8, marginTop: 2 },

  modalWrap: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(10,15,30,0.55)' },
  formCard: { borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 36 },
  formHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  formTitle: { fontSize: 17, fontWeight: '800' },
  formLabel: { fontSize: 11, fontWeight: '700', marginBottom: 8, marginTop: 14, textTransform: 'uppercase', letterSpacing: 0.3 },
  chipsWrap: { flexDirection: 'row', gap: 8, paddingRight: 10 },
  matkulChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, maxWidth: 200 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, fontWeight: '500' },
  submitBtn: { marginTop: 24, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
