import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import { RootSchema } from './graphqlSchema.js';
import depthLimit from 'graphql-depth-limit';
import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient = new PrismaClient();

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const validationResult = validate(RootSchema, parse(req.body.query), [
        depthLimit(5),
      ]);

      if (validationResult.length) {
        return { errors: validationResult };
      }
      prisma = fastify.prisma;

      const result = await graphql({
        schema: RootSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma: fastify.prisma },
      });

      return result;
    },
  });
};

export default plugin;
