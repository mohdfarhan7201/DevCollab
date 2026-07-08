import {
  Heart,
  MessageCircle,
  Trash2,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

export default function PostCard({
  post,
  currentUser,
  onLike,
  onDelete,
  onEdit,
}) {
  const isOwner =
    currentUser?._id === post.author?._id;

  const formatDate = (date) => {
    const now = new Date();
    const created = new Date(date);

    const diff =
      Math.floor(
        (now - created) / 1000
      );

    if (diff < 60)
      return "Just now";

    if (diff < 3600)
      return `${Math.floor(
        diff / 60
      )}m ago`;

    if (diff < 86400)
      return `${Math.floor(
        diff / 3600
      )}h ago`;

    if (diff < 604800)
      return `${Math.floor(
        diff / 86400
      )}d ago`;

    return created.toLocaleDateString();
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}

      <div className="flex items-start justify-between p-5">
        <div className="flex gap-4">
          <img
            src={
              post.author?.avatar ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt={
              post.author?.name
            }
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {post.author?.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              @
              {
                post.author
                  ?.username
              }
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {formatDate(
                post.createdAt
              )}

              {post.isEdited &&
                " • Edited"}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() =>
                onEdit(post)
              }
              className="rounded-lg p-2 hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={() =>
                onDelete(
                  post._id
                )
              }
              className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {!isOwner && (
          <button className="rounded-lg p-2 hover:bg-muted">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Content */}

      <div className="px-5 pb-5">
        <p className="whitespace-pre-wrap leading-7">
          {post.content}
        </p>

        {post.images?.length >
          0 && (
          <div className="mt-5 grid gap-3">
            {post.images.map(
              (
                image,
                index
              ) => (
                <img
                  key={index}
                  src={image}
                  alt="Post"
                  className="max-h-[500px] w-full rounded-xl object-cover"
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Stats */}

      <div className="flex items-center justify-between border-y border-border px-5 py-3 text-sm text-muted-foreground">
        <span>
          ❤️{" "}
          {post.likesCount ||
            0}{" "}
          Likes
        </span>

        <span>
          💬{" "}
          {post.commentsCount ||
            0}{" "}
          Comments
        </span>
      </div>

      {/* Actions */}

      <div className="grid grid-cols-2">
        <button
          onClick={() =>
            onLike(post._id)
          }
          className={`flex items-center justify-center gap-2 py-4 transition hover:bg-muted ${
            post.isLiked
              ? "text-red-500"
              : ""
          }`}
        >
          <Heart
            className={`h-5 w-5 ${
              post.isLiked
                ? "fill-current"
                : ""
            }`}
          />

          Like
        </button>

        <button className="flex items-center justify-center gap-2 py-4 transition hover:bg-muted">
          <MessageCircle className="h-5 w-5" />

          Comment
        </button>
      </div>
    </article>
  );
}