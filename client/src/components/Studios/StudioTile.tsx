export default function StudioTile(props) {
  const { title, founded } = { ...props.details };

  return (
    <div className="w-full">
      <table className="flex flex-col gap-1">
        <thead>
          <tr className="flex justify-between gap-1">
            <td className="font-bold">Title: </td>
            <td>{title ? title : "Null"}</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          <tr className="flex justify-between">
            <td className="font-bold">Founded: </td>
            <td>{founded ? founded.split("T")[0] : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
