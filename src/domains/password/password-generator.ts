import { formatDuration } from "@/shared/ui/lib/utils";

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

export interface GeneratedPassword {
  password: string;
  entropy: number;
  strength: 'weak' | 'medium' | 'strong';
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = 'iIl1Oo0';
const AMBIGUOUS_CHARS = "{}[]()/\\'\"`~,;:.<>";

/**
 * Generate a cryptographically secure random password
 * Uses crypto.getRandomValues for security (not Math.random)
 */
function getSecureRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

export function generatePassword(options: PasswordOptions): GeneratedPassword {
  let charset = '';
  
  if (options.includeUppercase) charset += UPPERCASE;
  if (options.includeLowercase) charset += LOWERCASE;
  if (options.includeNumbers) charset += NUMBERS;
  if (options.includeSymbols) charset += SYMBOLS;
  
  if (options.excludeSimilar) {
    charset = charset.replace(new RegExp(`[${SIMILAR_CHARS}]`, 'g'), '');
  }
  
  if (options.excludeAmbiguous) {
    charset = charset.replace(new RegExp(`[${AMBIGUOUS_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`, 'g'), '');
  }

  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charset.charAt(getSecureRandomIndex(charset.length));
  }

  const entropy = calculateEntropy(password, charset.length);
  const strength = calculateStrength(entropy);

  return {
    password,
    entropy,
    strength,
  };
}

function calculateEntropy(password: string, charsetSize: number): number {
  return Math.log2(Math.pow(charsetSize, password.length));
}

function calculateStrength(entropy: number): 'weak' | 'medium' | 'strong' {
  if (entropy < 40) return 'weak';
  if (entropy < 60) return 'medium';
  return 'strong';
}

export function calculateCrackTime(entropy: number): string {
  const attemptsPerSecond = 1000000000; // 1 billion attempts/sec
  const seconds = Math.pow(2, entropy) / attemptsPerSecond;
  return formatDuration(seconds);
}