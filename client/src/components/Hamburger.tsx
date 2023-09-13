import burger from "../public/assets/burger.svg";
import close from "../public/assets/closemenu.svg";

export default function Hamburger(props) {

    return (
        <button onClick={() => props.toggleMenu()} className="position: absolute bg-orange-300 top-0 right-0 w-16 h-16 rounded-full mr-3 mt-3 flex justify-center items-center z-20"
        style={!props.menu ? {boxShadow: "0px 4px 4px rgb(0 0 0 / 0.2"} : {}}>
            {!props.menu && (
                <img className="w-4/12" src={burger} alt="" />
            )}
            {props.menu && (
                <img className="w-4/12" src={close} alt="" />
            )}
        </button>
    )
}