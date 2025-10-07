"use server";

import { incrementVotes } from "./data";
import { insertQuestion } from "./data";
import { revalidatePath } from "next/cache";
import { insertTopic } from "./data";
import { redirect } from "next/navigation";
import { insertAnswer } from "./data";
import { updateQuestionAnswerId } from "./data";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addAnswer(data: FormData) {
  try {
    const answer = data.get("answer") as string;
    const questionId = data.get("question_id") as string;

    if (!answer || !questionId) {
      throw new Error("Answer and question ID are required.");
    }

    await insertAnswer({
      answer,
      question_id: questionId,
    });

    revalidatePath(`/ui/questions/${questionId}`, "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add answer.");
  }
}

export async function markAsAccepted(data: FormData) {
  try {
    const answerId = data.get("answerId") as string;
    const questionId = data.get("questionId") as string;

    if (!answerId || !questionId) {
      throw new Error("Answer ID and question ID are required.");
    }

    await updateQuestionAnswerId(questionId, answerId);

    revalidatePath(`/ui/questions/${questionId}`, "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to mark answer as accepted.");
  }
}
