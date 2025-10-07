"use client";

import { addAnswer } from "@/lib/actions";

type SubmitAnswerProps = {
  questionId: string;
};

export function SubmitAnswer({ questionId }: SubmitAnswerProps) {
  return (
    <form className="relative my-8" action={addAnswer}>
      <input
        type="hidden"
        name="question_id"
        value={questionId}
        className="hidden"
      />
      <textarea
        name="answer"
        placeholder="Write your answer..."
        rows={4}
        className="mt-1 block w-full rounded-md border border-atlas-white-300 bg-inherit py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-3 focus:ring-atlas-teal"
        required
        defaultValue=""
      />
      <button
        type="submit"
        className="absolute right-2 bottom-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white hover:cursor-pointer hover:bg-gray-300 focus:bg-secondary"
      >
        Submit
      </button>
    </form>
  );
}
