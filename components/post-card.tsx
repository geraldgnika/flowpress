"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MarkdownRenderer from "./markdown-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

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

export default function PostCard({ post, showFullContent = false }: { post: Post; showFullContent?: boolean }) {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post._count.likes);
    const [likeLoading, setLikeLoading] = useState(true);

    const content = showFullContent
        ? post.content
        : post.content.slice(0, 200) + (post.content.length > 200 ? "..." : "");

    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!session?.user?.id) {
                setLikeLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/posts/${post.id}/like-status`);
                if (response.ok) {
                    const data = await response.json();
                    setLiked(data.liked);
                }
            } catch (error) {
                console.error("Failed to fetch like status:", error);
            } finally {
                setLikeLoading(false);
            }
        };

        fetchLikeStatus();
    }, [post.id, session?.user?.id]);

    const handleLike = async () => {
        if (!session) return;

        try {
            const response = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
            const data = await response.json();

            setLiked(data.liked);
            setLikeCount(prev => (data.liked ? prev + 1 : prev - 1));
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };
    
    return (
        <Card className="transition-transform hover:-translate-y-1 hover:shadow-lg border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex items-center space-x-4 pb-2">
                <Avatar className="ring-1 ring-gray-200">
                    <AvatarImage src={post.author.image || ""} />
                    <AvatarFallback>{post.author.name?.[0] || "A"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {showFullContent ? (
                            post.title
                        ) : (
                            <Link href={`/posts/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        )}
                    </CardTitle>
                    {post.author.name && (
                        <span className="text-sm text-gray-500">by {post.author.name}</span>
                    )}
                    <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </CardHeader>

            <CardContent className="text-gray-700 prose prose-sm max-w-full">
                <MarkdownRenderer content={content} />
            </CardContent>

            <CardFooter className="flex items-center space-x-4 pt-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition-colors"
                    onClick={handleLike}
                    disabled={!session}
                >
                    <Heart
                        className={`h-4 w-4 ${likeLoading ? "animate-pulse" : liked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span>{likeCount}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 cursor-default"
                >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post._count.comments}</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
