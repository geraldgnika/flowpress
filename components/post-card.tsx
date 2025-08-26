"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MarkdownRenderer from "./markdown-renderer";

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

export default function PostCard({ post }: { post: Post }) {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post._count.likes);
    const [likeLoading, setLikeLoading] = useState(true);

    const content = post.content.slice(0, 200) + (post.content.length > 200 ? "..." : "");
    
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={post.author.image || ""} />
                        <AvatarFallback>{post.author.name?.[0] || "A"}</AvatarFallback>
                    </Avatar>
                </div>
                <CardTitle className="text-xl">
                    <Link href={`/posts/${post.id}`} className="hover:underline">
                        {post.title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MarkdownRenderer content={content} />
            </CardContent>
            <CardFooter className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                >
                    <Heart
                        className={`h-4 w-4 ${
                            likeLoading
                                ? "animate-pulse"
                                : liked
                                ? "fill-red-500 text-red-500"
                                : ""
                        }`}
                    />
                    <span>{likeCount}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                >
                    <MessageCircle className="h-4 w-4" />
                    <span>post._count.comments</span>
                </Button>
            </CardFooter>
        </Card>
    );
}