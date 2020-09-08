
import { StatusBar } from 'expo-status-bar';
import React from 'react';

//definições de rotas de telas
import Routes from './src/routes/router'

export default function App(){
  return(
    //fornma de evitar a renderização de outras tags
    <>

      <StatusBar style='light' backgroundColor="#000" translucent={true} />
      <Routes />
    
    </>
  );
};



