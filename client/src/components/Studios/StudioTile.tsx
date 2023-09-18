export default function StudioTile(props: tileProps) {

  const { title, founded } = props ? { ...props.details } : { title: null, founded: null };

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

interface detailsStructure {
  _id: string,
  title: string,
  founded: string
}

interface tileProps {
  details: detailsStructure | undefined
}