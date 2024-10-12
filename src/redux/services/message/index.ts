/** @format */

import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const messageEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<ChatApiResponse, any>({
      query: () => ({
        method: Methods.get,
        url: `${Endpoints.api}user/chat`,
      }),
    }),
    sendMessage: builder.mutation<any, { message: string }>({
      query: (newMessage) => ({
        method: Methods.post,
        url: `${Endpoints.api}user/chat/send`,
        body: newMessage,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageEndpoints;
