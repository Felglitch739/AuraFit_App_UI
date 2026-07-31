import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, Input, Button, LabelMedium } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';
import { useUserStore } from '@/store/useUserStore';
import { useTheme } from '@/hooks/useTheme';

export default function PersonalDataScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { profile, updateProfile } = useUserStore((state) => state);

  const [name, setName] = useState(profile.name || 'Ana');
  const [email, setEmail] = useState('ana@example.com');
  const [age, setAge] = useState(String(profile.age || 28));
  const [weight, setWeight] = useState(String(profile.weight || 62));
  const [height, setHeight] = useState(String(profile.height || 165));

  const handleSave = () => {
    updateProfile({
      name,
      age: String(age),
      weight: String(weight),
      height: String(height),
    });
    router.back();
  };

  return (
    <MeshBackground>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E5E5EA' }]}
            accessibilityLabel="Volver"
          >
            <CaretLeft size={20} color={colors.foreground} />
          </Pressable>
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Datos personales</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GlassCard level="hero" style={styles.card}>
            <View style={styles.inputGroup}>
              <LabelMedium style={[styles.label, { color: colors.muted }]}>Nombre completo</LabelMedium>
              <Input value={name} onChangeText={setName} placeholder="Tu nombre" />
            </View>

            <View style={styles.inputGroup}>
              <LabelMedium style={[styles.label, { color: colors.muted }]}>Correo electrónico</LabelMedium>
              <Input value={email} onChangeText={setEmail} placeholder="tu@email.com" />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <LabelMedium style={[styles.label, { color: colors.muted }]}>Edad</LabelMedium>
                <Input value={age} onChangeText={setAge} keyboardType="numeric" placeholder="28" />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <LabelMedium style={[styles.label, { color: colors.muted }]}>Peso (kg)</LabelMedium>
                <Input value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="62" />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <LabelMedium style={[styles.label, { color: colors.muted }]}>Altura (cm)</LabelMedium>
                <Input value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="165" />
              </View>
            </View>
          </GlassCard>

          <Button title="Guardar cambios" onPress={handleSave} variant="primary" style={styles.saveButton} />
        </ScrollView>
      </SafeAreaView>
    </MeshBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  card: {
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  inputGroup: {
    gap: 6,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
