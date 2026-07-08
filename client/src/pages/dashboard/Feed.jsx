import CreatePostCard from "../../components/feed/CreatePostCard";
import PostCard from "../../components/feed/PostCard";

import usePosts from "../../hooks/usePosts";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function Feed() {
    const {
        posts,
        loading,
        createPost,
        deletePost,
        toggleLike,
    } = usePosts();

    const { data: user } = useCurrentUser();

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {/* Create Post */}
            <CreatePostCard onCreate={createPost} />

            {/* Loading */}
            {loading && posts.length === 0 && (
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                    Loading feed...
                </div>
            )}

            {/* Empty */}
            {!loading && posts.length === 0 && (
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                    <h2 className="text-xl font-semibold">No posts yet</h2>
                    <p className="mt-2 text-muted-foreground">
                        Be the first developer to share something.
                    </p>
                </div>
            )}

            {/* Feed */}
            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    currentUser={user}
                    onLike={toggleLike}
                    onDelete={deletePost}
                    onEdit={() => { }}
                />
            ))}
        </div>
    );
}