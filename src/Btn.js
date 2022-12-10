export default function Btn(props) {
  return (
    <button disp={props.disp} onClick={props.onClick}>
      {props.disp}
    </button>
  );
}
