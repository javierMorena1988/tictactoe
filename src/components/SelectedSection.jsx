import { Square } from "./square"
import { TURNS } from "../const/const"

export function SelectedSection({turn}) {
    return (
    <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
    )
}