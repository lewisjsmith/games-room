import { useState, useEffect } from "react";

export default function GameInstanceTile(props) {
  const { game, status, due_back } = { ...props.details };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Game: </td>
            <td>{game ? game : "Null"}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Status: </td>
            <td>{status ? status : "Null"}</td>
          </tr>
          <tr>
            <td>Due: </td>
            <td>{due_back ? due_back : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
