import axios from 'axios'
import { useEffect, useState } from 'react';
import { objectRow } from './components/object.row';
import Select from 'react-select';
import { SiNotion } from 'react-icons/si'
import { AiFillQuestionCircle, AiOutlineQuestion, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { Data } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';



const baseOptionsValue = [
  { value: 'month', label: 'Mês' },
  { value: 'client', label: 'Cliente' }
]

function App() {

  const [selectedOption, setSelectedOption] = useState(null);
  
  const [sumHour, setSumHour] = useState(0)
  const [options, setOptions] = useState(baseOptionsValue)
  const [data, setData] = useState([
    {Cliente: '', Mês: '', "": '#', Horas: '', Descriçâo: ''}
  ])


  const setBaseData = () => {
    axios.get('https://notion-next4-lfals.vercel.app/tickets').then(result => {
        setData(result.data)
      })
   
  }

  useEffect(()=>{
    setBaseData()
  },[])

  const getMonths = (data) => {
    const MonthsArray = []
    const monthsOptions = []
    data.forEach(element => {
        MonthsArray.push(element.month)
    });
    const filteredMonthArray = MonthsArray.filter((item, index) => {
        return  MonthsArray.indexOf(item) === index
    })

    filteredMonthArray.forEach(month => {
        monthsOptions.push(
            {value: month, label: month}
            )
    })

    return monthsOptions
  }

  const getCLients = (data) => {

        const clientsArray = []
        const clientsOptions = []
        data.forEach(element => {
            
            clientsArray.push(element.client)
        })

        const filteredClientArray = clientsArray.filter((item, index) => {
            return clientsArray.indexOf(item) === index
        })

        filteredClientArray.forEach(client => {
            clientsOptions.push(
                {value: client, label: client, type: "client"}
            )
        })
        
        return clientsOptions
  }

  const getCompanybyMonth = (data, month) => {
      const companyArray = []
      let sumHour = 0.0
      data.forEach(element => {
          if (element.month === month) {
              const fixHour = parseFloat(element.hours.replace("h", '').replace(",","."))
              sumHour+=fixHour
              setSumHour(sumHour);
              companyArray.push(element)
          }
      })

      return companyArray
  }

  const getClientOption = (data, client) => {
      const companyArray = []
      data.forEach(element => {
        if (element.client === client) {
            companyArray.push(element)
        }
      })
  
      return companyArray
    }


  const handleChange = (content, event) => {
    if (event.action === "select-option") {
        if (content[0].value === "month") {
            setSelectedOption(content);
            const monthsOptions = getMonths(data)
            setOptions(monthsOptions)

           if (content[1]) {
               const filteredData = getCompanybyMonth(data, content[1].value)
               setData(filteredData)
           }
        }

        if (content[0].value === "client") {
            setSelectedOption(content);
            const clientsOption = getCLients(data)
            setOptions(clientsOption)

            if (content[1]) {
                const filteredData = getClientOption(data, content[1].value)
                setData(filteredData)
                const filteredMonths = getMonths(filteredData)
                setOptions(filteredMonths)

                if (content[2]) {
                    const filteredData = getCompanybyMonth(data, content[2].value)
                    setData(filteredData)
                    console.log(selectedOption);

                }
            }
        }
        
    }

    if (event.action === "clear") {
        setBaseData()
        setOptions(baseOptionsValue)
        setSelectedOption(content);
        setSumHour(0);
    }


  }


  return (
    <>

<div className='navbar sans'>

<a className='how'>
        Como usar <BsFillQuestionCircleFill/>
    </a>

    <a href="https://www.notion.so/32973b3d397c4f1292da0f641908283a?v=26d0ae7fd930488db76ff7a56de7a5dc" target="_blank" rel="noreferrer" className='no-print'>
        <SiNotion />
        Abrir no Notion
    </a>
    
</div>
    <article id="f0057d27-2408-477e-b446-21facb209a4a" className="page sans">
          
    <header>
          
        <h1 className="page-title">Suporte Next4</h1>

        <div className="search-field no-print">
        <Select
        placeholder="Selecione o tipo de busca"
        value={selectedOption} // set selected value
        options={options} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti

      />


            <button onClick={() => {window.print()}}>Exportar</button>
           
        </div>
            <h1 className="page-subtitle">{sumHour ? `Somatória das horas = ${sumHour}h` : ""}</h1>
      
    </header>
    <div className="page-body">
        <table className="collection-content">
            <thead>
                <tr>
                    <th onClick={() => {}}>Cliente</th>
                    <th>Mês</th>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Exec</th>
                    <th>Ticket</th>
                    <th>Previsão</th>
                    <th>horas</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {data.map((ticket, i) => objectRow(ticket, i))}
            </tbody>
        </table>
    </div>
</article>
</>
  );
}

export default App;
