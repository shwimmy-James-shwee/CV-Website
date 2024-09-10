import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from '@/resolvers/user.resolver';

/**
 * Module responsible for exposing & configuring everything GraphQL-related
 */
@Module({
  imports: [
    UserResolver,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/schema.graphql'),
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
      formatError: (e) => {
        const { message } = e;
        return {
          message,
          code: 400,
        };
      },
    }),
  ],
  exports: [UserResolver],
})
export class GraphQLResolversModule {}
