export default function Header({ selectedOption }) {
  const catagories = selectedOption[0].selectedCategories;
  const question = selectedOption[0].selectedQuestion;
  const difficulty = selectedOption[0].selectedDifficulty;

  console.log(catagories);
  console.log(question);
  console.log(difficulty);

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="userSelected-type">
      <h2>{`${Capitalize(question)} , ${Capitalize(catagories)} , ${Capitalize(
        difficulty
      )} `}</h2>
      <hr />
    </div>
  );
}
