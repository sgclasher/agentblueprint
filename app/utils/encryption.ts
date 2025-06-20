import crypto from 'crypto';

if (typeof window !== 'undefined') {
  throw new Error('Encryption utilities should only be used server-side');
}

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 16 bytes for AES
const KEY_LENGTH = 32; // 32 bytes for AES-256

function getEncryptionKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY;
  
  if (!keyHex) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  
  const key = Buffer.from(keyHex, 'hex');
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 2} hex characters)`);
  }
  
  return key;
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

export function encryptCredential(plaintext: string): { encrypted: string; iv: string; authTag: string } {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Plaintext must be a non-empty string');
  }

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error: any) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

export function decryptCredential(encrypted: string, ivHex: string, authTagHex: string): string {
  if (!encrypted || !ivHex || !authTagHex) {
    throw new Error('Encrypted data, IV, and auth tag are all required');
  }

  try {
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error: any) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

interface ServiceNowCredentials {
    username?: string;
    password?: string;
}

interface EncryptedServiceNowCredentials {
    encrypted_username: string;
    encrypted_password: string;
    username_iv: string;
    password_iv: string;
    username_auth_tag: string;
    password_auth_tag: string;
    encryption_algorithm: string;
    encrypted_at: string;
}

interface EncryptedServiceNowCredentialsForDecryption {
    encrypted_username: string;
    encrypted_password: string;
    username_iv: string;
    password_iv: string;
    username_auth_tag: string;
    password_auth_tag: string;
} 