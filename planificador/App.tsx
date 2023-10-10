import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  ScrollView,
  // Text,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  // Text,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from './src/components/Header';
import { NuevoPresupuesto } from './src/components/NuevoPresupuesto';
import { ControlPresupuesto } from './src/components/ControlPresupuesto';
import { FormularioGasto } from './src/components/FormularioGasto';
import { ListadoGastos } from './src/components/ListadoGastos';
import { Filtro } from './src/components/Filtro';
import { generalId } from './src/helpers/index';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // useEffect(() => {
  //   if (isValidPresupuesto){
  //     const  guardarPresupuestoStorage = async() => {
  //       try {
  //           await AsyncStorage.setItem('planificador_presupuesto',presupuesto);
  //       } catch (error){
  //         console.log(error);
  //       }
  //     };
  //   }
  // }, [isValidPresupuesto]);

  const handleNuevoPresupuesto = () => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede se menor a 0 ');
    }
  };

  const handleGasto = (gasto) => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error',
        'todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    } else {
      gasto.id = generalId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setModal(!modal);
  };

  const eliminarGasto = (id: string | number) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [{ text: 'No', style: 'cancel' },
      {
        text: 'Si,eliminar', onPress: () => {
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
          setGastos(gastosActualizados);
          setModal(!modal);
          setGasto({});
        },
      }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados} />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal visible={modal} animationType="slide"
          onRequestClose={() => setModal(!modal)}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto} />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
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
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
