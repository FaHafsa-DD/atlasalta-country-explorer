export default function Button({ children, ...props }) {
    return (
        <button className="border-2 border-primary text-primary p-2 rounded w-md cursor-pointer focus:text-white focus:bg-primary" {...props}>{children}</button>
    )
}
