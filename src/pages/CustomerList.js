import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { firebaseBuscar } from 'src/utils/FirebaseUtil';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';



const CustomerList = () => {




  const [clientes, setClientes] = useState([]);


  //hook que usamos para poder llamar a la funcion clientes asi se cargan apenas se cargue la pagina
  useEffect(() => {
    buscarClientes();
  }, []);


  //funcion asincronica que busca los en firebase ya que le pasamos el array
  const buscarClientes = async () => {
    let resultado = await firebaseBuscar('clientes');
    setClientes(resultado);

 // debugger;
  }






  return <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>

{/* componente propio de react para clientes */}
        <CustomerListToolbar />

        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={clientes} />
        </Box>
      </Container>
    </Box>
  </>;
}

export default CustomerList;
