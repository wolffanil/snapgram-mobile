import { useGetSubscribers } from "./useGetSubscribers";
import { useGetSubscriptions } from "./useGetSubscriptions";
import SkeletonSubscribe from "./SkeletonSubscribe";
import StatBlock from "../StackBlock";
import { Fragment, useRef } from "react";
import { BottomSheetModalRef } from "@/components/ui/bottomSheet/BottomSheetModal";
import BottomSheetSub from "./buttonSheets/BottomSheetSub";
import { Pressable } from "react-native";

function Subscribers() {
  const { subscribers, isLoadingSubscribers } = useGetSubscribers();

  const { subscriptions, isLoadingSubscriptions } = useGetSubscriptions();

  const bottomSheetRefSubscribers = useRef<BottomSheetModalRef>(null);

  const handlePresentModalPressSubscribers = () =>
    bottomSheetRefSubscribers.current?.present();

  const bottomSheetRefSubscriptions = useRef<BottomSheetModalRef>(null);

  const handlePresentModalPressSubscriptions = () =>
    bottomSheetRefSubscriptions.current?.present();

  const subscribersCount =
    subscribers && subscribers.length > 0
      ? subscribers?.length > 99
        ? "999+"
        : subscribers?.length
      : "0";

  const subscriptionsCount =
    subscriptions && subscriptions.length > 0
      ? subscriptions?.length > 99
        ? "999+"
        : subscriptions?.length
      : "0";

  return (
    <Fragment>
      {isLoadingSubscribers ? (
        <SkeletonSubscribe />
      ) : (
        <Fragment>
          <Pressable onPress={handlePresentModalPressSubscribers}>
            <StatBlock value={subscribersCount} label="Подписчики" />
          </Pressable>
          <BottomSheetSub
            ref={bottomSheetRefSubscribers}
            users={subscribers?.map((sub) => sub.subscriberId)}
            key="subscribers"
            type="subscribers"
          />
        </Fragment>
      )}

      {isLoadingSubscriptions ? (
        <SkeletonSubscribe />
      ) : (
        <Fragment>
          <Pressable onPress={handlePresentModalPressSubscriptions}>
            <StatBlock value={subscriptionsCount} label="Подписки" />
          </Pressable>
          <BottomSheetSub
            ref={bottomSheetRefSubscriptions}
            users={subscriptions?.map((sub) => sub.userId)}
            key="subscriptions"
            type="subscriptions"
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Subscribers;
