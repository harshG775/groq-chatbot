export default function Input({ setValue, handleQuery, ...props }) {
    return (
        <form
            className="flex-1 flex items-center"
            onSubmit={(e) => {
                e.preventDefault();
                handleQuery();
            }}
        >
            <input
                {...props}
                onChange={(e) => setValue(e.target.value)}
                className="
                px-2 h-10 w-full 
                focus:outline focus:outline-2 focus:outline-input rounded-md
            "
                type="text"
                placeholder="Type here..."
                rows={1}
            />
        </form>
    );
}
