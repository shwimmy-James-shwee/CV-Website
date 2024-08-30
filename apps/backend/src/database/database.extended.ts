import { PrismaClient } from '@core/db';

export interface CacheStrategy {
  readonly cacheStrategy?: {
    readonly swr?: number;

    readonly ttl?: number;
  };
}
function extendClient(base: PrismaClient) {
  // Add extension methods here
  return base.$extends({});
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>;

export { ExtendedPrismaClient };
