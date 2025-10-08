import { fetchQuestions } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questions = await fetchQuestions(id);

    const questionsJson = questions.map((question) => ({
      id: question.id,
      title: question.title,
      topic_id: question.topic_id,
      votes: question.votes,
    }));

    return NextResponse.json(questionsJson);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
