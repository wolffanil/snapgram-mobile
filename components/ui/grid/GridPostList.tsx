import React from "react";
import PostCard from "./cards/PostCard";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";

interface IGridPost {
  posts: IPost[];
  showUser?: boolean;
  showStats?: boolean;
  show?: "Home" | "Explore";
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

function GridPostList({
  posts,
  showStats,
  showUser,
  show,
  isLoading,
  hasNextPage,
  refresh,
  fetchNextPage,
}: IGridPost) {
  return (
    <React.Fragment key={posts.length}>
      {show === "Home" ? (
        <FlashList
          data={posts}
          keyExtractor={(item) => item._id}
          estimatedItemSize={343}
          renderItem={({ item }) => <PostCard key={item._id} post={item} />}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          onEndReached={fetchNextPage}
        />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

// {show === "Home"
//     ? posts.map((post) => <PostCard post={post} key={post.caption} />)
//     : posts.map((post, index) => (
//         <PostCardV2
//           post={post}
//           showUser={showUser}
//           showStats={showStats}
//           key={index}
//         />
//       ))}

export default GridPostList;
