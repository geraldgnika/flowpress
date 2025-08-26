"use client";

import AuthButton from "@/components/auth-button";
import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { Lora } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const lora = Lora({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal'],
});

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

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const isCurrrentAuthenticatedUser = session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`${lora.className} tracking-[0.6px] font-bold text-[24.3px] text-[#313236]`}
          >
            Flowpress
          </Link>
          <div className="flex items-center space-x-4">
            {isCurrrentAuthenticatedUser && (
              <Button asChild>
                <Link href="/admin/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Post
                </Link>
              </Button>
            )}
            <AuthButton />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to <span className={`${lora.className} tracking-[0.6px] font-bold text-inherit text-[#313236]`}>Flowpress</span></h1>
            <p className="text-muted-foreground">
              A place where knowledge flows, ideas grow, and insights connect.
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No posts yet. {isCurrrentAuthenticatedUser && "Create your first post!"}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
