"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // hook that allows us to know which user is currently logged in 
import { useRouter } from "next/navigation";

import Form from "@components/Form";

/**
 * Renders a React component called `CreatePrompt` that is responsible for creating a new prompt.
 * 
 * @returns {JSX.Element} The rendered `CreatePrompt` component.
 */
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession(); // fire up the hook

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  /**
   * Handles form submission by preventing default behavior, sending a POST request to the `/api/prompt/new` endpoint,
   * and navigating to the home page if the response is successful.
   * 
   * @param {Event} e - The form submission event.
   */
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
