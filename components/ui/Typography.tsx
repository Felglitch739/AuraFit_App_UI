/**
 * Typography — Text wrappers con jerarquía visual consistente.
 * Usa los tokens de typography del design system.
 */

import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { colors, typography as typographyTokens } from '@/constants/theme';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export function DisplayLarge({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.displayLarge, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function DisplayMedium({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.displayMedium, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleLarge({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.titleLarge, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleMedium({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.titleMedium, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleSmall({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.titleSmall, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelLarge({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.labelLarge, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelMedium({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.labelMedium, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelSmall({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.labelSmall, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyLarge({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.bodyLarge, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyMedium({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.bodyMedium, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodySmall({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.bodySmall, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

export function Caption({ children, color, style, ...props }: TypographyProps) {
  return (
    <Text style={[styles.caption, color ? { color } : undefined, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  displayLarge: {
    ...typographyTokens.displayLarge,
    color: colors.foreground,
  },
  displayMedium: {
    ...typographyTokens.displayMedium,
    color: colors.foreground,
  },
  titleLarge: {
    ...typographyTokens.titleLarge,
    color: colors.foreground,
  },
  titleMedium: {
    ...typographyTokens.titleMedium,
    color: colors.foreground,
  },
  titleSmall: {
    ...typographyTokens.titleSmall,
    color: colors.foreground,
  },
  labelLarge: {
    ...typographyTokens.labelLarge,
    color: colors.foreground,
  },
  labelMedium: {
    ...typographyTokens.labelMedium,
    color: colors.foreground,
  },
  labelSmall: {
    ...typographyTokens.labelSmall,
    color: colors.muted,
  },
  bodyLarge: {
    ...typographyTokens.bodyLarge,
    color: colors.foreground,
  },
  bodyMedium: {
    ...typographyTokens.bodyMedium,
    color: colors.foreground,
  },
  bodySmall: {
    ...typographyTokens.bodySmall,
    color: colors.subtle,
  },
  caption: {
    ...typographyTokens.caption,
    color: colors.muted,
  },
});
