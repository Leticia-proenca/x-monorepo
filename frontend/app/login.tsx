import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { AuthBandHeader } from "@/components/authComponents/auth_band_header";
import { LoginForm } from "@/components/authComponents/login_form";
import { LAYOUT } from "@/constants/layout";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/use-theme-color";
import { AuthError } from "@/services/auth";

// Test font (web): Space Grotesk — distinctive grotesque, clearly not Inter. Login only.
const LOGIN_FONT =
  "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export default function LoginScreen() {
  const { signIn, isSigningIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const titleColor = useThemeColor({}, "text");
  const footerColor = useThemeColor({}, "label");

  const handleLogin = async (email: string, password: string) => {
    setErrorMessage(null);

    try {
      await signIn({ email, password });
    } catch (error) {
      if (error instanceof AuthError) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage("Não foi possível entrar. Tente novamente.");
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthBandHeader
            subtitle="Sistema de triagem populacional"
            fontFamily={LOGIN_FONT}
          />

          <View style={styles.formArea}>
            <ThemedText
              style={[
                styles.formTitle,
                { color: titleColor, fontFamily: LOGIN_FONT },
              ]}
            >
              Acesso profissional
            </ThemedText>
            <LoginForm
              squared
              fontFamily={LOGIN_FONT}
              onSubmit={handleLogin}
              isLoading={isSigningIn}
              errorMessage={errorMessage}
            />
            <ThemedText
              style={[
                styles.footer,
                { color: footerColor, fontFamily: LOGIN_FONT },
              ]}
            >
              Uso restrito a profissionais de saúde.
            </ThemedText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "stretch",
  },
  formArea: {
    width: "100%",
    maxWidth: LAYOUT.formMaxWidth,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    gap: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  footer: {
    fontSize: 12,
    lineHeight: 18,
  },
});
