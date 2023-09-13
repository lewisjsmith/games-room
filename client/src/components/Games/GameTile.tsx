import { useState, useEffect } from "react";

export default function GameTile(props) {
  const { title, studio, genre, releaseDate } = { ...props.details };

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
            <td>{studio ? studio : "Null"}</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1">
          <tr className="flex justify-between">
            <td className="font-bold">Genre: </td>
            <td>{genre ? genre : "Null"}</td>
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
