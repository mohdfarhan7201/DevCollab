import { useState } from "react";
import { Image, Send } from "lucide-react";

export default function CreatePostCard({
  onCreate,
}) {
  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      if (!content.trim())
        return;

      try {
        setLoading(true);

        await onCreate({
          content,
        });

        setContent("");
      } catch (error) {
        console.log(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex gap-4">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="User"
          className="h-12 w-12 rounded-full object-cover"
        />

        <textarea
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={4}
          placeholder="Share something with the DevCollab community..."
          className="min-h-[120px] flex-1 resize-none rounded-xl border border-border bg-background p-4 outline-none focus:border-primary"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 hover:bg-muted"
        >
          <Image className="h-5 w-5" />
          Image
        </button>

        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            !content.trim()
          }
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />

          {loading
            ? "Posting..."
            : "Post"}
        </button>
      </div>
    </div>
  );
}
