import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AuthDivider } from '@/components/authComponents/auth_divider';
import { AuthInfoModal } from '@/components/authComponents/auth_info_modal';
import { AuthOutlineButton } from '@/components/authComponents/auth_outline_button';
import { formStyles } from '@/components/authComponents/formStyles';
import { FormButton } from '@/components/ui/form-button';
import { FormInput } from '@/components/ui/form-input';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void | Promise<void>;
  onGoToRegister: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  squared?: boolean;
  fontFamily?: string;
};

export function LoginForm({
  onSubmit,
  onGoToRegister,
  isLoading = false,
  errorMessage = null,
  squared = false,
  fontFamily,
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();
  const placeholderTextColor = useThemeColor({}, 'placeholderTextColor');
  const labelColor = useThemeColor({}, 'label');
  const errorColor = useThemeColor({}, 'error');
  const fontStyle = fontFamily ? { fontFamily } : null;

  return (
    <View style={formStyles.container}>
      <ThemedText style={[formStyles.label, { color: labelColor }, fontStyle]}>
        E-MAIL PROFISSIONAL
      </ThemedText>
      <FormInput
        value={email}
        onChangeText={setEmail}
        placeholder="nome@hospital.com"
        placeholderTextColor={placeholderTextColor}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        iconName="envelope.fill"
        squared={squared}
        style={fontStyle}
      />

      <View style={formStyles.passwordLabelRow}>
        <ThemedText style={[formStyles.label, { color: labelColor, marginTop: 0 }, fontStyle]}>
          SENHA
        </ThemedText>
        <TouchableOpacity onPress={() => setForgotPasswordVisible(true)} activeOpacity={0.7}>
          <ThemedText
            style={[
              formStyles.forgotText,
              { color: Colors[colorScheme ?? 'light'].tint },
              fontStyle,
            ]}
          >
            Esqueci minha senha
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FormInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={!passwordVisible}
        iconName="lock.fill"
        rightIconName={passwordVisible ? 'eye.slash.fill' : 'eye.fill'}
        onRightIconPress={() => setPasswordVisible(!passwordVisible)}
        squared={squared}
        style={fontStyle}
      />

      {errorMessage ? (
        <ThemedText style={[formStyles.errorText, { color: errorColor }, fontStyle]}>
          {errorMessage}
        </ThemedText>
      ) : null}

      <View style={formStyles.actionsSection}>
        <FormButton
          onPress={() => void onSubmit(email, password)}
          disabled={isLoading}
          label={isLoading ? 'Entrando...' : 'Entrar'}
          grouped
          squared={squared}
          fontFamily={fontFamily}
        />
        <AuthDivider />
        <AuthOutlineButton
          label="Cadastrar"
          onPress={onGoToRegister}
          squared={squared}
          fontFamily={fontFamily}
        />
      </View>

      <AuthInfoModal
        visible={forgotPasswordVisible}
        title="Redefinição de senha"
        message="Para redefinição de senha, entre em contato com o administrador do sistema."
        onClose={() => setForgotPasswordVisible(false)}
      />
    </View>
  );
}

