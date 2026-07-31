import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet, type TextInputProps } from 'react-native';
import { radius, spacing, typography } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  style,
  ...props
}: InputProps) {
  const { colors, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.foreground,
            backgroundColor: colors.surface,
            borderColor: isFocused
              ? colors.primary
              : error
              ? colors.destructive
              : colors.borderLight,
          },
          isFocused && styles.inputFocused,
          style,
        ]}
        placeholderTextColor={colors.muted}
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessibilityLabel={label}
        {...props}
      />
      {error && <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>}
      {helperText && !error && <Text style={[styles.helperText, { color: colors.muted }]}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelMedium,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.bodyLarge,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    minHeight: 48,
    borderWidth: 1,
  },
  inputFocused: {
    borderWidth: 1.5,
  },
  errorText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  helperText: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
});
