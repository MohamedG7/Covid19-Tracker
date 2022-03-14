import React from 'react'
import { TableTab } from '../Styles/styledComps'
import numeral from "numeral";

const Table = ({ countries }) => {
    return (
        <TableTab>
            {countries.map(({ country, cases }) => (
                <tr>
                  <td>{country}</td>
                  <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </TableTab>
    )
}

export default Table
