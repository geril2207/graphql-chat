import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Void: any;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  type: ChatType;
  userCreated?: Maybe<User>;
};

export type ChatInfo = {
  __typename?: 'ChatInfo';
  chat: Chat;
  messages: Array<Maybe<Message>>;
};

export enum ChatType {
  Group = 'group',
  Private = 'private'
}

export type LoginInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat?: Maybe<Chat>;
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
  message: Scalars['String'];
  sender: User;
  senderId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<ReturnUserWithAccessToken>;
  refresh: RefreshTokenMutation;
  register?: Maybe<ReturnUserWithAccessToken>;
  sendMessage?: Maybe<Message>;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  user: RegisterUserInput;
};


export type MutationSendMessageArgs = {
  message: SendMessageInput;
};

export type Query = {
  __typename?: 'Query';
  getUserData?: Maybe<User>;
};

export type RefreshTokenMutation = {
  __typename?: 'RefreshTokenMutation';
  accessToken: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type ReturnUserWithAccessToken = {
  __typename?: 'ReturnUserWithAccessToken';
  accessToken: Scalars['String'];
  user: User;
};

export type SendMessageInput = {
  chatId?: InputMaybe<Scalars['Int']>;
  message: Scalars['String'];
  receiverId?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Message>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type RefreshAuthMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAuthMutation = { __typename?: 'Mutation', refresh: { __typename?: 'RefreshTokenMutation', accessToken: string } };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', getUserData?: { __typename?: 'User', id: number, email: string, login: string } | null };

export type MessageSendedSubscribeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSendedSubscribeSubscription = { __typename?: 'Subscription', messageAdded?: { __typename?: 'Message', message: string } | null };

export type SendMessageMutationVariables = Exact<{
  message: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Message', message: string, sender: { __typename?: 'User', id: number, login: string } } | null };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'ReturnUserWithAccessToken', accessToken: string, user: { __typename?: 'User', id: number, email: string, login: string } } | null };


export const RefreshAuthDocument = gql`
    mutation refreshAuth {
  refresh {
    accessToken
  }
}
    `;
export type RefreshAuthMutationFn = Apollo.MutationFunction<RefreshAuthMutation, RefreshAuthMutationVariables>;

/**
 * __useRefreshAuthMutation__
 *
 * To run a mutation, you first call `useRefreshAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAuthMutation, { data, loading, error }] = useRefreshAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAuthMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAuthMutation, RefreshAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAuthMutation, RefreshAuthMutationVariables>(RefreshAuthDocument, options);
      }
export type RefreshAuthMutationHookResult = ReturnType<typeof useRefreshAuthMutation>;
export type RefreshAuthMutationResult = Apollo.MutationResult<RefreshAuthMutation>;
export type RefreshAuthMutationOptions = Apollo.BaseMutationOptions<RefreshAuthMutation, RefreshAuthMutationVariables>;
export const GetUserDataDocument = gql`
    query getUserData {
  getUserData {
    id
    email
    login
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const MessageSendedSubscribeDocument = gql`
    subscription MessageSendedSubscribe {
  messageAdded {
    message
  }
}
    `;

/**
 * __useMessageSendedSubscribeSubscription__
 *
 * To run a query within a React component, call `useMessageSendedSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSendedSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSendedSubscribeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageSendedSubscribeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSendedSubscribeSubscription, MessageSendedSubscribeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSendedSubscribeSubscription, MessageSendedSubscribeSubscriptionVariables>(MessageSendedSubscribeDocument, options);
      }
export type MessageSendedSubscribeSubscriptionHookResult = ReturnType<typeof useMessageSendedSubscribeSubscription>;
export type MessageSendedSubscribeSubscriptionResult = Apollo.SubscriptionResult<MessageSendedSubscribeSubscription>;
export const SendMessageDocument = gql`
    mutation sendMessage($message: SendMessageInput!) {
  sendMessage(message: $message) {
    sender {
      id
      login
    }
    message
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      email
      login
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;