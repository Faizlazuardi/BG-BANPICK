export default function DropdownSelector({ id, label, options, selectedOption, setSelectedOption }) {
    return (
        <select
            id={id}
            aria-label={label}
            className="p-2 border-2 w-35 h-11 text-center hover:cursor-pointer"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
        >
            {options.map(({ id, option, value }) => (
                <option key={id} value={value}>
                    {option}
                </option>
            ))}
        </select>
    );
}