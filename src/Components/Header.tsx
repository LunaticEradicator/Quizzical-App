// type sike ={
//   selectedOption: object[];
// }
type selectedOptionsType = {
  selectedQuestion: number;
  selectedCategories: string;
  selectedDifficulty: string;
};
export default function Header({ userSelection }: selectedOptionsType) {
  const catagories = userSelection[0].selectedCategories;
  const question = userSelection[0].selectedQuestion;
  const difficulty = userSelection[0].selectedDifficulty;

  // console.log(catagories);
  // console.log(question);
  // console.log(difficulty);

  function Capitalize(str: string): string {
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
