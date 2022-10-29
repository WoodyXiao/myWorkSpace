import React from 'react'
import Day from "../Day/Day";

import Grid from "@mui/material/Unstable_Grid2";
import {Box} from "@mui/material";

const Month = ({month}) => {
    return (
        <Box>
            <Grid container direction={"row"} spacing={1} sx={{
                margin: '15px',
                width: '1650px',
            }}>
                {
                    month.map((row, i) => (
                        <Grid container  key={i}>
                            {
                                row.map((day, index) => (
                                    <Grid lg={12 / 7} key={index}>
                                        <Day day={day} key={index} rowIdx={i}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
export default Month