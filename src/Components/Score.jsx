export default function Score({ score, quiz }) {
  return (
    <h2 className="scoreUI">
      You Scored {score} / {quiz.length}
    </h2>
  );
}
