"use client";

import { useState } from "react";
import Image from "next/image"; // Image component from Next.js
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  /**
   * Checks if the `post.tag` starts with a '#' character. If it does, assigns `post.tag` to the `tagText` variable. 
   * Otherwise, concatenates '#' with `post.tag` and assigns the result to `tagText`.
   */
  const tagText = post.tag.startsWith('#') ? post.tag : `#${post.tag}`;
  
  /**
   * Handles the click event on the profile section of a prompt card.
   * If the logged-in user is the creator of the post, it redirects to their profile page.
   * Otherwise, it redirects to the profile page of the post creator.
   *
   * @example
   * handleProfileClick();
   *
   * @returns {void}
   */
  const handleProfileClick = () => {
      // Log the `post` object to the console.
      console.log(post);

      // Check if the `post.creator._id` is equal to the `session?.user.id`.
      if (post.creator._id === session?.user.id) return router.push("/profile");

      // If the condition is false, redirect to the "/profile/{post.creator._id}?name={post.creator.username}" page.
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  /**
   * Handles the copying of the prompt text to the clipboard.
   * 
   * @example
   * handleCopy();
   * 
   * @returns {void} None.
   */
  const handleCopy = () => {
    // Set the copied state variable to the value of post.prompt
    setCopied(post.prompt);

    // Use the navigator.clipboard.writeText() method to write the post.prompt to the clipboard
    navigator.clipboard.writeText(post.prompt);

    // Set a timeout of 3000 milliseconds to reset the copied state variable to false
    setTimeout(() => setCopied(false), 3000);
  };

  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const promptText = showFullPrompt ? post.prompt : post.prompt.slice(0, 300);

  const handleShowMore = () => {
    setShowFullPrompt(!showFullPrompt);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{promptText}</p>
      {post.prompt.length > 300 && (
        <button
        onClick={handleShowMore}
        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md'
      >
        {showFullPrompt ? 'See Less' : 'See More'}
      </button>
      )}
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {tagText}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
