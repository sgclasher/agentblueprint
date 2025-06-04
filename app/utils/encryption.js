/**
 * Credential Encryption Utility
 * 
 * Handles AES-256-GCM encryption/decryption for ServiceNow credentials
 * as specified in Phase 3 of the authentication system.
 * 
 * Security Features:
 * - AES-256-GCM encryption
 * - Random initialization vectors (IVs)
 * - Authentication tags for integrity
 * - Server-side only operation
 */

// This utility should only be used server-side
if (typeof window !== 'undefined') {
  throw new Error('Encryption utilities should only be used server-side');
}

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 16 bytes for AES
const TAG_LENGTH = 16; // 16 bytes for GCM tag
const KEY_LENGTH = 32; // 32 bytes for AES-256

/**
 * Get encryption key from environment variable
 * @returns {Buffer} The encryption key
 */
function getEncryptionKey() {
  const keyHex = process.env.ENCRYPTION_KEY;
  
  if (!keyHex) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  
  // Convert hex string to buffer
  const key = Buffer.from(keyHex, 'hex');
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 2} hex characters)`);
  }
  
  return key;
}

/**
 * Generate a random encryption key (for setup)
 * @returns {string} Hex-encoded encryption key
 */
function generateEncryptionKey() {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

/**
 * Encrypt a credential string
 * @param {string} plaintext - The credential to encrypt
 * @returns {Object} Object containing encrypted data, IV, and auth tag
 */
function encryptCredential(plaintext) {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Plaintext must be a non-empty string');
  }

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipher(ALGORITHM, key);
    cipher.setIV(iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

/**
 * Decrypt a credential
 * @param {string} encrypted - The encrypted credential (hex)
 * @param {string} ivHex - The initialization vector (hex)
 * @param {string} authTagHex - The authentication tag (hex)
 * @returns {string} The decrypted credential
 */
function decryptCredential(encrypted, ivHex, authTagHex) {
  if (!encrypted || !ivHex || !authTagHex) {
    throw new Error('Encrypted data, IV, and auth tag are all required');
  }

  try {
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipher(ALGORITHM, key);
    decipher.setIV(iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

/**
 * Encrypt ServiceNow credentials for database storage
 * @param {Object} credentials - Object containing username and password
 * @returns {Object} Object with encrypted credentials and metadata
 */
function encryptServiceNowCredentials(credentials) {
  const { username, password } = credentials;
  
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  try {
    const encryptedUsername = encryptCredential(username);
    const encryptedPassword = encryptCredential(password);
    
    return {
      encrypted_username: encryptedUsername.encrypted,
      encrypted_password: encryptedPassword.encrypted,
      username_iv: encryptedUsername.iv,
      password_iv: encryptedPassword.iv,
      username_auth_tag: encryptedUsername.authTag,
      password_auth_tag: encryptedPassword.authTag,
      encryption_algorithm: ALGORITHM,
      encrypted_at: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to encrypt ServiceNow credentials: ${error.message}`);
  }
}

/**
 * Decrypt ServiceNow credentials from database
 * @param {Object} encryptedData - Object containing encrypted credentials and metadata
 * @returns {Object} Object containing decrypted username and password
 */
function decryptServiceNowCredentials(encryptedData) {
  const {
    encrypted_username,
    encrypted_password,
    username_iv,
    password_iv,
    username_auth_tag,
    password_auth_tag
  } = encryptedData;

  try {
    const username = decryptCredential(encrypted_username, username_iv, username_auth_tag);
    const password = decryptCredential(encrypted_password, password_iv, password_auth_tag);
    
    return { username, password };
  } catch (error) {
    throw new Error(`Failed to decrypt ServiceNow credentials: ${error.message}`);
  }
}

/**
 * Validate that encryption key is properly set up
 * @returns {boolean} True if encryption is properly configured
 */
function validateEncryptionSetup() {
  try {
    const key = getEncryptionKey();
    
    // Test encryption/decryption with sample data
    const testData = 'test-credential-data';
    const encrypted = encryptCredential(testData);
    const decrypted = decryptCredential(encrypted.encrypted, encrypted.iv, encrypted.authTag);
    
    return decrypted === testData;
  } catch (error) {
    console.error('Encryption setup validation failed:', error);
    return false;
  }
}

module.exports = {
  generateEncryptionKey,
  encryptCredential,
  decryptCredential,
  encryptServiceNowCredentials,
  decryptServiceNowCredentials,
  validateEncryptionSetup
}; 