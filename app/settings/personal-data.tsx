import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleLarge, TitleSmall, Input, Button, LabelMedium } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { CaretLeft } from 'phosphor-react-native';
import { useUserStore } from '@/store/useUserStore';

export default function PersonalDataScreen() {
  const router = useRouter();
  const { profile, setProfile } = useUserStore((state) => state);

  const [name, setName] = useState(profile.name || 'Ana');
  const [email, setEmail] = useState('ana@example.com');
  const [age, setAge] = useState(String(profile.age || 28));
  const [weight, setWeight] = useState(String(profile.weight || 62));
  const [height, setHeight] = useState(String(profile.height || 165));

  const handleSave = () => {
    setProfile({
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Button
          title=""
          variant="outline"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <CaretLeft size={22} color={colors.text} />
        </Button>
        <TitleSmall style={styles.headerTitle}>Datos personales</TitleSmall>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.inputGroup}>
            <LabelMedium style={styles.label}>Nombre completo</LabelMedium>
            <Input value={name} onChangeText={setName} placeholder="Tu nombre" />
          </View>

          <View style={styles.inputGroup}>
            <LabelMedium style={styles.label}>Correo electrónico</LabelMedium>
            <Input value={email} onChangeText={setEmail} placeholder="tu@email.com" />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <LabelMedium style={styles.label}>Edad</LabelMedium>
              <Input value={age} onChangeText={setAge} keyboardType="numeric" placeholder="28" />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <LabelMedium style={styles.label}>Peso (kg)</LabelMedium>
              <Input value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="62" />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <LabelMedium style={styles.label}>Altura (cm)</LabelMedium>
              <Input value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="165" />
            </View>
          </View>
        </Card>

        <Button title="Guardar cambios" onPress={handleSave} variant="primary" style={styles.saveButton} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    paddingHorizontal: 0,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
    color: '#8E8E93',
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});
