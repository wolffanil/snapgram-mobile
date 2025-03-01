import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../shared/enums/queryKeys";
import { NotificationService } from "../services/notification.service";

import { usePathname } from "expo-router";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useSocket } from "./useSocket";

export const useNotification = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { handleDeleteNotificationSocket, handleSendNewNotificationToSocket } =
    useSocket();
  const { user } = useAuth();

  // get my notifications
  const {
    data: notifications,
    isPending: isLoadingNotifications,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATION],
    queryFn: () => NotificationService.getAll(),
    staleTime: Infinity,
  });

  const { mutate: setIsViewNotificatoins } = useMutation({
    mutationKey: ["set is view"],
    mutationFn: () => NotificationService.setIsView(),
    onMutate: () => {
      const notifications: INotification[] | [] =
        queryClient.getQueryData([QUERY_KEYS.GET_NOTIFICATION]) || [];

      queryClient.setQueryData(
        [QUERY_KEYS.GET_NOTIFICATION],
        (oldN: INotification[]) => {
          const updatedNotifications = oldN.map((n) =>
            n.isView === false
              ? {
                  ...n,
                  isView: true,
                }
              : n
          );

          return updatedNotifications;
        }
      );

      return { notifications };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_NOTIFICATION],
        context?.notifications
      );
    },
  });

  /// create notification
  const { mutate: createNotification } = useMutation({
    mutationKey: ["create notification"],
    mutationFn: (data: ICreateNotificaion) => NotificationService.create(data),
    retry: false,
    onSuccess: (data, variables) => {
      handleSendNewNotificationToSocket({
        //@ts-ignore
        notificaion: { ...data, postId: variables.postId, user: { ...user } },
        to: variables.to,
      });
    },
  });

  /// delete notification
  const { mutate: removeNotification } = useMutation({
    mutationKey: ["delete notificaion"],
    mutationFn: (data: IDeleteNotification) =>
      NotificationService.deleteNotification(data),
    onSuccess: (data, variables) => {
      handleDeleteNotificationSocket({
        to: variables.to,
        postId: variables.postId,
        type: variables.type,
      });
    },
  });

  // give from socket
  const getNewNotification = (notification: INotification) => {
    if (pathname === "/notifications" || pathname === "notifications") {
      let fixNotificaton = { ...notification, isView: true };
      queryClient.setQueryData(
        [QUERY_KEYS.GET_NOTIFICATION],
        (notifications: INotification[]) => [fixNotificaton, ...notifications]
      );
      // setIsViewNotificatoins();
    } else {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_NOTIFICATION],
        (notifications: INotification[]) => [
          { ...notification },
          ...notifications,
        ]
      );
    }
    const existPost = queryClient.getQueryData([
      QUERY_KEYS.GET_POST_BY_ID,
      notification.postId._id,
    ]);

    if (existPost) {
      //@ts-ignore
      queryClient.refetchQueries([
        QUERY_KEYS.GET_POST_BY_ID,
        notification.postId._id,
      ]);
    }
  };

  //give form socket
  //@ts-ignore

  const deleteNotification = (data) => {
    refetch();

    const existPost = queryClient.getQueryData([
      QUERY_KEYS.GET_POST_BY_ID,
      data.postId,
    ]);

    if (existPost) {
      //@ts-ignore
      queryClient.refetchQueries([QUERY_KEYS.GET_POST_BY_ID, data.postId]);
    }
  };

  // clieck to move to notifications
  const needToSetIsView = (isNewNotification?: boolean) => {
    const notifications: INotification[] | [] =
      queryClient.getQueryData([QUERY_KEYS.GET_NOTIFICATION]) || [];

    const isNeed = notifications?.some((n) => n.isView === false);

    if (isNeed || isNewNotification) {
      setIsViewNotificatoins();
    }
  };

  return {
    getNewNotification,
    deleteNotification,
    createNotification,
    removeNotification,
    isLoadingNotifications,
    needToSetIsView,
    notifications,
  };
};
