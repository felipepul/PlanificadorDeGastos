import React, { useState } from 'react';

import {
  StyleSheet,
  // Text,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import { Header } from './src/components/Header';
import { NuevoPresupuesto } from './src/components/NuevoPresupuesto';
import { ControlPresupuesto } from './src/components/ControlPresupuesto';
import { FormularioGasto } from './src/components/FormularioGasto';
import { generalId } from './src/helpers/index';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const handleNuevoPresupuesto = () => {
    // console.log('desde App', presupuesto);
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede se menor a 0 ');
    }
  };

  const handleGasto = gasto => {
    if (Object.values(gasto).includes('')) {
      Alert.alert('Error',
        'todos los campos son obligatorios');
      return;
    }
    gasto.id = generalId();
    setGastos([...gastos, gasto]);
    setModal(!modal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            gastos={gastos} />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handleNuevoPresupuesto={handleNuevoPresupuesto} />)}
      </View>
      {modal && (
        <Modal visible={modal} animationType="slide"
          onRequestClose={() => setModal(!modal)}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto} />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable
          onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 10,
    right: 20,
  },
});

export default App;
