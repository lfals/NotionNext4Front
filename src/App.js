import axios from 'axios'
import { useEffect, useState } from 'react';
import { objectRow } from './components/object.row';
import Select from 'react-select';
import { SiNotion } from 'react-icons/si'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


function App() {

  const [selectedClientOption, setSelectedClientOption] = useState(null);
  const [selectedYearOption, setSelectedYearOption] = useState(null);
  
  const [sumHour, setSumHour] = useState(0)

  const [clientsSelectOption, setClientsOption] = useState({})
  const [monthsSelectOptions, setMonthsOptions] = useState({})
  const [yearOptions, setYearOptions] = useState({})

  const [initialData, setInitialData] = useState([])
  const [filteredData, setFilteredData] = useState([])
const [clientData, setClientData] = useState([])


  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState([])


  const setBaseData = () => {

    axios.get('https://notion-next4-lfals.vercel.app/tickets').then(result => {


        setInitialData(result.data)
        getYear(result.data)
        getMonths(result.data)

      })
      return true
  }

  useEffect(()=>{
    setBaseData()
  },[])

  const filterByYear =  (clientYear, data) => {
    const filteredClients = []
    let defaultValue = 0.0
    data.forEach(element => {
       
          const clientData = new Date(element.date).getFullYear()
            if (clientData === clientYear) {
                const fixHour = parseFloat(element.hours.replace('', 0).replace("h", '').replace(",","."))
                defaultValue+=fixHour
                console.log("defaiuot", defaultValue);
                filteredClients.push(element)
            }
    })

        setSumHour(defaultValue);
        setData(filteredClients)
  }

  const getYear = (data) => {
    const dateArray = []
    const filteredYearOptions = []
    data.forEach(element => {
        const year = new Date(element.date).getFullYear()
        dateArray.push(year)
    })
    const filteredDateArray = dateArray.filter((item, index) => {
        return  dateArray.indexOf(item) === index
    })

    filteredDateArray.forEach(year => {
        filteredYearOptions.push(
            {value: year, label: year}
        )
    })
    console.log("Date Array", filteredDateArray);

    setYearOptions(filteredYearOptions)
    filterByYear(year,data)
      
  }


  const getMonths = (data) => {
    const MonthsArray = []
    const filteredMonthsOptions = []
    data.forEach(element => {
        MonthsArray.push(element.month)
    });
    const filteredMonthArray = MonthsArray.filter((item, index) => {
        return  MonthsArray.indexOf(item) === index
    })

    filteredMonthArray.forEach(month => {
        filteredMonthsOptions.push(
            {value: month, label: month}
            )
    })

    setMonthsOptions(filteredMonthsOptions)
  } 

  const getCLients = (data) => {

        const clientsArray = []
        const filteredClientsOptions = []
        data.forEach(element => {
            clientsArray.push(element.client)
        })

        const filteredClientArray = clientsArray.filter((item, index) => {
            return clientsArray.indexOf(item) === index
        })

        filteredClientArray.forEach(client => {
            filteredClientsOptions.push(
                {value: client, label: client, type: "client"}
            )
        })
        
        setClientsOption(filteredClientsOptions)
  }

  const getCompanybyMonth = (data, month) => {
      const companyArray = []
      data.forEach(element => {
          if (element.month === month.value) {
           
              companyArray.push(element)
          }
      })

      return companyArray
  }

  const getClientOption = (data, client) => {
    setSelectedYearOption(null)
      const companyArray = []
      data.forEach(element => {
        if (element.client === client.value) {
            companyArray.push(element)
        }
      })
  
      return companyArray
    }

  const handleMonth = (content) => {
    setSelectedYearOption(null)
    setSelectedClientOption(null)
    
    const client = getCompanybyMonth(initialData, content)
    console.log(client);
    filterByYear(year, client)
    getCLients(client)
    setFilteredData(client)
  }

  const handleClient = async (content) => {
    setSelectedClientOption(content)
    setSelectedYearOption(null)
        const clients = getClientOption(filteredData, content)
        
        getYear(clients)
        // setData(clients)
        setClientData(clients)
        filterByYear(year, clients)
}

const handleYear = (content) => {
    setSelectedYearOption(content)
    console.log(clientData);
    const year = content.value
    filterByYear(year, clientData)
    

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
            
        <header className='sans'>
            
            <h1 className="page-title">Suporte Next4</h1>
            <div className="search-field no-print">
                <div className='dropdown'>
                    <Select
                        placeholder="Selecione o mês"
                        options={monthsSelectOptions} // set list of the data
                        onChange={handleMonth} // assign onChange function

                    />
                    <Select
                        value={selectedClientOption}
                        placeholder="Selecione o cliente"
                        options={clientsSelectOption} // set list of the data
                        onChange={handleClient} // assign onChange function
                    />
                    <Select
                        value={selectedYearOption}
                        placeholder="Selecione o ano"
                        options={yearOptions} // set list of the data
                        onChange={handleYear} // assign onChange function
                    />
                </div>
                    <button onClick={() => {window.print()}}>Exportar</button>
                    
            </div>
            <h1 className="page-subtitle">{sumHour ? `Somatória das horas = ${sumHour}h` : ""}</h1>
        
        </header>

        <div className="page-body sans">
                  
             <Table  className="collection-content">
                <TableHead>
                    <TableRow>
                        <TableCell >Cliente</TableCell>
                        <TableCell>Mês</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Exec</TableCell>
                        <TableCell>Ticket</TableCell>
                        <TableCell>Previsão</TableCell>
                        <TableCell>horas</TableCell>
                        <TableCell>Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((ticket, i) => objectRow(ticket, i))}
                </TableBody>
            </Table >
       
        </div>
        
    </>
  );
}

export default App;
