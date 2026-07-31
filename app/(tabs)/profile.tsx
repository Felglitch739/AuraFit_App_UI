/**
 * Profile — Perfil de usuario, configuración y selección de modo (Claro / Oscuro).
 */

import React from 'react';
import { ScrollView, View, StyleSheet, Pressable, Switch, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, TitleLarge, TitleSmall, LabelMedium, BodySmall, Button } from '@/components/ui';
import { spacing, radius } from '@/constants/theme';
import { User, Barbell, Bell, LockKey, Question, FileText, CaretRight, Moon, Sun } from 'phosphor-react-native';
import { useUserStore } from '@/store/useUserStore';
import { useTheme } from '@/hooks/useTheme';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useUserStore((state) => state);
  const { colors, isDark, toggleThemeMode } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TitleLarge style={[styles.header, { color: colors.foreground }]}>Perfil</TitleLarge>

        {/* User Info */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: isDark ? '#1C1C24' : '#E5E5EA' }]}>
            <TitleLarge style={[styles.avatarText, { color: colors.primary }]}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </TitleLarge>
          </View>
          <View style={styles.profileTextContainer}>
            <TitleSmall style={{ fontWeight: '700', color: colors.foreground }}>{profile.name || 'Usuario'}</TitleSmall>
            <BodySmall style={{ color: colors.muted }}>ana@example.com</BodySmall>
          </View>
        </View>

        {/* User Stats */}
        <Card style={styles.card}>
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <LabelMedium style={[styles.statNumber, { color: colors.foreground }]}>{profile.age || 28}</LabelMedium>
              <BodySmall style={{ color: colors.muted }}>Edad</BodySmall>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.statColumn}>
              <LabelMedium style={[styles.statNumber, { color: colors.foreground }]}>{profile.weight || 62} kg</LabelMedium>
              <BodySmall style={{ color: colors.muted }}>Peso</BodySmall>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.statColumn}>
              <LabelMedium style={[styles.statNumber, { color: colors.foreground }]}>{profile.height || 165} cm</LabelMedium>
              <BodySmall style={{ color: colors.muted }}>Altura</BodySmall>
            </View>
          </View>
        </Card>

        {/* Theme Settings Section */}
        <Card style={styles.card} padding={0}>
          <View style={[styles.settingRow, styles.settingBorder, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.settingIcon}>
              {isDark ? (
                <Moon size={20} color={colors.primary} weight="fill" />
              ) : (
                <Sun size={20} color="#FF9500" weight="fill" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <LabelMedium style={{ color: colors.foreground, fontWeight: '600' }}>
                Modo oscuro
              </LabelMedium>
              <BodySmall style={{ color: colors.muted, fontSize: 11 }}>
                {isDark ? 'Activado (Oscuro)' : 'Desactivado (Claro)'}
              </BodySmall>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleThemeMode}
              trackColor={{ false: '#D1D1D6', true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

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

        <BodySmall style={[styles.version, { color: colors.muted }]}>
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
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        !hideBorder && [styles.settingBorder, { borderBottomColor: colors.borderLight }],
        pressed && { backgroundColor: 'rgba(0,0,0,0.03)' },
      ]}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <LabelMedium style={[styles.settingLabel, { color: colors.foreground }]}>{label}</LabelMedium>
      <CaretRight size={20} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
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
    fontSize: 28,
    fontWeight: '800',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
  },
  profileTextContainer: {
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
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: 30,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  settingBorder: {
    borderBottomWidth: 1,
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
  },
  version: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
