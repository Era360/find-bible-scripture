import css from "./ellipsis.module.css";

function Ellipsis() {
  return (
    <div className={css.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Ellipsis;
