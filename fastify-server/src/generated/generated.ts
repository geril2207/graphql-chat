import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import type { MercuriusContext } from 'mercurius'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import('mercurius-codegen').DeepPartial<TResult>>
  | import('mercurius-codegen').DeepPartial<TResult>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Represents NULL values */
  Void: any
  _FieldSet: any
}

export enum ChatType {
  group = 'group',
  private = 'private',
}

export type Chat = {
  __typename?: 'Chat'
  id: Scalars['Int']
  title?: Maybe<Scalars['String']>
  type: ChatType
  userCreated?: Maybe<User>
}

export type ChatInfo = {
  __typename?: 'ChatInfo'
  chat: Chat
  messages: Array<Maybe<Message>>
}

export type Message = {
  __typename?: 'Message'
  sender: User
  message: Scalars['String']
  chat?: Maybe<Chat>
  senderId: Scalars['Int']
  chatId: Scalars['Int']
  createdAt: Scalars['String']
}

export type SendMessageInput = {
  chatId?: InputMaybe<Scalars['Int']>
  receiverId?: InputMaybe<Scalars['Int']>
  message: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  sendMessage?: Maybe<Message>
  register?: Maybe<ReturnUserWithAccessToken>
  login?: Maybe<ReturnUserWithAccessToken>
  refresh: RefreshTokenMutation
}

export type MutationsendMessageArgs = {
  message: SendMessageInput
}

export type MutationregisterArgs = {
  user: RegisterUserInput
}

export type MutationloginArgs = {
  data: LoginInput
}

export type Query = {
  __typename?: 'Query'
  getUserData?: Maybe<User>
}

export type Subscription = {
  __typename?: 'Subscription'
  messageAdded?: Maybe<Message>
}

export type User = {
  __typename?: 'User'
  id: Scalars['Int']
  email: Scalars['String']
  login: Scalars['String']
  password: Scalars['String']
}

export type ReturnUserWithAccessToken = {
  __typename?: 'ReturnUserWithAccessToken'
  user: User
  accessToken: Scalars['String']
}

export type RegisterUserInput = {
  email: Scalars['String']
  login: Scalars['String']
  password: Scalars['String']
}

export type LoginInput = {
  login: Scalars['String']
  password: Scalars['String']
}

export type RefreshTokenMutation = {
  __typename?: 'RefreshTokenMutation'
  accessToken: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ChatType: ChatType
  Chat: ResolverTypeWrapper<Chat>
  Int: ResolverTypeWrapper<Scalars['Int']>
  String: ResolverTypeWrapper<Scalars['String']>
  ChatInfo: ResolverTypeWrapper<ChatInfo>
  Void: ResolverTypeWrapper<Scalars['Void']>
  Message: ResolverTypeWrapper<Message>
  SendMessageInput: SendMessageInput
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  ReturnUserWithAccessToken: ResolverTypeWrapper<ReturnUserWithAccessToken>
  RegisterUserInput: RegisterUserInput
  LoginInput: LoginInput
  RefreshTokenMutation: ResolverTypeWrapper<RefreshTokenMutation>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Chat: Chat
  Int: Scalars['Int']
  String: Scalars['String']
  ChatInfo: ChatInfo
  Void: Scalars['Void']
  Message: Message
  SendMessageInput: SendMessageInput
  Mutation: {}
  Query: {}
  Subscription: {}
  User: User
  ReturnUserWithAccessToken: ReturnUserWithAccessToken
  RegisterUserInput: RegisterUserInput
  LoginInput: LoginInput
  RefreshTokenMutation: RefreshTokenMutation
  Boolean: Scalars['Boolean']
}

export type ChatResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<ResolversTypes['ChatType'], ParentType, ContextType>
  userCreated?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ChatInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['ChatInfo'] = ResolversParentTypes['ChatInfo']
> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>
  messages?: Resolver<
    Array<Maybe<ResolversTypes['Message']>>,
    ParentType,
    ContextType
  >
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void'
}

export type MessageResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = {
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType>
  senderId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  chatId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  sendMessage?: Resolver<
    Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    RequireFields<MutationsendMessageArgs, 'message'>
  >
  register?: Resolver<
    Maybe<ResolversTypes['ReturnUserWithAccessToken']>,
    ParentType,
    ContextType,
    RequireFields<MutationregisterArgs, 'user'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['ReturnUserWithAccessToken']>,
    ParentType,
    ContextType,
    RequireFields<MutationloginArgs, 'data'>
  >
  refresh?: Resolver<
    ResolversTypes['RefreshTokenMutation'],
    ParentType,
    ContextType
  >
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getUserData?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  messageAdded?: SubscriptionResolver<
    Maybe<ResolversTypes['Message']>,
    'messageAdded',
    ParentType,
    ContextType
  >
}

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ReturnUserWithAccessTokenResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['ReturnUserWithAccessToken'] = ResolversParentTypes['ReturnUserWithAccessToken']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type RefreshTokenMutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['RefreshTokenMutation'] = ResolversParentTypes['RefreshTokenMutation']
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = MercuriusContext> = {
  Chat?: ChatResolvers<ContextType>
  ChatInfo?: ChatInfoResolvers<ContextType>
  Void?: GraphQLScalarType
  Message?: MessageResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  ReturnUserWithAccessToken?: ReturnUserWithAccessTokenResolvers<ContextType>
  RefreshTokenMutation?: RefreshTokenMutationResolvers<ContextType>
}

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj
    params: TParams
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>
      opts?: {
        cache?: boolean
      }
    }
export interface Loaders<
  TContext = import('mercurius').MercuriusContext & {
    reply: import('fastify').FastifyReply
  }
> {
  Chat?: {
    id?: LoaderResolver<Scalars['Int'], Chat, {}, TContext>
    title?: LoaderResolver<Maybe<Scalars['String']>, Chat, {}, TContext>
    type?: LoaderResolver<ChatType, Chat, {}, TContext>
    userCreated?: LoaderResolver<Maybe<User>, Chat, {}, TContext>
  }

  ChatInfo?: {
    chat?: LoaderResolver<Chat, ChatInfo, {}, TContext>
    messages?: LoaderResolver<Array<Maybe<Message>>, ChatInfo, {}, TContext>
  }

  Message?: {
    sender?: LoaderResolver<User, Message, {}, TContext>
    message?: LoaderResolver<Scalars['String'], Message, {}, TContext>
    chat?: LoaderResolver<Maybe<Chat>, Message, {}, TContext>
    senderId?: LoaderResolver<Scalars['Int'], Message, {}, TContext>
    chatId?: LoaderResolver<Scalars['Int'], Message, {}, TContext>
    createdAt?: LoaderResolver<Scalars['String'], Message, {}, TContext>
  }

  User?: {
    id?: LoaderResolver<Scalars['Int'], User, {}, TContext>
    email?: LoaderResolver<Scalars['String'], User, {}, TContext>
    login?: LoaderResolver<Scalars['String'], User, {}, TContext>
    password?: LoaderResolver<Scalars['String'], User, {}, TContext>
  }

  ReturnUserWithAccessToken?: {
    user?: LoaderResolver<User, ReturnUserWithAccessToken, {}, TContext>
    accessToken?: LoaderResolver<
      Scalars['String'],
      ReturnUserWithAccessToken,
      {},
      TContext
    >
  }

  RefreshTokenMutation?: {
    accessToken?: LoaderResolver<
      Scalars['String'],
      RefreshTokenMutation,
      {},
      TContext
    >
  }
}
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
