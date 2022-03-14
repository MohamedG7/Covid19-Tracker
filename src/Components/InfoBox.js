import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Cases } from '../Styles/styledComps';
import '../Styles/infobox.css'


const InfoBox = ( { title, cases, total, active, isRed, ...props  } ) => {
    return (
        <div className = "infoBox">
            <Card
             onClick={props.onClick}
             className={`infoBox ${active && "infoBox--selected"} ${
               isRed && "infoBox--red"
             }`}
            >
               <CardContent>
                  <Typography color= "textSecondary" gutterBottom>{title}</Typography>
                  <Cases className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</Cases>
                  <Typography className="infoBox__total" color= "textSecondary">{total} Total</Typography>
               </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
