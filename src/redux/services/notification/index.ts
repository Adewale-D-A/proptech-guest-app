/** @format */

import { NotificationsResponse } from "@/types/type";
import { injectEndpoints } from "../base/base";
import { Endpoints, Methods } from "../base/service";

const notificationsEndpoints = injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
      { start_date?: string; end_date?: string; search?: string }
    >({
      query: ({ start_date, end_date, search }) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (search) params.append("search", search);

        return {
          method: Methods.get,
          url: `${Endpoints.api}user/notification?${params.toString()}`,
        };
      },
    }),
    readNotification: builder.mutation<void, string>({
      query: (notificationId) => ({
        method: Methods.put,
        url: `${Endpoints.api}user/notification/${notificationId}`,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationsEndpoints;
