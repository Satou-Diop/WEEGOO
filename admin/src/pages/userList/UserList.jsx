import "./userList.css";
import { DataGrid  } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"
export default function UserList() {
  const [result, setResult] = useState([]);
 useEffect(() => {
var config = {
  method: 'get',
  url: 'http://localhost:8000/user?isConducteur='+true,
  headers: { },
};

axios(config)
.then(function (response) {
  setResult(response.data);
})
.catch(function (error) {
  console.log(error);
});
  },[])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "nom",
      headerName: "Conducteur",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={Path+params.row.photo} alt="" />
            {params.row.prenom}  {params.row.nom} 
          </div>
        );
      },
    },
    { field: "login", headerName: "Email", width: 250 },
    
    {
      field: "telephone",
      headerName: "Numero de telephone",
      width: 230,
    },
    {
      field: "isVerified",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <>
          {params.row.isVerified == null? (<>
            <Button type="Pending" />
          </>):(<>
            
          </>)
          }
          {params.row.isVerified ? (<>
            <Button type="Accepted" />
          </>):(<>
          </>)
          }
          {params.row.isVerified==false ? (<>
            <Button type="Declined" />
          </>):(<>
          </>)
          }
          </>
        );
      },
    },
    {
      field: "voir",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}>
              <button className="userListEdit">Voir documents</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              // onClick={() => handleDelete(params.row.id)
              // }
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={result}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
