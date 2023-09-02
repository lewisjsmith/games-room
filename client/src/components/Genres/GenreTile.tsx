export default function GenreTile(props) {

    const { title } = {...props.details};

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title: </td>
                        <td>{title ? title : null}</td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}