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
};

export type Chat = {
  __typename?: 'Chat';
  chatParticipants: Array<User>;
  id: Scalars['Int'];
  messages: Array<Message>;
  title?: Maybe<Scalars['String']>;
  type: ChatType;
  userCreated: User;
};


export type ChatChatParticipantsArgs = {
  withUser?: InputMaybe<Scalars['Boolean']>;
};


export type ChatMessagesArgs = {
  sort?: InputMaybe<GetMessagesSort>;
};

export enum ChatType {
  Group = 'group',
  Private = 'private'
}

export type GetMessagesSort = {
  orderBy?: InputMaybe<SortEnum>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type LoginMutationInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  message: Scalars['String'];
  sender: User;
  senderId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: ReturnUserWithAccessToken;
  refresh: ReturnAccessToken;
  sendMessage: Message;
};


export type MutationLoginArgs = {
  data: LoginMutationInput;
};


export type MutationSendMessageArgs = {
  data: SendMessageInput;
};

export type Query = {
  __typename?: 'Query';
  getMessage: Message;
  getMessages: Array<Message>;
  getUserChats: Array<Chat>;
  getUserData: User;
};


export type QueryGetMessageArgs = {
  id: Scalars['Float'];
};


export type QueryGetMessagesArgs = {
  chatId: Scalars['Float'];
  sort?: InputMaybe<GetMessagesSort>;
};

export type ReturnAccessToken = {
  __typename?: 'ReturnAccessToken';
  accessToken: Scalars['String'];
};

export type ReturnUserWithAccessToken = {
  __typename?: 'ReturnUserWithAccessToken';
  accessToken: Scalars['String'];
  user: User;
};

export type SendMessageInput = {
  chatId: Scalars['Int'];
  message: Scalars['String'];
};

export enum SortEnum {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  login: Scalars['String'];
};

export type RefreshAuthMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAuthMutation = { __typename?: 'Mutation', refresh: { __typename?: 'ReturnAccessToken', accessToken: string } };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', getUserData: { __typename?: 'User', id: number, email: string, login: string } };

export type GetUserChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatsQuery = { __typename?: 'Query', getUserChats: Array<{ __typename?: 'Chat', id: number, title?: string | null, type: ChatType, messages: Array<{ __typename?: 'Message', message: string, senderId: number, sender: { __typename?: 'User', login: string } }>, chatParticipants: Array<{ __typename?: 'User', login: string }> }> };

export type GetMessagesByChatQueryVariables = Exact<{
  chatId: Scalars['Float'];
}>;


export type GetMessagesByChatQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', message: string, id: number, sender: { __typename?: 'User', login: string } }> };

export type SendMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', chatId: number, id: number, message: string } };

export type LoginMutationVariables = Exact<{
  data: LoginMutationInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ReturnUserWithAccessToken', accessToken: string, user: { __typename?: 'User', id: number, email: string, login: string } } };


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
export const GetUserChatsDocument = gql`
    query getUserChats {
  getUserChats {
    id
    title
    type
    messages(sort: {orderBy: desc, take: 1}) {
      message
      senderId
      sender {
        login
      }
    }
    chatParticipants(withUser: false) {
      login
    }
  }
}
    `;

/**
 * __useGetUserChatsQuery__
 *
 * To run a query within a React component, call `useGetUserChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
      }
export function useGetUserChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
        }
export type GetUserChatsQueryHookResult = ReturnType<typeof useGetUserChatsQuery>;
export type GetUserChatsLazyQueryHookResult = ReturnType<typeof useGetUserChatsLazyQuery>;
export type GetUserChatsQueryResult = Apollo.QueryResult<GetUserChatsQuery, GetUserChatsQueryVariables>;
export const GetMessagesByChatDocument = gql`
    query GetMessagesByChat($chatId: Float!) {
  getMessages(chatId: $chatId, sort: {orderBy: desc}) {
    message
    sender {
      login
    }
    id
  }
}
    `;

/**
 * __useGetMessagesByChatQuery__
 *
 * To run a query within a React component, call `useGetMessagesByChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetMessagesByChatQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByChatQuery, GetMessagesByChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByChatQuery, GetMessagesByChatQueryVariables>(GetMessagesByChatDocument, options);
      }
export function useGetMessagesByChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByChatQuery, GetMessagesByChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByChatQuery, GetMessagesByChatQueryVariables>(GetMessagesByChatDocument, options);
        }
export type GetMessagesByChatQueryHookResult = ReturnType<typeof useGetMessagesByChatQuery>;
export type GetMessagesByChatLazyQueryHookResult = ReturnType<typeof useGetMessagesByChatLazyQuery>;
export type GetMessagesByChatQueryResult = Apollo.QueryResult<GetMessagesByChatQuery, GetMessagesByChatQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($data: SendMessageInput!) {
  sendMessage(data: $data) {
    chatId
    id
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
 *      data: // value for 'data'
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
    mutation login($data: LoginMutationInput!) {
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