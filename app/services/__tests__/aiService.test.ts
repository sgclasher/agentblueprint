import { aiService } from '../aiService';

// Mock provider classes
const mockOpenAIProvider = { generateJson: jest.fn() };
const mockClaudeProvider = { generateJson: jest.fn() };
const mockGoogleProvider = { generateJson: jest.fn() };

jest.mock('../../lib/llm/providers/openaiServerProvider', () => ({
  OpenAIServerProvider: jest.fn(() => mockOpenAIProvider)
}));
jest.mock('../../lib/llm/providers/claudeServerProvider', () => ({
  ClaudeServerProvider: jest.fn(() => mockClaudeProvider)
}));
jest.mock('../../lib/llm/providers/googleServerProvider', () => ({
  GoogleServerProvider: jest.fn(() => mockGoogleProvider)
}));
jest.mock('../../utils/encryption', () => ({
  decryptCredential: jest.fn().mockReturnValue(JSON.stringify({ apiKey: 'test-key' })),
}));

const mockCredentialsRepository = {
  getCredentials: jest.fn(),
  getDefaultProvider: jest.fn()
};

describe('aiService.generateJson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenAIProvider.generateJson.mockResolvedValue({ result: 'openai' });
    mockClaudeProvider.generateJson.mockResolvedValue({ result: 'claude' });
    mockGoogleProvider.generateJson.mockResolvedValue({ result: 'gemini' });
  });

  it('uses OpenAI provider when provider argument is "openai"', async () => {
    mockCredentialsRepository.getCredentials.mockResolvedValue([
      { service_name: 'openai', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } }
    ]);
    mockCredentialsRepository.getDefaultProvider.mockResolvedValue({ service_name: 'openai', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } });

    const result = await aiService.generateJson('sys', 'user', 'user-1', mockCredentialsRepository, 'openai');
    expect(mockOpenAIProvider.generateJson).toHaveBeenCalled();
    expect(result).toEqual({ result: 'openai' });
  });

  it('uses Claude provider when provider argument is "claude"', async () => {
    mockCredentialsRepository.getCredentials.mockResolvedValue([
      { service_name: 'claude', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } }
    ]);
    mockCredentialsRepository.getDefaultProvider.mockResolvedValue({ service_name: 'claude', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } });

    const result = await aiService.generateJson('sys', 'user', 'user-1', mockCredentialsRepository, 'claude');
    expect(mockClaudeProvider.generateJson).toHaveBeenCalled();
    expect(result).toEqual({ result: 'claude' });
  });

  it('uses Gemini provider when provider argument is "gemini"', async () => {
    mockCredentialsRepository.getCredentials.mockResolvedValue([
      { service_name: 'gemini', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } }
    ]);
    mockCredentialsRepository.getDefaultProvider.mockResolvedValue({ service_name: 'gemini', credentials_encrypted: 'enc', encryption_metadata: { iv: 'iv', authTag: 'tag' } });

    const result = await aiService.generateJson('sys', 'user', 'user-1', mockCredentialsRepository, 'gemini');
    expect(mockGoogleProvider.generateJson).toHaveBeenCalled();
    expect(result).toEqual({ result: 'gemini' });
  });
}); 