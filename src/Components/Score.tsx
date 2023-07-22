interface postScore {
  score: number;
  quiz: any;
}

export default function Score({ score, quiz }: postScore) {
  return (
    <h2 className="scoreUI">
      You Scored {score} / {quiz.length}
    </h2>
  );
}
