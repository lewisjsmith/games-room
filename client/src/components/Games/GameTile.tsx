import { useState, useEffect } from "react";

export default function GameTile(props) {
  const { title, studio, genre, releaseDate } = { ...props.details };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Title: </td>
            <td>{title ? title : "Null"}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Studio: </td>
            <td>{studio ? studio : "Null"}</td>
          </tr>
          <tr>
            <td>Genre: </td>
            <td>{genre ? genre : "Null"}</td>
          </tr>
          <tr>
            <td>Release Date: </td>
            <td>{releaseDate ? releaseDate : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
