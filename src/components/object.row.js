import { TableCell, TableRow } from "@mui/material"

export const objectRow = (items, i) => {
    return(
        <>
            <TableRow key={i}>
                    <TableCell className="cell-`=Ik"><span className="selected-value select-value-color-pink">{items.client}</span></TableCell>
                    <TableCell className="cell-dAxx"><span className="selected-value select-value-color-green">{items.month}</span></TableCell>
                    <TableCell className="cell-dAxx"><span className="selected-value select-value-color-orange">{items.date}</span></TableCell>
                    <TableCell className="cell-dAxx"><span className="selected-value select-value-color-yellow">{items.type}</span></TableCell>
                    <TableCell className="cell-dAxx"><span className="selected-value select-value-color-purple">{items.exec}</span></TableCell>
                    <TableCell className="cell-title"><span className="selected-value block-color-blue_background">{items.ticket}</span></TableCell>
                    <TableCell className="cell-:|ld">{items.prevision}</TableCell>
                    <TableCell className="cell-B\Xy">{items.hours}</TableCell>
                    <TableCell className="cell-}nXr">{items.description}</TableCell>
                </TableRow>
        </>
    )
}
