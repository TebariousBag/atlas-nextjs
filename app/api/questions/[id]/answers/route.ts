import { fetchAnswers } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const answers = await fetchAnswers(id);

    const answersJson = answers.map((answer) => ({
      id: answer.id,
      answer: answer.answer,
      question_id: answer.question_id,
    }));

    return NextResponse.json(answersJson);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
