interface postMenu {
  goMenuScreen: () => void;
}
export default function Menu({ goMenuScreen }: postMenu) {
  return (
    <div onClick={goMenuScreen} className="menu">
      Menu
    </div>
  );
}
