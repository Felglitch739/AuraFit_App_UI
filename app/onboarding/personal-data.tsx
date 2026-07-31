import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TitleLarge, LabelMedium, Button, Input } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';

export default function PersonalDataScreen() {
  const router = useRouter();
  const updateProfile = useUserStore((state) => state.updateProfile);
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');

  const handleNext = () => {
    updateProfile({ name, age, weight, height, gender });
    router.push('/onboarding/goals');
  };

  const isFormValid = name.length > 0 && age.length > 0 && weight.length > 0 && height.length > 0 && gender !== '';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboard} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <TitleLarge style={styles.title}>Sobre ti</TitleLarge>

          <Input
            label="¿Cómo te llamas?"
            placeholder="Ej. Ana"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Input
                label="Edad"
                placeholder="25"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Input
                label="Altura (cm)"
                placeholder="170"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Input
            label="Peso (kg)"
            placeholder="65"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />

          <LabelMedium style={styles.genderLabel}>Género</LabelMedium>
          <View style={styles.genderRow}>
            <GenderButton 
              label="Mujer" 
              isSelected={gender === 'female'} 
              onPress={() => setGender('female')} 
            />
            <GenderButton 
              label="Hombre" 
              isSelected={gender === 'male'} 
              onPress={() => setGender('male')} 
            />
            <GenderButton 
              label="Otro" 
              isSelected={gender === 'other'} 
              onPress={() => setGender('other')} 
            />
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <Button 
            title="Continuar" 
            onPress={handleNext} 
            disabled={!isFormValid}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function GenderButton({ label, isSelected, onPress }: { label: string; isSelected: boolean; onPress: () => void }) {
  return (
    <Pressable 
      style={[styles.genderBtn, isSelected && styles.genderBtnSelected]} 
      onPress={onPress}
    >
      <LabelMedium style={isSelected ? styles.genderTextSelected : styles.genderText}>
        {label}
      </LabelMedium>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  genderLabel: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    color: colors.foreground,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  genderBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderText: {
    color: colors.foreground,
  },
  genderTextSelected: {
    color: colors.onPrimary,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
});
