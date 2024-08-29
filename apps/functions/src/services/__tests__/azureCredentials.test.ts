import { credential } from '../azureCredentials';
import { DefaultAzureCredential, AzureCliCredential } from '@azure/identity';

describe('azureCredentials', () => {
  it('should use AzureCliCredential in local environment', () => {
    // Arrange
    process.env.NODE_ENV = 'local';

    // Act
    const result = credential();

    // Assert
    expect(result).toBeInstanceOf(AzureCliCredential);
  });

  it('should use DefaultAzureCredential in non-local environment', () => {
    // Arrange
    process.env.NODE_ENV = 'production';

    // Act
    const result = credential();

    // Assert
    expect(result).toBeInstanceOf(DefaultAzureCredential);
  });
});
