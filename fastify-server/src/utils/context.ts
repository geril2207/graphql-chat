import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from './prisma'

export const buildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
) => {
  return {
    req,
    authorization: req.headers.authorization ?? '',
    prisma,
  }
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}
