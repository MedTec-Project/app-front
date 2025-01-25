export default function FilterSection({ title, options, category, onChange }) {
    return (
        <div className="medications-filter">
            <div className="medications-filter-title">
                <h1>{title}</h1>
            </div>
            <div className="medications-filter-checkboxs">
                {options.map(option => (
                    <div key={option.id} className={`medications-filter-checkbox ${option.checked ? "checked" : ""}`}>
                        <input
                            type="checkbox"
                            id={option.id}
                            checked={option.checked}
                            onChange={() => onChange(category, option.id)}
                        />
                        <label htmlFor={option.id}>{option.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
