import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Alert, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MeshBackground, GlassCard, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { spacing } from '@/constants/theme';
import { CaretLeft, DownloadSimple, Trash } from 'phosphor-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function PrivacyScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [shareData, setShareData] = useState(false);

  const handleExport = () => {
    Alert.alert('Exportar datos', 'Se ha preparado un archivo JSON con tu historial completo de entrenamientos y nutrición.');
  };

  const handleDeleteAccount = () => {
    Alert.alert('Eliminar cuenta', '¿Estás seguro de que deseas eliminar permanentemente tu cuenta y todos tus datos registrados?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive' },
    ]);
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
          <TitleSmall style={[styles.headerTitle, { color: colors.foreground }]}>Privacidad</TitleSmall>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>DATOS Y TELEMETRÍA</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleText}>
                <LabelMedium style={[styles.toggleTitle, { color: colors.foreground }]}>Compartir métricas anónimas</LabelMedium>
                <BodySmall style={{ color: colors.muted }}>Ayuda a mejorar los modelos de recomendación de IA</BodySmall>
              </View>
              <Switch
                value={shareData}
                onValueChange={setShareData}
                trackColor={{ false: '#767577', true: colors.primary }}
              />
            </View>
          </GlassCard>

          <Caption style={[styles.sectionHeading, { color: colors.muted }]}>GESTIÓN DE TUS DATOS</Caption>
          <GlassCard level="hero" style={styles.card} padding={0}>
            <Pressable onPress={handleExport} style={[styles.actionRow, styles.borderBottom, { borderBottomColor: colors.borderLight }]}>
              <DownloadSimple size={20} color={colors.primary} style={{ marginRight: 10 }} />
              <Text style={[styles.actionText, { color: colors.primary }]}>Exportar mis datos (JSON)</Text>
            </Pressable>

            <Pressable onPress={handleDeleteAccount} style={styles.actionRow}>
              <Trash size={20} color={colors.destructive} style={{ marginRight: 10 }} />
              <Text style={[styles.actionText, { color: colors.destructive }]}>Eliminar cuenta y datos</Text>
            </Pressable>
          </GlassCard>
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
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  card: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  toggleText: {
    flex: 1,
    marginRight: spacing.md,
  },
  toggleTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
