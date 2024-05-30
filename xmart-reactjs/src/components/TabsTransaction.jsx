import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TableMongoTransactions from "./TableMongoTransactions";
import TableRedisTransactions from "./TableRedisTransactions";
import TablePostgresTransactions from "./TablePostgresTransactions";

const TabsTransaction = () => {
    const [value, setValue] = useState(0);  

    const handleChange = (event, newValue) =>{
        setValue(newValue);
    }
    return(
        <>
        <Box sx={{
            width:'100%'
        }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="PostgreSQL" />
                <Tab label="MongoDB" />
                <Tab label="Redis" />
            </Tabs>
            <Box sx={{ padding: 2 }}>
                {value === 0 && <TablePostgresTransactions />}
                {value === 1 && <TableMongoTransactions />}
                {value === 2 && <TableRedisTransactions />}
            </Box>
        </Box>
        </>
    )

}

export default TabsTransaction;