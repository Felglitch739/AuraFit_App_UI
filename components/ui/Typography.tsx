import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { typography as typographyTokens } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  color?: string;
}

export function DisplayLarge({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.displayLarge, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function DisplayMedium({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.displayMedium, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleLarge({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.titleLarge, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleMedium({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.titleMedium, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function TitleSmall({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.titleSmall, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelLarge({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.labelLarge, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelMedium({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.labelMedium, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function LabelSmall({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.labelSmall, { color: color || colors.muted }, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyLarge({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.bodyLarge, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodyMedium({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.bodyMedium, { color: color || colors.foreground }, style]} {...props}>
      {children}
    </Text>
  );
}

export function BodySmall({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.bodySmall, { color: color || colors.muted }, style]} {...props}>
      {children}
    </Text>
  );
}

export function Caption({ children, color, style, ...props }: TypographyProps) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.caption, { color: color || colors.muted }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  displayLarge: {
    ...typographyTokens.displayLarge,
  },
  displayMedium: {
    ...typographyTokens.displayMedium,
  },
  titleLarge: {
    ...typographyTokens.titleLarge,
  },
  titleMedium: {
    ...typographyTokens.titleMedium,
  },
  titleSmall: {
    ...typographyTokens.titleSmall,
  },
  labelLarge: {
    ...typographyTokens.labelLarge,
  },
  labelMedium: {
    ...typographyTokens.labelMedium,
  },
  labelSmall: {
    ...typographyTokens.labelSmall,
  },
  bodyLarge: {
    ...typographyTokens.bodyLarge,
  },
  bodyMedium: {
    ...typographyTokens.bodyMedium,
  },
  bodySmall: {
    ...typographyTokens.bodySmall,
  },
  caption: {
    ...typographyTokens.caption,
  },
});
