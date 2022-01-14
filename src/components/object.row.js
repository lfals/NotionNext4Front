export const objectRow = (items, i) => {
    return(
        <>
            <tr key={i}>
                    <td className="cell-`=Ik"><span className="selected-value select-value-color-pink">{items.client}</span></td>
                    <td className="cell-dAxx"><span className="selected-value select-value-color-green">{items.month}</span></td>
                    <td className="cell-dAxx"><span className="selected-value select-value-color-orange">{items.date}</span></td>
                    <td className="cell-dAxx"><span className="selected-value select-value-color-yellow">{items.type}</span></td>
                    <td className="cell-dAxx"><span className="selected-value select-value-color-purple">{items.exec}</span></td>
                    <td className="cell-title"><span className="selected-value block-color-blue_background">{items.ticket}</span></td>
                    <td className="cell-:|ld">{items.prevision}</td>
                    <td className="cell-B\Xy">{items.hours}</td>
                    <td className="cell-}nXr">{items.description}</td>
                </tr>
        </>
    )
}
