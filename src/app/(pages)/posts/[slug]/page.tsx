// Import necessary modules
'use client'

import { useEffect, useState } from 'react';
import { Config } from '@/pl-types';

const PostPage = () => {

    let slug = 'bugbug'
    const [post, setPost] = useState<Config['collections']['posts'] | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/posts/${slug}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch post');
                }
                const postData = await res.json();
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Post Details</h1>
            <div>
                <p>ID: {post.id}</p>
                <p>Date: {post.updatedAt}</p>
                <p>Slug: {post.slug}</p>
            </div>
        </div>
    );
};

export default PostPage;
