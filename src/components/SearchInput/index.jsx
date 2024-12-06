import { CiSearch } from "react-icons/ci"
import './styles.scss'

export default function SearchInput() {
    return (
    <div className="search-input">
        <input type="text" placeholder="Buscar..." />
        <button type="button" ><CiSearch size={20} /></button>
    </div>
    )
}