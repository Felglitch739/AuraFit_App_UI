import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleSmall, Button, LabelMedium, BodySmall, Caption } from '@/components/ui';
import { colors, spacing } from '@/constants/theme';
import { CaretLeft, DownloadSimple, Trash } from 'phosphor-react-native';

export default function PrivacyScreen() {
  const router = useRouter();
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
        <TitleSmall style={styles.headerTitle}>Privacidad</TitleSmall>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Caption style={styles.sectionHeading}>DATOS Y TELEMETRÍA</Caption>
        <Card style={styles.card} padding={0}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <LabelMedium style={styles.toggleTitle}>Compartir métricas anónimas</LabelMedium>
              <BodySmall color={colors.muted}>Ayuda a mejorar los modelos de recomendación de IA</BodySmall>
            </View>
            <Switch
              value={shareData}
              onValueChange={setShareData}
              trackColor={{ false: '#767577', true: colors.primary }}
            />
          </View>
        </Card>

        <Caption style={styles.sectionHeading}>GESTIÓN DE TUS DATOS</Caption>
        <Card style={styles.card} padding={0}>
          <Button
            title="Exportar mis datos (JSON)"
            onPress={handleExport}
            variant="outline"
            style={styles.actionButton}
          >
            <DownloadSimple size={20} color={colors.primary} style={{ marginRight: 8 }} />
          </Button>

          <View style={styles.divider} />

          <Button
            title="Eliminar cuenta y datos"
            onPress={handleDeleteAccount}
            variant="outline"
            style={styles.dangerButton}
          >
            <Trash size={20} color="#FF3B30" style={{ marginRight: 8 }} />
          </Button>
        </Card>
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
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  actionButton: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.md,
    height: 50,
  },
  dangerButton: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.md,
    height: 50,
  },
});
