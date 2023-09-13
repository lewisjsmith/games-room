import { useState, useEffect } from "react";

export default function GameTile(props) {
  const { title, studio, genre, releaseDate } = { ...props.details };

  return (
    <div>
      <table>
        <thead>
          {/* <tr>
            <td>Title: </td>
            <td>{title ? title : "Null"}</td>
          </tr> */}
          <tr>
            <td className="font-bold">Studio: </td>
            <td>{studio ? studio : "Null"}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-bold">Genre: </td>
            <td>{genre ? genre : "Null"}</td>
          </tr>
          <tr>
            <td className="font-bold">Release Date: </td>
            <td>{releaseDate ? releaseDate.split("T")[0] : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
