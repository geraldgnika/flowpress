"use client";

import CommentSection from "@/components/comment-section";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) fetchPost(params.id as string);
  }, [params.id]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) return <div className="text-center text-gray-500">Loading post...</div>;

    if (!post)
      return (
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-6">Post not found</h1>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      );

    return (
      <>
        <PostCard post={post} showFullContent />
        <CommentSection postId={post.id} />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900 transition">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-12">{renderContent()}</div>
      </main>
    </div>
  );
}
