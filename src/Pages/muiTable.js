import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EquipmentTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");

    const columns = [
        { name: "hidden col",
            options: {
                filterOptions: { fullWidth: true },
                display: false,
                viewColumns: false
            }
        },
        "Equipment Name",
        "Equipment ID",
        "QR Code",
    ];

    const options = {
        filterType: "multiselect",
        tableBodyHeight,
        jumpToPage: true,
    };

    const data = [
        ["Gabby George", "Business Analyst", "Minneapolis", 1],
        ["Aiden Lloyd", "Business Consultant", "Dallas", 2],
        ["Jaden Collins", "Attorney", "Santa Ana", 3],
        ["Franky Rees", "Business Analyst", "St. Petersburg", 4],
        ["Aaren Rose", null, "Toledo", 5],
        ["Johnny Jones", "Business Analyst", "St. Petersburg", 6],
        ["Jimmy Johns", "Business Analyst", "Baltimore", 7],
        ["Jack Jackson", "Business Analyst", "El Paso", 8],
        ["Joe Jones", "Computer Programmer", "El Paso", 9],
        ["Jacky Jackson", "Business Consultant", "Baltimore", 10],
        ["Jo Jo", "Software Developer", "Washington DC", 11],
        ["Donna Marie", "Business Manager", "Annapolis", 12],
        ["Jaden Collins", "Attorney", "Santa Ana", 13],
        ["Franky Rees", "Business Analyst", "St. Petersburg", 14],
        ["Aaren Rose", null, "Toledo", 15],
        ["Johnny Jones", "Business Analyst", "St. Petersburg", 16],
        ["Jimmy Johns", "Business Analyst", "Baltimore", 17],
        ["Jack Jackson", "Business Analyst", "El Paso", 18],
        ["Joe Jones", "Computer Programmer", "El Paso", 19],
        ["Jacky Jackson", "Business Consultant", "Baltimore", 20],
        ["Jo Jo", "Software Developer", "Washington DC", 21],
        ["Donna Marie", "Business Manager", "Annapolis", 22],
        ["Jaden Collins", "Attorney", "Santa Ana", 23],
        ["Franky Rees", "Business Analyst", "St. Petersburg", 24],
        ["Aaren Rose", null, "Toledo", 25],
        ["Johnny Jones", "Business Analyst", "St. Petersburg", 26],
        ["Jimmy Johns", "Business Analyst", "Baltimore", 27],
        ["Jack Jackson", "Business Analyst", "El Paso", 28],
        ["Joe Jones", "Computer Programmer", "El Paso", 29],
        ["Jacky Jackson", "Business Consultant", "Baltimore", 30],
        ["Jo Jo", "Software Developer", "Washington DC", 31],
        ["Donna Marie", "Business Manager", "Annapolis", 32]
    ];

    return (
        <ThemeProvider theme={createTheme()}>
            <FormControl style={{marginTop: '1%'}}>
                <InputLabel id="selectHeight">Table Body Height</InputLabel>
                <Select
                    labelId="selectHeight"
                    value={tableBodyHeight}
                    style={{ width: "100%", marginBottom: "10px", marginRight: 10 }}
                    onChange={(e) => setTableBodyHeight(e.target.value)}
                >
                    <MenuItem value={""}>[blank]</MenuItem>
                    <MenuItem value={"400px"}>400px</MenuItem>
                    <MenuItem value={"800px"}>800px</MenuItem>
                    <MenuItem value={"100%"}>100%</MenuItem>
                </Select>
            </FormControl>
            <MUIDataTable
                title={"Equipments"}
                data={data}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}

export default EquipmentTable;
