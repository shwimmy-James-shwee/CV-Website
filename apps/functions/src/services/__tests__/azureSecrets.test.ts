import { SecretClient } from '@azure/keyvault-secrets';
import { secrets } from '../azureSecrets';

jest.mock('@azure/keyvault-secrets');

describe('azureSecrets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a SecretClient instance with the correct URL and credential', () => {
    // Arrange
    const mockCredential = jest.fn();

    process.env.AZURE_KEY_VAULT_NAME = 'test';
    jest.mock('../azureCredentials', () => ({ credential: jest.fn().mockReturnValue(mockCredential) }));

    // Act
    const result = secrets;

    // Assert
    expect(result).toBeInstanceOf(SecretClient);
  });
});
