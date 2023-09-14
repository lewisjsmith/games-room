import { Link } from "react-router-dom";

export default function GameTile(props) {
  const { title, studio, studioTitle, genre, genreTitle, releaseDate } = { ...props.details };

  return (
    <div className="w-full">
      <table className="flex flex-col gap-1">
        <thead>
          {/* <tr>
            <td>Title: </td>
            <td>{title ? title : "Null"}</td>
          </tr> */}
          <tr className="flex justify-between gap-1">
            <td className="font-bold">Studio: </td>
            <td>{studioTitle && studio ? <Link to={`/studio/${studio}`}>{studioTitle}</Link> : "Null"}</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          <tr className="flex justify-between">
            <td className="font-bold">Genre: </td>
            <td>{genreTitle && genre ? <Link to={`/genre/${genre}`}>{genreTitle}</Link> : "Null"}</td>
          </tr>
          <tr className="flex justify-between">
            <td className="font-bold">Release: </td>
            <td>{releaseDate ? releaseDate.split("T")[0] : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
