/**
 * Profile — Perfil de usuario, configuración y objetivos.
 */

import React from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleLarge, TitleSmall, LabelMedium, BodySmall, Button } from '@/components/ui';
import { colors, spacing, radius } from '@/constants/theme';
import { User, Barbell, Bell, LockKey, Question, FileText, CaretRight } from 'phosphor-react-native';
import { useUserStore } from '@/store/useUserStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useUserStore((state) => state);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TitleLarge style={styles.header}>Perfil</TitleLarge>

        {/* User Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <TitleLarge style={styles.avatarText}>
              {(profile.name || 'A').charAt(0).toUpperCase()}
            </TitleLarge>
          </View>
          <View style={styles.userInfo}>
            <TitleSmall style={{ fontWeight: '700' }}>{profile.name || 'Usuario'}</TitleSmall>
            <BodySmall color={colors.muted}>ana@example.com</BodySmall>
          </View>
        </View>

        {/* User Stats */}
        <Card style={styles.card}>
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <LabelMedium style={styles.statNumber}>{profile.age || 28}</LabelMedium>
              <BodySmall color={colors.muted}>Edad</BodySmall>
            </View>
            <View style={styles.divider} />
            <View style={styles.statColumn}>
              <LabelMedium style={styles.statNumber}>{profile.weight || 62} kg</LabelMedium>
              <BodySmall color={colors.muted}>Peso</BodySmall>
            </View>
            <View style={styles.divider} />
            <View style={styles.statColumn}>
              <LabelMedium style={styles.statNumber}>{profile.height || 165} cm</LabelMedium>
              <BodySmall color={colors.muted}>Altura</BodySmall>
            </View>
          </View>
        </Card>

        {/* Settings Links */}
        <Card style={styles.card} padding={0}>
          <SettingRow
            icon={<User size={20} color={colors.primary} />}
            label="Datos personales"
            onPress={() => router.push('/settings/personal-data')}
          />
          <SettingRow
            icon={<Barbell size={20} color={colors.primary} />}
            label="Objetivos y nivel"
            onPress={() => router.push('/settings/goals')}
          />
          <SettingRow
            icon={<Bell size={20} color={colors.primary} />}
            label="Notificaciones"
            onPress={() => router.push('/settings/notifications')}
          />
          <SettingRow
            icon={<LockKey size={20} color={colors.primary} />}
            label="Privacidad"
            onPress={() => router.push('/settings/privacy')}
            hideBorder
          />
        </Card>

        {/* Support Links */}
        <Card style={styles.card} padding={0}>
          <SettingRow
            icon={<Question size={20} color={colors.primary} />}
            label="Ayuda y soporte"
            onPress={() => router.push('/settings/support')}
          />
          <SettingRow
            icon={<FileText size={20} color={colors.primary} />}
            label="Términos de servicio"
            onPress={() => router.push('/settings/terms')}
            hideBorder
          />
        </Card>

        <Button
          title="Cerrar sesión"
          onPress={() => {}}
          variant="outline"
          style={styles.logoutButton}
        />

        <BodySmall color={colors.muted} style={styles.version}>
          AuraFit v1.0.0
        </BodySmall>
        
        <View style={{ height: spacing['2xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({
  icon,
  label,
  onPress,
  hideBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  hideBorder?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        !hideBorder && styles.settingBorder,
        pressed && { backgroundColor: 'rgba(0,0,0,0.03)' },
      ]}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <LabelMedium style={styles.settingLabel}>{label}</LabelMedium>
      <CaretRight size={20} color={'#C7C7CC'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: 115,
  },
  header: {
    marginBottom: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.onPrimary,
  },
  userInfo: {
    flex: 1,
  },
  card: {
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statColumn: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.borderLight,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingIcon: {
    width: 32,
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
  },
  logoutButton: {
    marginTop: spacing.md,
    borderColor: colors.destructive,
  },
  version: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
