import { useState, useEffect } from "react";

export default function StudioTile(props) {
  const { title, founded } = { ...props.details };

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
            <td>Founded: </td>
            <td>{founded ? founded : "Null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
