export default function GenreTile(props) {
    const { title } = { ...props.details };

    return (
        <div className="w-full">
            <table className="flex flex-col gap-1">
                <thead>
                    <tr className="flex justify-center gap-5">
                        <td className="font-bold">Title: </td>
                        <td>{title ? title : "Null"}</td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}