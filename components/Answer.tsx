"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { markAsAccepted } from "@/lib/actions";

type AnswerProps = {
  id: string;
  text: string;
  isAccepted: boolean;
  questionId: string;
};

export function Answer({ id, text, isAccepted, questionId }: AnswerProps) {
  return (
    <div
      className={`flex items-start border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b ${
        isAccepted ? "bg-green-50" : ""
      }`}
    >
      <div className="flex-1">
        <p className="text-gray-900">{text}</p>
      </div>
      <form action={markAsAccepted}>
        <input type="hidden" name="answerId" value={id} />
        <input type="hidden" name="questionId" value={questionId} />
        <button
          type="submit"
          className={`ml-4 flex h-8 w-8 items-center justify-center rounded-md border ${
            isAccepted
              ? "bg-green-500 border-green-600 text-white"
              : "border-gray-300 text-gray-400 hover:bg-gray-50 hover:text-green-500"
          }`}
        >
          <CheckIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
