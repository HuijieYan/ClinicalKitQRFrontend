import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import { getUserName } from "../Functions/UserStatus";

//ContactBook is a table contains some of user's data for contacting user

const ContactBook = () => {
    //rows of data
    const [rows,setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows

    useEffect(()=>{
        GetData.getAllAdmins().then((data)=>{
            const rowsData = [];
            const username = getUserName();
            for (let i = 0;i<data.length;i++){
                const group = data[i];
                if(group[5] !== username){
                    rowsData.push({
                        name:group[0],
                        hospital:group[1],
                        role:group[2],
                        hospitalId:group[3],
                        email:group[4],
                    });
                }
            }
            setRows(rowsData);
        });
    },[]);
    //renders only once for fetching selection options

    const [columns,setColumns] = useState([
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                display: false,
                viewColumns: false
            }
        },

        {
            name: "hospital",
            label: "Hospital",
            options: {
                filterOptions: { fullWidth: true },
            }
        },
        {
            name: "role",
            label: "Role",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "email",
            label: "Email",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "hospitalId",
            label: "hospital Id",
            options: {
                filter: false,
                display: false,
                viewColumns: false,
            }
        },
    ]);

    const options = {
        height: "100%",
        jumpToPage: true,
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <MUIDataTable
                title={"Contact Book"}
                data={rows}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}
 
export default ContactBook;