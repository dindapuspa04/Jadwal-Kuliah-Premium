// src/components/DetailSheet.js
import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// rows: [{ icon, label, value }]
export default function DetailSheet({ visible, onClose, title, subtitle, accentColor, icon = 'info', rows = [] }) {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(320)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(320);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4, speed: 14 }),
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 320, duration: 180, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => onClose());
  };

  const tint = accentColor || colors.primary;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: colors.surface, transform: [{ translateY }], shadowColor: colors.shadow },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.border }]} />

        <View style={styles.headerRow}>
          <View style={[styles.iconWrap, { backgroundColor: tint }]}>
            <Feather name={icon} size={20} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.title, { color: colors.textDark }]} numberOfLines={2}>{title}</Text>
            {subtitle ? <Text style={[styles.subtitle, { color: tint }]} numberOfLines={1}>{subtitle}</Text> : null}
          </View>
          <TouchableOpacity onPress={handleClose} style={[styles.closeBtn, { backgroundColor: colors.bg }]}>
            <Feather name="x" size={16} color={colors.textSub} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 18 }}>
          {rows.map((r, idx) => (
            <View
              key={idx}
              style={[styles.row, { borderTopColor: colors.border, borderTopWidth: idx === 0 ? 0 : 1 }]}
            >
              <View style={styles.rowLeft}>
                <Feather name={r.icon} size={14} color={colors.textSub} />
                <Text style={[styles.rowLabel, { color: colors.textSub }]}>{r.label}</Text>
              </View>
              <Text style={[styles.rowValue, { color: colors.textDark }]} numberOfLines={3}>{r.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.doneBtn, { backgroundColor: tint }]} onPress={handleClose} activeOpacity={0.85}>
          <Text style={styles.doneText}>Mengerti</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,15,30,0.55)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 22,
    paddingBottom: 34,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 12,
  },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconWrap: { width: 46, height: 46, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '800' },
  subtitle: { fontSize: 11, fontWeight: '700', marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.4 },
  closeBtn: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13, gap: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowLabel: { fontSize: 12, fontWeight: '600' },
  rowValue: { fontSize: 13, fontWeight: '700', flexShrink: 1, textAlign: 'right' },
  doneBtn: { marginTop: 22, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  doneText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
