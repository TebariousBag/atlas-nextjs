import { SubmitAnswer } from "@/components/SubmitAnswer";
import { Answer } from "@/components/Answer";
import { fetchQuestion, fetchAnswers } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // fetch the question from db
  const question = await fetchQuestion(id);

  if (!question) {
    return <div className="text-xl">Question not found</div>;
  }

  // fetch the answer from db
  const answers = await fetchAnswers(id);

  // sorting the answers, so the correct one is at top
  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.id === question.answer_id) return -1;
    if (b.id === question.answer_id) return 1;
    return 0;
  });

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">{question.title}</h1>

      <SubmitAnswer questionId={id} />

      <div className="mt-8">
        {sortedAnswers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            text={answer.answer}
            isAccepted={answer.id === question.answer_id}
            questionId={id}
          />
        ))}
      </div>
    </div>
  );
}
